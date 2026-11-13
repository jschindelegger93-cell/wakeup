/* Wake Up Espresso – Klickdummy. Vanilla JS, Hash-Routing, Daten aus data.js. */
(function () {
  'use strict';
  var app = document.getElementById('app');
  var FREE = WU.FREE_SHIPPING;
  var eur = function (n) { return '€ ' + Number(n).toLocaleString('de-AT', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); };
  var esc = function (s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); };
  var store = {
    get: function (k, d) { try { var v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch (e) { return d; } },
    set: function (k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }
  };

  /* ---------- Adressen: intern '#/…', nach außen echte Pfade im Shopify-Schema ---------- */
  var FIXED = { kaffee: '/collections/kaffee/', maschinen: '/collections/maschinen/', sortiment: '/collections/alle/', '5plus1': '/pages/5plus1/', finder: '/pages/kaffee-finder/', 'maschinen-finder': '/pages/maschinen-finder/', faq: '/pages/faq/', roestereien: '/pages/roestereien/', ratgeber: '/blogs/ratgeber/' };
  function toPath(r) {
    r = String(r).replace(/^#\/?/, ''); var q = '', i = r.indexOf('?'); if (i >= 0) { q = r.slice(i); r = r.slice(0, i); }
    var a = r.split('/');
    if (!a[0]) return '/' + q;
    if (a[0] === 'p') return '/products/' + a[1] + '/' + q;
    if (a[0] === 'seite') return '/pages/' + a[1] + '/' + q;
    if (a[0] === 'ratgeber' && a[1]) return '/blogs/ratgeber/' + a[1] + '/' + q;
    return (FIXED[a[0]] || '/') + q;
  }
  function cur() {
    var s = location.pathname.replace(/index\.html$/, ''), m;
    if ((m = /^\/products\/([^\/]+)/.exec(s))) return '#/p/' + m[1];
    if ((m = /^\/blogs\/ratgeber\/([^\/]+)/.exec(s))) return '#/ratgeber/' + m[1];
    if (/^\/blogs\/ratgeber/.test(s)) return '#/ratgeber';
    for (var k in FIXED) if (s.indexOf(FIXED[k]) === 0) return '#/' + k;
    if ((m = /^\/pages\/([^\/]+)/.exec(s))) return '#/seite/' + m[1];
    return '#/';
  }
  WU.toPath = toPath;

  /* ---------- Tracking-Log (Demo) ---------- */
  var events = [];
  function track(name, info) {
    events.unshift(name + (info ? ' · ' + info : ''));
    window.dataLayer = window.dataLayer || []; window.dataLayer.push({ event: name, info: info || '' });
    var box = document.getElementById('tlog'); if (!box) return;
    box.querySelector('button').textContent = 'Tracking-Log (' + events.length + ')';
    box.querySelector('ol').innerHTML = events.slice(0, 30).map(function (e) { return '<li>' + esc(e) + '</li>'; }).join('');
  }

  /* ---------- Warenkorb ---------- */
  var cart = store.get('wu_cart', []);
  function variant(id) {
    id = String(id);
    for (var i = 0; i < WU.coffees.length; i++) {
      var c = WU.coffees[i];
      if (c.id === id) return { p: c, label: '1 kg Bohnen', price: c.price, kg: true };
      if (c.kartonId === id) return { p: c, label: 'Karton (5+1 kg gratis)', price: c.price * 5 };
    }
    for (var j = 0; j < WU.others.length; j++) {
      var o = WU.others[j];
      if (o.variants) { for (var k = 0; k < o.variants.length; k++) if (o.variants[k].id === id) return { p: o, label: o.variants.length > 1 ? o.variants[k].title : '', price: o.variants[k].price }; }
      else if (o.id === id) return { p: o, label: '', price: o.price };
    }
    return null;
  }
  function addToCart(id, qty, silent) {
    id = String(id); qty = qty || 1;
    var line = cart.filter(function (l) { return l.id === id; })[0];
    if (line) line.qty += qty; else cart.push({ id: id, qty: qty });
    saveCart(); if (!silent) openCart();
    var v = variant(id); track('add_to_cart', v ? v.p.title : id);
  }
  function setQty(id, qty) {
    cart = cart.map(function (l) { if (l.id === id) l.qty = qty; return l; }).filter(function (l) { return l.qty > 0; });
    saveCart();
  }
  function saveCart() { store.set('wu_cart', cart); renderCart(); }
  function totals() {
    var sub = 0, count = 0, kilos = [];
    cart.forEach(function (l) {
      var v = variant(l.id); if (!v) return;
      sub += v.price * l.qty; count += l.qty;
      if (v.kg) for (var i = 0; i < l.qty; i++) kilos.push(v.price);
    });
    kilos.sort(function (a, b) { return a - b; });
    var free = Math.floor(kilos.length / 6), save = 0;
    for (var i = 0; i < free; i++) save += kilos[i];
    return { sub: sub, count: count, kilos: kilos.length, free: free, save: save, total: sub - save };
  }
  function renderCart() {
    var t = totals();
    document.getElementById('cart-count').textContent = t.count;
    var body = document.getElementById('cart-body');
    if (!cart.length) {
      body.innerHTML = '<div class="lines"><div class="empty" style="margin-top:20px">Dein Warenkorb ist leer.<br><br><a class="btn sm" href="#/kaffee" data-act="cart-close">Kaffee entdecken</a></div></div>';
      return;
    }
    var rest = FREE - t.total, pct = Math.min(100, Math.round(t.total / FREE * 100));
    var ship = rest > 0
      ? '<div class="ship">Noch ' + eur(rest) + ' bis zum Gratis-Versand<i><b style="width:' + pct + '%"></b></i></div>'
      : '<div class="ship done">Gratis-Versand erreicht<i><b style="width:100%"></b></i></div>';
    var lines = cart.map(function (l) {
      var v = variant(l.id); if (!v) return '';
      return '<div class="line"><img src="' + esc(v.p.img) + '" alt="" loading="lazy"><div><b>' + esc(v.p.title) + '</b><span>' + esc(v.label) + '</span>' +
        '<div class="qty"><button data-act="line-qty" data-id="' + l.id + '" data-d="-1" aria-label="Weniger">−</button><output>' + l.qty + '</output><button data-act="line-qty" data-id="' + l.id + '" data-d="1" aria-label="Mehr">+</button></div></div>' +
        '<strong>' + eur(v.price * l.qty) + '</strong></div>';
    }).join('');
    var toNext = t.kilos % 6 === 0 ? 0 : 6 - (t.kilos % 6);
    var hint = t.kilos > 0 && toNext > 0 ? '<p class="hint">Noch ' + toNext + ' Kilo bis zu deinem nächsten Gratis-Kilo. <a href="#/5plus1" data-act="cart-close">Paket zusammenstellen</a></p>' : '';
    var inCart = cart.map(function (l) { return l.id; });
    var upsell = rest > 0 ? '<div class="upsell"><b>Damit bist du über € ' + FREE + '</b>' + WU.coffees.filter(function (c) { return inCart.indexOf(c.id) < 0 && c.price >= rest; }).slice(0, 2).map(function (c) {
      return '<div class="up"><img src="' + esc(c.img) + '" alt="" loading="lazy"><span>' + esc(c.title) + '<br><strong>' + eur(c.price) + '</strong></span><button class="btn sm ghost" data-act="add" data-id="' + c.id + '">Dazu</button></div>'; }).join('') + '</div>' : '';
    var checkout = WU.SHOP + '/cart/' + cart.map(function (l) { return l.id + ':' + l.qty; }).join(',');
    body.innerHTML = ship + '<div class="lines">' + lines + hint + upsell + '</div><div class="drawer-foot">' +
      '<div class="tot"><span>Zwischensumme</span><span>' + eur(t.sub) + '</span></div>' +
      (t.free ? '<div class="tot save"><span>5+1: ' + t.free + ' Kilo gratis</span><span>− ' + eur(t.save) + '</span></div>' : '') +
      '<div class="tot big"><span>Summe</span><span>' + eur(t.total) + '</span></div>' +
      '<p class="fine">Preise inkl. MwSt. Versand wird an der Kassa berechnet.' + (t.free ? ' Der 5+1-Abzug ist hier eine Vorschau, im Shop rechnet ihn die Rabatt-App.' : '') + '</p>' +
      '<a class="btn block" href="' + esc(checkout) + '" data-act="checkout" rel="noopener">Zur Kassa</a></div>';
  }
  function openCart() { document.body.classList.add('cart-open'); track('cart_open'); }
  function closeCart() { document.body.classList.remove('cart-open'); }

  /* ---------- Icons ---------- */
  var ICONS = {
    truck: '<path d="M1 3h15v13H1z"/><path d="M16 8h4l3 3v5h-7z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>',
    clock: '<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>',
    home: '<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><path d="M9 22V12h6v10"/>',
    tool: '<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>',
    chat: '<path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>',
    cup: '<path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/><path d="M6 1v3M10 1v3M14 1v3"/>',
    card: '<rect x="1" y="4" width="22" height="16" rx="2"/><path d="M1 10h22"/>',
    box: '<path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><path d="M3.27 6.96 12 12.01l8.73-5.05M12 22.08V12"/>',
    check: '<path d="M20 6 9 17l-5-5"/>',
    pin: '<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>'
  };
  function ico(n) { return '<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + ICONS[n] + '</svg>'; }
  function fact(n, t) { return '<li class="ic">' + ico(n) + '<span>' + t + '</span></li>'; }

  /* ---------- Bausteine ---------- */
  function beans(n) { var h = ''; for (var i = 1; i <= 5; i++) h += '<i' + (i <= n ? ' class="on"' : '') + '></i>'; return '<span class="beans" aria-label="Röstung ' + n + ' von 5">' + h + '</span>'; }
  function href(p) { return '#/p/' + p.handle; }
  function card(p) {
    var badge = p.compare ? '<span class="badge">Spare ' + eur(p.compare - p.price) + '</span>' : (p.preorder ? '<span class="badge dark">Vorbestellen</span>' : '');
    var meta = p.kind === 'kaffee' ? '<span class="roast">Röstung ' + beans(p.roast) + '</span><span class="notes">' + esc(p.aromas.slice(0, 3).join(' · ')) + '</span>' : '';
    var price = (p.compare ? '<del>' + eur(p.compare) + '</del>' : '') + eur(p.price) + (p.kind === 'kaffee' ? ' <small>/ kg</small>' : '');
    var cheap = p.price < 500;
    return '<article class="card">' + badge + '<a class="card-media" href="' + href(p) + '" tabindex="-1" aria-hidden="true"><img src="' + esc(p.img) + '" alt="" loading="lazy" width="400" height="400"></a>' +
      '<div class="card-body"><span class="vendor">' + esc(p.vendor) + '</span><a class="card-title" href="' + href(p) + '">' + esc(p.title) + '</a>' + meta +
      '<span class="price">' + price + '</span>' +
      (cheap ? '<button class="btn sm ghost quick" data-act="add" data-id="' + p.id + '">' + (p.preorder ? 'Vorbestellen' : 'In den Warenkorb') + '</button>' : '<a class="btn sm ghost quick" href="' + href(p) + '">Ansehen</a>') +
      '</div></article>';
  }
  function slotsHtml(picks, interactive) {
    var h = '';
    for (var i = 0; i < 6; i++) {
      var p = picks[i], free = i === 5;
      if (p) h += '<button class="slot filled' + (free ? ' free' : '') + '"' + (interactive ? ' data-act="unpick" data-i="' + i + '" aria-label="Entfernen: ' + esc(p.title) + '"' : ' tabindex="-1"') + '><img src="' + esc(p.img) + '" alt="">' + (interactive ? '<span class="x">×</span>' : '') + (free ? '<span class="tag">Gratis</span>' : '') + '</button>';
      else h += '<div class="slot empty' + (free ? ' free' : '') + '">' + (free ? '<b>+1 gratis</b>' : (i + 1)) + '</div>';
    }
    return '<div class="slots">' + h + '</div>';
  }
  function head(crumb, title, text) {
    return '<div class="wrap page-head"><p class="crumbs"><a href="#/">Start</a> / ' + esc(crumb) + '</p><h1>' + esc(title) + '</h1>' + (text ? '<p>' + esc(text) + '</p>' : '') + '</div>';
  }

  /* ---------- Startseite ---------- */
  function home() {
    var top = WU.coffees.slice(0, 5), pakete = WU.others.filter(function (p) { return p.kind === 'paket'; });
    var machines = WU.others.filter(function (p) { return p.kind === 'maschine' || p.kind === 'set'; });
    var m = WU.byHandle('elba-quattro'), z = WU.byHandle('eureka-mignon-kupfer'), k = WU.coffees[1];
    return '<section class="hero"><div class="wrap hero-in"><div>' +
      '<p class="hero-kicker">Dal 2010 a Vienna</p><h1>Espresso wie im Italien-Urlaub.</h1>' +
      '<p class="hero-sub">Der Caffè an der Bar in Neapel, der Cappuccino am Hafen in Kalabrien: genau diese Röstungen holen wir direkt aus Italien nach Wien. Such dir fünf Kilo aus, das sechste schenken wir dir.</p>' +
      '<div class="hero-cta"><a class="btn light" href="#/5plus1" data-track="hero_5plus1">Karton zusammenstellen</a><a class="btn line-light" href="#/kaffee" data-track="hero_kaffee">Alle Kaffees ansehen</a></div>' +
      '<ul class="hero-facts">' + fact('truck', 'Gratis Versand ab € 89') + fact('clock', 'Lieferung in 1–3 Werktagen') + fact('home', 'Wiener Familienbetrieb seit 2010') + '</ul></div>' +
      '<a class="karton" href="#/5plus1" aria-label="Zum 5+1 Konfigurator" style="text-decoration:none;color:#fff"><div class="karton-top"><span>Dein Karton</span><em>5 bezahlen, 6 bekommen</em></div>' + slotsHtml(top, false) + '</a>' +
      '</div></section>' +

      '<section class="trust"><div class="wrap"><ul>' +
      '<li>' + ico('truck') + '<div><b>Gratis Versand ab € 89</b><span>in Österreich, 1–3 Werktage</span></div></li>' +
      '<li>' + ico('tool') + '<div><b>Eigene Werkstatt in Wien</b><span>Jede Maschine vor Versand geprüft</span></div></li>' +
      '<li>' + ico('chat') + '<div><b>Persönliche Einschulung</b><span>Im Store, per Telefon oder Videocall</span></div></li>' +
      '<li>' + ico('cup') + '<div><b>Frisch aus Italien</b><span>Mehrmals im Jahr nachbestellt</span></div></li></ul></div></section>' +

      '<section class="sec"><div class="wrap"><div class="sec-head"><div><h2>Die Bestseller</h2><p>Was unsere Kundinnen und Kunden am häufigsten nachbestellen.</p></div><a class="link" href="#/kaffee">Alle ' + WU.coffees.length + ' Kaffees</a></div>' +
      '<div class="rail">' + WU.coffees.slice(0, 8).map(card).join('') + '</div></div></section>' +

      '<section class="sec" style="padding-top:0"><div class="wrap"><div class="cats">' +
      '<a class="cat dark" href="#/kaffee"><img src="' + WU.IMG('Kaffee.png') + '" alt=""><h3>Kaffee</h3><span>' + WU.coffees.length + ' Röstungen in der 1-kg-Packung</span></a>' +
      '<a class="cat" href="#/maschinen"><img src="' + WU.IMG('Kaffeemaschinen.png') + '" alt=""><h3>Espressomaschinen</h3><span>Einkreiser bis Hebelmaschine</span></a>' +
      '<a class="cat" href="#/maschinen"><img src="' + WU.IMG('Zubehoer.png') + '" alt=""><h3>Mühlen &amp; Sets</h3><span>Im Set 7 % sparen</span></a>' +
      '</div></div></section>' +

      '<section class="sec band"><div class="wrap split"><div><h2>So funktioniert 5+1</h2><ol class="steps">' +
      '<li><div><b>Fünf Kilo frei wählen</b><span>Alle Kaffees mit 1-kg-Packung, auch gemischt.</span></div></li>' +
      '<li><div><b>Das sechste Kilo dazulegen</b><span>Du suchst es selbst aus, es kostet nichts.</span></div></li>' +
      '<li><div><b>Mit einem Klick in den Warenkorb</b><span>Ab € 89 liefern wir versandkostenfrei.</span></div></li></ol>' +
      '<a class="btn" style="margin-top:24px" href="#/5plus1">Karton zusammenstellen</a></div>' +
      '<div><h2>Noch unsicher?</h2><p style="margin-top:10px;color:var(--mut)">Drei kurze Fragen, dann zeigen wir dir die Röstung, die zu deinem Geschmack passt.</p><a class="btn ghost" style="margin-top:20px" href="#/finder">Kaffee-Finder starten</a></div></div></section>' +

      '<section class="sec"><div class="wrap"><div class="sec-head"><div><h2>Probierpakete</h2><p>Mehrere Röstungen auf einmal testen und dabei sparen.</p></div></div><div class="grid">' + pakete.map(card).join('') + '</div></div></section>' +

      '<section class="sec" style="padding-top:0"><div class="wrap"><div class="sec-head"><div><h2>Maschinen, die bleiben</h2><p>Profi-Technik für zu Hause. Geprüft in unserer Werkstatt, mit Einschulung geliefert.</p></div><a class="link" href="#/maschinen">Alle Maschinen und Mühlen</a></div>' +
      '<div class="rail">' + machines.map(card).join('') + '</div></div></section>' +

      '<section class="sec italia"><div class="wrap"><div class="sec-head"><div><h2>Wohin soll die Reise gehen?</h2><p>Jede Rösterei schmeckt nach ihrer Gegend. Such dir aus, wo dein Espresso heute herkommt.</p></div><a class="link" href="#/roestereien">Alle Röstereien</a></div>' + italyMap() + '</div></section>' +

      '<section class="sec"><div class="wrap split"><div><h2>Ein Familienbetrieb, der selbst schraubt</h2><p style="margin-top:12px;color:#3d2e25">Seit 2010 dreht sich bei uns in Wien alles um Espresso. Gründer Mario Sciurti ist selbst Techniker. Deshalb verkaufen wir nur Maschinen, die wir auch reparieren können und wollen.</p>' +
      '<ul class="facts">' + fact('tool', 'Maschinenservice für alle bei uns gekauften Geräte') + fact('cup', 'Mühle meist schon voreingestellt') + fact('check', 'Offizieller Vertreter von La San Marco') + '</ul></div>' +
      '<div><h2>Häufige Fragen</h2><div style="margin-top:12px">' +
      faq('Ab wann ist der Versand gratis?', 'Ab € 89 Warenwert in Österreich und ab € 150 nach Deutschland.') +
      faq('Wie schnell wird geliefert?', 'Kaffee und Zubehör, die du bis 13 Uhr bestellst, gehen meist am selben Werktag raus. Die Lieferung dauert in der Regel 1–3 Werktage.') +
      faq('Wie kommt eine Espressomaschine zu mir?', 'Sicher auf Palette per Spedition. Vorher prüfen wir sie in unserer Werkstatt.') +
      faq('Wie kann ich bezahlen?', 'Mit PayPal, Klarna, Kreditkarte, Apple Pay oder eps.') +
      '</div><p style="margin-top:16px"><a class="link" href="#/faq">Alle Fragen und Antworten</a></p></div></div></section>' +

      '<section class="sec"><div class="wrap"><div class="sec-head"><div><h2>Ratgeber</h2><p>Damit der Espresso zu Hause so schmeckt wie an der Bar.</p></div><a class="link" href="#/ratgeber">Alle Artikel</a></div><div class="guides">' + WU.GUIDES.slice(0, 3).map(guideCard).join('') + '</div></div></section>' +

      '<section class="strip" aria-label="Eindrücke aus Geschäft und Werkstatt">' + ['ScrollingBoxes3.png', 'ScrollingBoxes1.png', 'duotone_26.png', 'ScrollingBoxes2.png', 'duotone_30.png'].map(function (n) { return '<img src="' + WU.IMG(n) + '" alt="" loading="lazy" width="600" height="600">'; }).join('') + '</section>';
  }
  function faq(q, a) { return '<details><summary>' + esc(q) + '</summary><p>' + esc(a) + '</p></details>'; }

  /* ---------- Kaffee-Übersicht ---------- */
  var filt = { vendor: '', taste: '', sort: 'top' };
  var TASTES = { kraeftig: ['Kräftig', function (c) { return c.intensity >= 7; }], ausgewogen: ['Ausgewogen', function (c) { return c.intensity >= 4 && c.intensity <= 6; }], fein: ['Fein und mild', function (c) { return c.intensity <= 3; }] };
  var FORMATS = ['1 kg Bohnen', 'Kaffee 500 g', 'Kaffee 250 g', 'Moka gemahlen', 'Espresso gemahlen', 'E.S.E. Pads', 'Probierpakete'];
  function formatOf(p) { return p.kind === 'kaffee' ? '1 kg Bohnen' : p.kind === 'paket' ? 'Probierpakete' : p.type; }
  function allCoffee() { return WU.all.filter(function (p) { return FORMATS.indexOf(formatOf(p)) >= 0; }); }
  function coffeeList() {
    var list = allCoffee().filter(function (c) {
      return (!filt.format || formatOf(c) === filt.format) && (!filt.vendor || c.vendor === filt.vendor) && (!filt.taste || (c.kind === 'kaffee' && TASTES[filt.taste][1](c)));
    });
    if (filt.sort === 'asc') list.sort(function (a, b) { return a.price - b.price; });
    if (filt.sort === 'desc') list.sort(function (a, b) { return b.price - a.price; });
    if (filt.sort === 'int') list.sort(function (a, b) { return (b.intensity || 0) - (a.intensity || 0); });
    return list;
  }
  function kaffee() {
    var vendors = []; allCoffee().forEach(function (c) { if (vendors.indexOf(c.vendor) < 0) vendors.push(c.vendor); });
    var list = coffeeList();
    var tools = '<button class="tool' + (!filt.vendor ? ' on' : '') + '" data-act="f-vendor" data-v="">Alle Röstereien</button>' +
      vendors.map(function (v) { return '<button class="tool' + (filt.vendor === v ? ' on' : '') + '" data-act="f-vendor" data-v="' + esc(v) + '">' + esc(v) + '</button>'; }).join('');
    var tastes = Object.keys(TASTES).map(function (k) { return '<button class="tool' + (filt.taste === k ? ' on' : '') + '" data-act="f-taste" data-v="' + k + '">' + TASTES[k][0] + '</button>'; }).join('') +
      '<select class="tool" data-act="f-sort" aria-label="Sortieren"><option value="top"' + (filt.sort === 'top' ? ' selected' : '') + '>Empfohlen</option><option value="asc"' + (filt.sort === 'asc' ? ' selected' : '') + '>Preis aufsteigend</option><option value="desc"' + (filt.sort === 'desc' ? ' selected' : '') + '>Preis absteigend</option><option value="int"' + (filt.sort === 'int' ? ' selected' : '') + '>Kräftigste zuerst</option></select>';
    return head('Kaffee', 'Kaffee aus Italien', 'Dunkel geröstet und säurearm. Ganze Bohnen in 1 kg, 500 g und 250 g, gemahlen für Siebträger und Moka, als Pads und im Probierpaket.') +
      '<div class="wrap" style="padding-bottom:64px"><div class="tools"><button class="tool' + (!filt.format ? ' on' : '') + '" data-act="f-format" data-v="">Alle Formate</button>' + FORMATS.map(function (f) { return '<button class="tool' + (filt.format === f ? ' on' : '') + '" data-act="f-format" data-v="' + f + '">' + f + '</button>'; }).join('') + '</div><div class="tools">' + tools + '</div><div class="tools">' + tastes + '</div>' +
      '<p class="count">' + list.length + ' von ' + allCoffee().length + ' Kaffees</p>' +
      (list.length ? '<div class="grid">' + list.map(card).join('') + '</div>' : '<div class="empty">Zu dieser Auswahl gibt es keinen Kaffee.<br><br><button class="btn sm" data-act="f-reset">Filter zurücksetzen</button></div>') +
      '<p style="margin-top:32px"><a class="btn ghost" href="#/sortiment">500 g, 250 g, gemahlen, Pads und Zubehör ansehen</a></p></div>';
  }

  /* ---------- Gesamtes Sortiment (live aus dem Shop) ---------- */
  var KIND_LABEL = { kaffee: 'Kaffee 1 kg', paket: 'Probierpakete', maschine: 'Espressomaschinen', muehle: 'Mühlen', set: 'Maschinensets' };
  function typeOf(p) { return p.live ? (p.type || 'Weiteres') : KIND_LABEL[p.kind]; }
  function mergeCatalog(list) {
    var added = 0;
    list.forEach(function (x) {
      if (WU.byHandle(x.h) || !x.vs || !x.vs.length) return;
      var vs = x.vs.map(function (v) { return { id: String(v[0]), title: v[1], price: Number(v[2]), compare: Number(v[3]) || 0, available: !!v[4] }; });
      var v0 = vs.filter(function (v) { return v.available; })[0] || vs[0];
      WU.others.push({ kind: 'live', live: true, type: x.ty || 'Weiteres', handle: x.h, title: x.t, vendor: x.v, img: x.img || WU.LOGO, id: v0.id, price: v0.price, compare: v0.compare > v0.price ? v0.compare : 0, preorder: false, text: '', variants: vs });
      added++;
    });
    WU.all = WU.coffees.concat(WU.others); WU.catalog = 'ok';
    if (added) route();
  }
  function loadCatalog() {
    if (typeof fetch !== 'function') return;
    WU.catalog = 'laden';
    fetch('/.netlify/functions/shop?catalog=1').then(function (r) { return r.ok ? r.json() : null; })
      .then(function (x) { if (x && x.products) mergeCatalog(x.products); else { WU.catalog = 'fehler';  } })
      .catch(function () { WU.catalog = 'fehler';  });
  }
  function sortiment() {
    var types = []; WU.all.forEach(function (p) { var t = typeOf(p); if (types.indexOf(t) < 0) types.push(t); });
    var list = WU.all.filter(function (p) { return !filt.type || typeOf(p) === filt.type; });
    var note = WU.catalog === 'ok' || WU.staticCatalog ? '' : WU.catalog === 'fehler' ? '<p class="hint">Das vollständige Sortiment konnte gerade nicht aus dem Shop geladen werden. Du siehst die Auswahl aus der Vorschau.</p>' : '<p class="count">Das vollständige Sortiment wird aus dem Shop geladen …</p>';
    return head('Sortiment', 'Das ganze Sortiment', 'Alle ' + WU.all.length + ' Produkte: Kaffee in 1 kg, 500 g und 250 g, gemahlen, Pads, Maschinen, Mühlen, Zubehör und Ersatzteile.') +
      '<div class="wrap" style="padding-bottom:64px">' + note + '<div class="tools"><button class="tool' + (!filt.type ? ' on' : '') + '" data-act="f-type" data-v="">Alles</button>' +
      types.map(function (t) { return '<button class="tool' + (filt.type === t ? ' on' : '') + '" data-act="f-type" data-v="' + esc(t) + '">' + esc(t) + '</button>'; }).join('') + '</div>' +
      '<p class="count">' + list.length + ' Produkte</p><div class="grid">' + list.map(card).join('') + '</div></div>';
  }

  /* ---------- Maschinen ---------- */
  function maschinen() {
    function group(kind, title, text) {
      var l = WU.others.filter(function (p) { return p.kind === kind; });
      return '<section style="padding:0 0 48px"><div class="sec-head"><div><h2>' + title + '</h2><p>' + text + '</p></div></div><div class="grid">' + l.map(card).join('') + '</div></section>';
    }
    return head('Maschinen & Mühlen', 'Espressomaschinen und Mühlen', 'Bewährte Profi-Technik für zu Hause. Jede Maschine prüfen wir vor dem Versand in unserer Wiener Werkstatt.') +
      '<div class="wrap">' + group('maschine', 'Espressomaschinen', 'Vom kompakten Einkreiser bis zur Hebelmaschine.') +
      group('set', 'Maschine und Mühle im Set', 'Im Set sparst du 7 % beim Checkout.') +
      group('muehle', 'Kaffeemühlen', 'Die Maschine ist nur so gut wie die Mühle daneben.') + '<p style="padding-bottom:64px"><a class="btn ghost" href="#/maschinen-finder">Unsicher? Zum Maschinen-Finder</a></p></div>';
  }

  /* ---------- Produktseite ---------- */
  var pdp = { id: '', qty: 1 };
  function meter(label, v, max) { return '<div class="meter"><span>' + label + '</span><i><b style="width:' + Math.round(v / max * 100) + '%"></b></i><em>' + v + '/' + max + '</em></div>'; }
  function more(p) {
    var l = [], slug = p.vendor && WU.REGIONS[p.vendor] ? 'roesterei-' + p.vendor.toLowerCase().replace(/\s+/g, '-') : '';
    if (slug) l.push(['#/ratgeber/' + slug, 'Die Rösterei ' + p.vendor]);
    if (p.kind === 'kaffee') l.push(['#/ratgeber/arabica-robusta', 'Arabica und Robusta verstehen'], ['#/ratgeber/mahlgrad-einstellen', 'Mahlgrad richtig einstellen']);
    else if (p.kind === 'maschine' || p.kind === 'set') l.push(['#/ratgeber/einkreiser-zweikreiser-dualboiler-hebelmaschinen', 'Einkreiser, Zweikreiser, Dualboiler, Hebel'], ['#/ratgeber/reinigung-wartung', 'Reinigung und Wartung'], ['#/seite/einschulungen', 'So läuft die Einschulung']);
    else if (p.kind === 'muehle') l.push(['#/ratgeber/kaffeemuehlen-im-vergleich', 'Kaffeemühlen im Vergleich'], ['#/ratgeber/mahlgrad-einstellen', 'Mahlgrad richtig einstellen']);
    else if (/Moka/.test(p.type || '')) l.push(['#/ratgeber/moka-kanne', 'Die Moka-Kanne richtig verwenden']);
    if (!l.length) return '';
    return '<nav class="more" aria-label="Mehr zum Thema"><b>Mehr zum Thema</b>' + l.map(function (x) { return '<a href="' + x[0] + '">' + esc(x[1]) + '</a>'; }).join('') + '</nav>';
  }
  function similar(p) {
    var KT = ['Kaffee 1 kg', 'Kaffee 500 g', 'Kaffee 250 g', 'Moka gemahlen', 'Espresso gemahlen', 'E.S.E. Pads', 'Probierpakete'];
    var list = p.kind === 'kaffee'
      ? WU.coffees.filter(function (c) { return c.handle !== p.handle; }).sort(function (a, b) { return Math.abs(a.intensity - p.intensity) - Math.abs(b.intensity - p.intensity); }).slice(0, 4)
      : KT.indexOf(p.type) >= 0 ? WU.others.filter(function (o) { return o.handle !== p.handle && KT.indexOf(o.type) >= 0; }).sort(function (a, b) { return (b.vendor === p.vendor) - (a.vendor === p.vendor) || (b.type === p.type) - (a.type === p.type); }).slice(0, 4)
      : WU.others.filter(function (o) { return o.handle !== p.handle && (p.kind === 'maschine' ? o.kind === 'muehle' || o.kind === 'set' : o.kind === p.kind || o.kind === 'maschine'); }).slice(0, 4);
    if (!list.length) return '';
    return '<div class="wrap" style="padding-bottom:64px"><h2 style="margin-bottom:20px">' + (p.kind === 'kaffee' ? 'Schmeckt ähnlich' : 'Passt dazu') + '</h2><div class="grid">' + list.map(card).join('') + '</div></div>';
  }
  /* Vollständige Beschreibung und alle Bilder live aus dem Shop (Netlify Function) */
  var fullCache = {};
  function clean(html) {
    var d = new DOMParser().parseFromString(html, 'text/html');
    d.querySelectorAll('script,style,iframe,link,meta,form,object,embed').forEach(function (n) { n.remove(); });
    d.querySelectorAll('*').forEach(function (n) {
      Array.prototype.slice.call(n.attributes).forEach(function (a) {
        if (/^on/i.test(a.name) || a.name === 'style' || a.name === 'class' || a.name === 'id') n.removeAttribute(a.name);
        else if ((a.name === 'href' || a.name === 'src') && /^\s*javascript:/i.test(a.value)) n.removeAttribute(a.name);
      });
    });
    return d.body.innerHTML;
  }
  function showFull(h, x) {
    if (cur().indexOf('#/p/' + h) !== 0 || !x) return;
    var box = document.getElementById('full'), th = document.getElementById('thumbs');
    if (box && x.html) box.innerHTML = '<h2>Beschreibung</h2>' + clean(x.html);
    if (th && x.images && x.images.length > 1) th.innerHTML = x.images.map(function (src, i) { return '<button class="thumb' + (i === 0 ? ' on' : '') + '" data-act="thumb" data-src="' + esc(src) + '" aria-label="Bild ' + (i + 1) + '"><img src="' + esc(src) + '" alt="" loading="lazy"></button>'; }).join('');
  }
  function loadFull(h) {
    if (fullCache[h]) return showFull(h, fullCache[h]);
    if (typeof fetch !== 'function') return;
    fetch('/.netlify/functions/shop?product=' + encodeURIComponent(h)).then(function (r) { return r.ok ? r.json() : null; })
      .then(function (x) { if (x && !x.error) { fullCache[h] = x; showFull(h, x); } }).catch(function () {});
  }
  function produkt(h) {
    var p = WU.byHandle(h);
    if (!p) return head('Nicht gefunden', 'Dieses Produkt gibt es hier nicht') + '<div class="wrap" style="padding-bottom:64px"><a class="btn" href="#/kaffee">Zu den Kaffees</a></div>';
    var isC = p.kind === 'kaffee';
    if (pdp.h !== h) { pdp = { h: h, id: p.id, qty: 1 }; }
    var v = variant(pdp.id) || variant(p.id);
    var opts = isC ? '<div class="opts">' +
      '<button class="opt' + (pdp.id === p.id ? ' on' : '') + '" data-act="opt" data-id="' + p.id + '"><div><b>1 kg Bohnen</b><span>' + eur(p.price) + ' pro kg</span></div><strong>' + eur(p.price) + '</strong></button>' +
      '<button class="opt' + (pdp.id === p.kartonId ? ' on' : '') + '" data-act="opt" data-id="' + p.kartonId + '"><div><b>Karton mit 6 kg</b><span>5+1 kg gratis, ' + eur(p.price * 5 / 6) + ' pro kg</span></div><strong>' + eur(p.price * 5) + '</strong></button></div>' : (p.variants && p.variants.length > 1 ? '<div class="opts">' + p.variants.map(function (x) { return '<button class="opt' + (pdp.id === x.id ? ' on' : '') + '" data-act="opt" data-id="' + x.id + '"' + (x.available ? '' : ' disabled') + '><div><b>' + esc(x.title) + '</b>' + (x.available ? '' : '<span>Ausverkauft</span>') + '</div><strong>' + eur(x.price) + '</strong></button>'; }).join('') + '</div>' : '');
    var profile = isC ? '<div class="profile"><div><div class="blend-l"><span>' + p.arabica + ' % Arabica</span><span>' + (100 - p.arabica) + ' % Robusta</span></div><div class="blend"><b style="width:' + p.arabica + '%"></b></div></div>' +
      meter('Röstung', p.roast, 5) + meter('Intensität', p.intensity, 10) + meter('Körper', p.body, 5) + meter('Bitterkeit', p.bitter, 5) + meter('Säure', p.acid, 5) +
      '<div class="chips">' + p.aromas.map(function (a) { return '<span class="chip">' + esc(a.trim()) + '</span>'; }).join('') + '</div></div>' : '';
    var service = (p.kind === 'maschine' || p.kind === 'set') ? '<div class="service"><h3>Bei jeder Maschine dabei</h3><ul class="facts">' + fact('check', 'Vor dem Versand in unserer Werkstatt geprüft') + fact('chat', 'Persönliche Einschulung per Telefon oder WhatsApp-Videocall') + fact('tool', 'Maschinenservice bei uns in Wien') + fact('truck', 'Lieferung sicher auf Palette per Spedition') + '</ul></div>' : '';
    var label = p.preorder ? 'Vorbestellen' : 'In den Warenkorb';
    var priceHtml = (p.compare ? '<del>' + eur(p.compare) + '</del>' : '') + eur(v.price);
    return '<div class="wrap page-head"><p class="crumbs"><a href="#/">Start</a> / <a href="#/' + crumbOf(p)[1] + '">' + esc(crumbOf(p)[0]) + '</a></p></div>' +
      '<div class="wrap pdp"><div class="pdp-left"><div class="pdp-media"><img id="pdp-img" src="' + esc(p.img) + '" alt="' + esc(p.title) + '" width="800" height="800" fetchpriority="high"></div><div class="thumbs" id="thumbs">' + (p.imgs && p.imgs.length > 1 ? p.imgs.map(function (src, i) { return '<button class="thumb' + (i === 0 ? ' on' : '') + '" data-act="thumb" data-src="' + esc(src) + '" aria-label="Bild ' + (i + 1) + ' von ' + p.imgs.length + '"><img src="' + esc(src) + '" alt="" loading="lazy" width="120" height="120"></button>'; }).join('') : '') + '</div></div><div>' +
      '<span class="vendor">' + esc(p.vendor) + '</span><h1>' + esc(p.title) + '</h1>' +
      (isC ? '<p class="roast" style="margin-top:10px">Röstung ' + beans(p.roast) + '</p>' + (WU.REGIONS[p.vendor] ? '<p class="origin">Geröstet in ' + esc(WU.REGIONS[p.vendor].place) + '. ' + esc(WU.REGIONS[p.vendor].line) + '</p>' : '') : '') +
      '<div class="pdp-price"><span class="price">' + priceHtml + '</span>' + (p.compare ? '<span class="chip" style="background:var(--rosso);color:#fff">Spare ' + eur(p.compare - p.price) + '</span>' : '') + (p.preorder ? '<span class="chip">Vorbestellung</span>' : '') + '</div>' +
      '<p class="pdp-note">Preis inkl. MwSt., zzgl. Versand. Kostenloser Versand ab € 89 Warenwert.</p>' + opts +
      '<div class="buy"><div class="qty"><button data-act="qty" data-d="-1" aria-label="Weniger">−</button><output>' + pdp.qty + '</output><button data-act="qty" data-d="1" aria-label="Mehr">+</button></div>' +
      '<button class="btn" data-act="add-pdp">' + label + '</button></div>' +
      '<p class="dispatch">' + (p.kind === 'maschine' || p.kind === 'set' ? 'Geprüft in unserer Werkstatt, geliefert per Spedition' : 'Bis 13 Uhr bestellt, meist noch heute verschickt') + '</p>' +
      (isC ? '<button class="btn ghost block" style="margin-top:10px" data-act="to-builder" data-h="' + p.handle + '">In meinen 5+1 Karton legen</button>' : '') +
      '<ul class="facts">' + fact('truck', 'Lieferung in 1–3 Werktagen in Österreich') + (isC ? fact('box', 'Im 6-kg-Karton zahlst du nur 5 kg') : '') + fact('card', 'Sicher zahlen mit PayPal, Klarna, Karte, Apple Pay oder eps') + '</ul>' +
      profile + '<div class="pdp-text rich" id="full">' + ((WU.BODY && WU.BODY[p.handle]) || (p.text ? '<h2>Beschreibung</h2><p>' + esc(p.text) + '</p>' : '')) + '</div>' + service +
      more(p) + '</div></div>' + similar(p) +
      '<div class="sticky-buy"><span class="price">' + eur(v.price) + '</span><button class="btn" data-act="add-pdp">' + label + '</button></div>';
  }

  /* ---------- 5+1 Konfigurator ---------- */
  var picks = store.get('wu_picks', []).map(function (h) { return WU.byHandle(h); }).filter(Boolean);
  function savePicks() { store.set('wu_picks', picks.map(function (p) { return p.handle; })); }
  function builderSide() {
    var n = picks.length, sum = picks.reduce(function (s, p) { return s + p.price; }, 0);
    var sorted = picks.map(function (p) { return p.price; }).sort(function (a, b) { return a - b; });
    var save = n === 6 ? sorted[0] : 0;
    var status = n === 0 ? 'Wähle deine ersten 5 Kilo' : n < 5 ? 'Noch ' + (5 - n) + ' Kilo wählen' : n === 5 ? 'Jetzt dein Gratis-Kilo wählen' : 'Dein Karton ist komplett';
    return '<div class="karton"><div class="karton-top"><span>Dein Karton</span><em>' + n + ' von 6</em></div>' + slotsHtml(picks, true) + '</div>' +
      '<p class="b-status" aria-live="polite">' + status + '</p><p class="b-sum">Tippe einen Platz an, um ihn wieder zu leeren.</p>' +
      '<div class="b-row"><span>Warenwert</span><span>' + eur(sum) + '</span></div>' +
      (save ? '<div class="b-row save"><span>1 Kilo gratis</span><span>− ' + eur(save) + '</span></div>' : '') +
      '<button class="btn light block" data-act="builder-add"' + (n < 6 ? ' disabled' : '') + '>Alle 6 in den Warenkorb</button>';
  }
  function builderGrid() {
    var counts = {}; picks.forEach(function (p) { counts[p.handle] = (counts[p.handle] || 0) + 1; });
    var full = picks.length >= 6;
    return WU.coffees.filter(function (c) { return !filt.bv || c.vendor === filt.bv; }).map(function (p) {
      var c = counts[p.handle] || 0;
      return '<article class="card' + (c ? ' picked' : '') + '">' + (c ? '<span class="n">' + c + '×</span>' : '') +
        '<div class="card-media"><img src="' + esc(p.img) + '" alt="" loading="lazy" width="400" height="400"></div><div class="card-body"><span class="vendor">' + esc(p.vendor) + '</span><b class="card-title" style="position:static">' + esc(p.title) + '</b>' +
        '<span class="roast">Röstung ' + beans(p.roast) + '</span><span class="price">' + eur(p.price) + ' <small>/ kg</small></span>' +
        '<button class="btn sm ' + (c ? '' : 'ghost ') + 'pick" data-act="pick" data-h="' + p.handle + '"' + (full ? ' disabled' : '') + '>' + (picks.length === 5 ? 'Als Gratis-Kilo wählen' : 'Dazulegen') + '</button></div></article>';
    }).join('');
  }
  function builder() {
    var vendors = []; WU.coffees.forEach(function (c) { if (vendors.indexOf(c.vendor) < 0) vendors.push(c.vendor); });
    return head('5+1 Karton', 'Fünf Kilo wählen, das sechste gratis', 'Leg sechs Kaffees in deinen Karton, quer über alle Röstereien. Bezahlt werden fünf.') +
      '<div class="wrap"><div class="tools"><button class="tool' + (!filt.bv ? ' on' : '') + '" data-act="b-vendor" data-v="">Alle Röstereien</button>' +
      vendors.map(function (v) { return '<button class="tool' + (filt.bv === v ? ' on' : '') + '" data-act="b-vendor" data-v="' + esc(v) + '">' + esc(v) + '</button>'; }).join('') + '</div>' +
      '<div class="builder"><div class="grid" id="b-grid">' + builderGrid() + '</div><aside class="builder-side" id="b-side">' + builderSide() + '</aside></div></div>';
  }
  function refreshBuilder() {
    var g = document.getElementById('b-grid'), s = document.getElementById('b-side');
    if (g) g.innerHTML = builderGrid(); if (s) s.innerHTML = builderSide();
  }

  /* ---------- Finder ---------- */
  var QUESTIONS = [
    { q: 'Wie trinkst du deinen Kaffee am liebsten?', a: [['pur', 'Als Espresso, pur', 'Kurz, dicht, ohne Milch'], ['milch', 'Mit Milch', 'Cappuccino, Latte, Flat White'], ['beides', 'Mal so, mal so', 'Je nach Tageszeit']] },
    { q: 'Welcher Geschmack spricht dich an?', a: [['kraeftig', 'Kräftig und schokoladig', 'Viel Körper, dichte Crema'], ['ausgewogen', 'Ausgewogen und nussig', 'Rund, mit Haselnuss und Mandel'], ['fein', 'Fein und aromatisch', 'Viel Arabica, etwas Frucht']] },
    { q: 'Wie hältst du es mit Koffein?', a: [['normal', 'Ganz normal', 'So wie er kommt'], ['viel', 'Je mehr, desto besser', 'Reine Robusta-Mischungen'], ['ohne', 'Lieber ohne', 'Entkoffeiniert']] }
  ];
  var fin = { step: 0, ans: [] };
  function finderResult() {
    var a = fin.ans, list = WU.coffees.slice(), why = [];
    if (a[2] === 'ohne') { list = list.filter(function (c) { return /Dek/.test(c.title); }); why.push('du entkoffeiniert trinken möchtest'); }
    else if (a[2] === 'viel') { list = list.filter(function (c) { return c.arabica === 0; }); why.push('du viel Koffein möchtest und reine Robusta-Mischungen am meisten davon haben'); }
    else {
      list = list.filter(function (c) { return !/Dek/.test(c.title); });
      var target = a[1] === 'kraeftig' ? 8 : a[1] === 'ausgewogen' ? 5 : 3;
      if (a[0] === 'milch') { target = Math.min(10, target + 1); why.push('ein Kaffee für Milchgetränke etwas kräftiger sein darf'); }
      why.unshift('du es ' + (a[1] === 'kraeftig' ? 'kräftig und schokoladig' : a[1] === 'ausgewogen' ? 'ausgewogen und nussig' : 'fein und aromatisch') + ' magst');
      list.sort(function (x, y) { return Math.abs(x.intensity - target) - Math.abs(y.intensity - target) || x.price - y.price; });
    }
    return { list: list.slice(0, 3), why: why };
  }
  function finder() {
    var top = head('Kaffee-Finder', 'Welcher Kaffee passt zu dir?', 'Drei Fragen, eine Empfehlung mit Begründung.') + '<div class="wrap"><p class="finder" style="padding-bottom:0"><a class="link" href="#/maschinen-finder">Du suchst eine Maschine? Zum Maschinen-Finder</a></p></div>';
    if (fin.step < QUESTIONS.length) {
      var q = QUESTIONS[fin.step];
      return top + '<div class="wrap"><div class="finder"><p class="count">Frage ' + (fin.step + 1) + ' von ' + QUESTIONS.length + '</p><div class="prog"><b style="width:' + Math.round(fin.step / QUESTIONS.length * 100) + '%"></b></div>' +
        '<h2>' + q.q + '</h2><div class="answers">' + q.a.map(function (x) { return '<button class="answer" data-act="answer" data-v="' + x[0] + '"><b>' + x[1] + '</b><span>' + x[2] + '</span></button>'; }).join('') + '</div>' +
        (fin.step ? '<p style="margin-top:18px"><button class="tool" data-act="finder-back">Zurück</button></p>' : '') + '</div></div>';
    }
    var r = finderResult(), p = r.list[0];
    if (!p) return top + '<div class="wrap"><div class="finder"><div class="empty">Dazu haben wir gerade nichts Passendes.<br><br><button class="btn sm" data-act="finder-reset">Neu starten</button></div></div></div>';
    return top + '<div class="wrap"><div class="finder"><div class="prog"><b style="width:100%"></b></div><h2>Unsere Empfehlung</h2>' +
      '<div class="result"><img src="' + esc(p.img) + '" alt="" width="400" height="400"><div><span class="vendor">' + esc(p.vendor) + '</span><h3 style="font-size:1.6rem">' + esc(p.title) + '</h3>' +
      '<p class="why">Weil ' + esc(r.why.join(' und ')) + '. ' + esc(p.text) + '</p><p class="price" style="margin-bottom:14px">' + eur(p.price) + ' <small>/ kg</small></p>' +
      '<div style="display:flex;flex-wrap:wrap;gap:10px"><button class="btn sm" data-act="add" data-id="' + p.id + '">In den Warenkorb</button><button class="btn sm ghost" data-act="to-builder" data-h="' + p.handle + '">In den 5+1 Karton</button><a class="btn sm ghost" href="' + href(p) + '">Details</a></div></div></div>' +
      (r.list.length > 1 ? '<h3 style="margin:32px 0 14px">Auch passend</h3><div class="grid" style="grid-template-columns:repeat(2,minmax(0,1fr))">' + r.list.slice(1).map(card).join('') + '</div>' : '') +
      '<p style="margin-top:24px"><button class="tool" data-act="finder-reset">Neu starten</button></p></div></div>';
  }

  /* ---------- Italien: Röstereien als Reiseziele ---------- */
  function regions() {
    return Object.keys(WU.REGIONS).map(function (v) {
      var r = WU.REGIONS[v], n = WU.coffees.filter(function (c) { return c.vendor === v; }).length;
      return '<a class="region" href="#/kaffee?roesterei=' + encodeURIComponent(v) + '" data-act="region" data-v="' + esc(v) + '"><span>' + esc(r.region) + '</span><b>' + esc(v) + '</b><p>' + esc(r.mood) + '</p><em>' + n + ' Röstungen ansehen</em></a>';
    }).join('');
  }
  var MAP = { 'La Messicana': [100, 90], 'Trombetta': [148, 203], 'Kremoso': [192, 239], 'Escaffe': [244, 256], 'Guglielmo': [251, 316], 'Ionia': [216, 361] };
  var mapSel = 'Guglielmo';
  function mapPanel() {
    var r = WU.REGIONS[mapSel], n = WU.coffees.filter(function (c) { return c.vendor === mapSel; });
    return '<span class="chip">' + ico('pin') + esc(r.place) + '</span><h3>' + esc(mapSel) + '</h3><p class="mood">' + esc(r.mood) + '</p><p>' + esc(r.line) + '</p>' +
      '<div class="map-beans">' + n.slice(0, 3).map(function (c) { return '<a href="' + href(c) + '" title="' + esc(c.title) + '"><img src="' + esc(c.img) + '" alt="' + esc(c.title) + '" loading="lazy" width="120" height="120"></a>'; }).join('') + '</div>' +
      '<a class="btn" href="#/kaffee?roesterei=' + encodeURIComponent(mapSel) + '" data-act="region" data-v="' + esc(mapSel) + '">' + n.length + ' Röstungen aus ' + esc(r.region) + '</a>';
  }
  function italyMap() {
    var pins = Object.keys(MAP).map(function (v) {
      var c = MAP[v], r = WU.REGIONS[v], right = c[0] < 170;
      return '<g class="pin' + (v === mapSel ? ' on' : '') + '" data-act="map" data-v="' + esc(v) + '" tabindex="0" role="button" aria-label="' + esc(r.region + ': ' + v) + '"><circle class="halo" cx="' + c[0] + '" cy="' + c[1] + '" r="15"/><circle class="dot" cx="' + c[0] + '" cy="' + c[1] + '" r="7"/><text x="' + (right ? c[0] - 14 : c[0] + 14) + '" y="' + (c[1] + 5) + '" text-anchor="' + (right ? 'end' : 'start') + '">' + esc(r.region) + '</text></g>';
    }).join('');
    return '<div class="italy"><div class="italy-map"><svg viewBox="0 0 340 400" role="group" aria-label="Italien-Karte mit unseren Röstereien">' +
      '<polygon class="land" points="40,70 60,40 110,25 160,30 200,45 215,70 190,85 180,110 205,150 225,185 245,205 262,200 258,214 270,235 300,255 318,275 305,285 285,268 262,262 255,285 270,305 262,330 245,350 232,340 240,310 228,285 210,262 190,245 165,222 140,198 118,170 100,140 92,115 70,105 45,112 35,95"/>' +
      '<polygon class="land" points="160,355 200,345 232,352 225,375 195,385 165,372"/><polygon class="land" points="70,225 92,220 98,255 88,285 70,280 64,250"/>' + pins + '</svg></div>' +
      '<div class="italy-panel" id="map-panel" aria-live="polite">' + mapPanel() + '</div></div>';
  }
  function roestereien() {
    return head('Röstereien', 'Sechs Röstereien, einmal quer durch Italien', 'Wir importieren direkt von Familienbetrieben, die wir selbst kennen und trinken.') +
      '<div class="wrap" style="padding-bottom:64px"><div class="places">' + Object.keys(WU.REGIONS).map(function (v) {
        var r = WU.REGIONS[v];
        return '<article class="place"><span class="chip">' + esc(r.place) + '</span><h2>' + esc(v) + '</h2><p>' + esc(r.line) + '</p><a class="btn sm ghost" href="#/kaffee?roesterei=' + encodeURIComponent(v) + '" data-act="region" data-v="' + esc(v) + '">Kaffees von ' + esc(v) + '</a></article>';
      }).join('') + '</div></div>';
  }

  /* ---------- Service-Seiten ---------- */
  function contactBox() {
    var o = WU.ORG;
    return '<aside class="aside"><h3>Persönlich für dich da</h3><p>' + esc(o.street) + '<br>' + o.zip + ' ' + esc(o.city) + '</p>' +
      '<a class="btn sm block" href="tel:' + o.phone.replace(/\s/g, '') + '" data-track="phone_click">' + esc(o.phone) + '</a>' +
      '<a class="btn sm ghost block" href="mailto:' + o.email + '" data-track="mail_click">E-Mail schreiben</a></aside>';
  }
  function seite(slug) {
    var p = WU.PAGES[slug], sc = WU.SC && WU.SC.pages[slug];
    if (!p) return head('Nicht gefunden', 'Diese Seite gibt es hier nicht') + '<div class="wrap" style="padding-bottom:64px"><a class="btn" href="#/">Zur Startseite</a></div>';
    var body = sc && sc.html ? sc.html : p.blocks.map(function (b) { return '<h2>' + esc(b[0]) + '</h2><p>' + esc(b[1]) + '</p>'; }).join('');
    var extra = slug === 'kontakt' ? '<h2>Öffnungszeiten</h2><p>Montag bis Freitag 10:00–18:30 Uhr<br>Samstag 10:00–17:00 Uhr</p>' : '';
    var gal = sc && sc.imgs && sc.imgs.length ? '<div class="gallery">' + sc.imgs.map(function (x) { return '<img src="' + esc(x) + '" alt="" loading="lazy" width="600" height="600">'; }).join('') + '</div>' : '';
    return head(p.title, p.title, p.intro) + '<div class="wrap with-aside"><div class="prose">' + (p.img ? '<img class="lead-img" src="' + WU.IMG(p.img) + '" alt="' + esc(p.title) + '" width="1200" height="675">' : '') +
      body + extra + gal + (p.links ? '<nav class="more"><b>Mehr dazu</b>' + p.links.map(function (x) { return '<a href="' + x[0] + '">' + esc(x[1]) + '</a>'; }).join('') + '</nav>' : '') + '</div>' + contactBox() + '</div>';
  }

  /* ---------- FAQ ---------- */
  function faqPage() {
    return head('FAQ', 'Fragen und Antworten', 'Alles zu Bestellung, 5+1, Kaffee und Maschinen. Deine Frage fehlt? Ruf uns an.') +
      '<div class="wrap with-aside"><div class="prose">' + WU.FAQ.map(function (g) {
        return '<h2>' + esc(g[0]) + '</h2>' + g[1].map(function (x) { return faq(x[0], x[1]); }).join('');
      }).join('') + '</div>' + contactBox() + '</div>';
  }

  /* ---------- Ratgeber ---------- */
  function guideCard(g) {
    return '<a class="guide" href="#/ratgeber/' + g.slug + '">' + (g.img ? '<img' + (g.fit ? ' class="fit"' : '') + ' src="' + (g.fit ? esc(g.img) : WU.IMG(g.img)) + '" alt="" loading="lazy" width="600" height="360">' : '') + '<span class="chip">' + esc(g.cat || 'Ratgeber') + ' · ' + g.min + ' Min.</span><h3>' + esc(g.title) + '</h3><p>' + esc(g.teaser) + '</p><em>Weiterlesen</em></a>';
  }
  /* Eigene Langtexte: [[p:handle]] wird zu einem Produktfoto mit Link */
  function crumbOf(p) { var c = p.kind === 'kaffee' || p.kind === 'paket' || ['Kaffee 1 kg', 'Kaffee 500 g', 'Kaffee 250 g', 'Moka gemahlen', 'Espresso gemahlen', 'E.S.E. Pads', 'Probierpakete'].indexOf(p.type) >= 0; if (c) return ['Kaffee', 'kaffee']; if (p.kind === 'live') return ['Sortiment', 'sortiment']; return ['Maschinen & Mühlen', 'maschinen']; }
  function rich(html) {
    return html.replace(/\[\[p:([a-z0-9-]+)\]\]/g, function (m, h) { var p = WU.byHandle(h); if (!p) return '';
      return '<figure class="pfig"><a href="#/p/' + p.handle + '"><img src="' + esc(p.img) + '" alt="' + esc(p.title) + '" loading="lazy" width="900" height="900"></a><figcaption><a href="#/p/' + p.handle + '">' + esc(p.title) + '</a> · ' + eur(p.price) + '</figcaption></figure>'; });
  }
  function ratgeber(slug) {
    if (!slug) {
      var cats = []; WU.GUIDES.forEach(function (g) { var c = g.cat || 'Ratgeber'; if (cats.indexOf(c) < 0) cats.push(c); });
      return head('Ratgeber', 'Ratgeber für besseren Espresso', 'Wissen aus Werkstatt und Geschäft: Maschinen, Mühlen, Zubereitung und die Röstereien hinter unseren Kaffees.') +
        '<div class="wrap" style="padding-bottom:64px">' + cats.map(function (c) { return '<h2 class="cat-h">' + esc(c) + '</h2><div class="guides">' + WU.GUIDES.filter(function (g) { return (g.cat || 'Ratgeber') === c; }).map(guideCard).join('') + '</div>'; }).join('') + '</div>';
    }
    var g = WU.GUIDES.filter(function (x) { return x.slug === slug; })[0];
    if (!g) return ratgeber();
    var rel = (g.related || []).map(WU.byHandle).filter(Boolean), sc = WU.SC && WU.SC.guides[slug];
    var next = (g.rel || []).map(function (s2) { return WU.GUIDES.filter(function (x) { return x.slug === s2; })[0]; }).filter(Boolean);
    return '<div class="wrap page-head"><p class="crumbs"><a href="#/">Start</a> / <a href="#/ratgeber">Ratgeber</a> / ' + esc(g.cat || 'Ratgeber') + '</p><h1>' + esc(g.title) + '</h1><p>' + esc(g.teaser) + '</p>' +
      '<p class="byline">Von Wake Up Espressomaschinen, Wien' + (g.date ? ' · ' + esc(g.date) : '') + ' · Lesezeit ' + g.min + ' Minuten</p></div>' +
      '<div class="wrap with-aside"><article class="prose">' + (g.img ? '<img class="lead-img' + (g.fit ? ' fit' : '') + '" src="' + (g.fit ? esc(g.img) : WU.IMG(g.img)) + '" alt="' + esc(g.title) + '" width="1200" height="675">' : '') +
      '<nav class="toc" id="toc" aria-label="Inhalt"></nav>' + (sc || '') + g.sections.map(function (x) { return '<h2>' + esc(x[0]) + '</h2><p>' + esc(x[1]) + '</p>'; }).join('') + (g.more || []).map(function (x) { return '<h2>' + esc(x[0]) + '</h2>' + rich(x[1]); }).join('') +
      (g.faq ? '<h2>Häufige Fragen</h2>' + g.faq.map(function (x) { return faq(x[0], x[1]); }).join('') : '') +
      (next.length ? '<h2>Weiterlesen</h2><ul class="next">' + next.map(function (n) { return '<li><a href="#/ratgeber/' + n.slug + '">' + esc(n.title) + '</a><span>' + esc(n.teaser) + '</span></li>'; }).join('') + '</ul>' : '') +
      '<p class="toc-end"><a class="btn sm ghost" href="#/ratgeber">Alle Ratgeber</a> <a class="btn sm" href="#/finder">Kaffee-Finder starten</a></p></article>' + contactBox() + '</div>' +
      (rel.length ? '<div class="wrap" style="padding-bottom:64px"><h2 style="margin-bottom:20px">Passend dazu</h2><div class="grid">' + rel.map(card).join('') + '</div></div>' : '<div style="height:48px"></div>');
  }

  /* ---------- Maschinen-Finder ---------- */
  var MQ = [
    { q: 'Wie oft machst du Milchschaum?', a: [['selten', 'Selten bis nie', 'Ich trinke vor allem Espresso'], ['oft', 'Regelmäßig', 'Cappuccino gehört dazu'], ['hebel', 'Egal, ich will das Handwerk', 'Hebel ziehen statt Knopf drücken']] },
    { q: 'Was darf die Maschine kosten?', a: [['1300', 'Bis rund € 1.300', 'Solider Einstieg'], ['2000', 'Bis rund € 2.000', 'Mehr Komfort'], ['max', 'Preis ist zweitrangig', 'Einmal kaufen, lange behalten']] }
  ];
  var mf = { step: 0, ans: [] };
  function mfResult() {
    var a = mf.ans;
    if (a[0] === 'hebel') return ['la-san-marco-20-20-leva', 'du das Handwerk suchst. Bei der Hebelmaschine baust du den Druck selbst auf'];
    if (a[0] === 'selten') return [a[1] === '1300' ? 'quickmill-carola-evo' : '969-coffee-elba-mini-lux', 'du vor allem Espresso trinkst. Ein Einkreiser ist dafür kompakt und unkompliziert'];
    if (a[1] === 'max') return ['lamarzocco-linea-mini-r', 'du regelmäßig Milch schäumst. Ein Dualboiler hält Brühtemperatur und Dampf getrennt stabil'];
    return ['elba-quattro', 'du regelmäßig Milch schäumst. Mit einem Zweikreiser beziehst du Espresso und schäumst gleichzeitig'];
  }
  function maschinenFinder() {
    var top = head('Maschinen-Finder', 'Welche Maschine passt zu dir?', 'Zwei Fragen, eine Empfehlung. Danach beraten wir dich gern persönlich.');
    if (mf.step < MQ.length) {
      var q = MQ[mf.step];
      return top + '<div class="wrap"><div class="finder"><p class="count">Frage ' + (mf.step + 1) + ' von ' + MQ.length + '</p><div class="prog"><b style="width:' + Math.round(mf.step / MQ.length * 100) + '%"></b></div><h2>' + q.q + '</h2><div class="answers">' +
        q.a.map(function (x) { return '<button class="answer" data-act="m-answer" data-v="' + x[0] + '"><b>' + x[1] + '</b><span>' + x[2] + '</span></button>'; }).join('') + '</div></div></div>';
    }
    var r = mfResult(), p = WU.byHandle(r[0]), over = mf.ans[1] !== 'max' && p.price > Number(mf.ans[1]) + 300;
    return top + '<div class="wrap"><div class="finder"><div class="prog"><b style="width:100%"></b></div><h2>Unsere Empfehlung</h2><div class="result"><img src="' + esc(p.img) + '" alt="" width="400" height="400"><div><span class="vendor">' + esc(p.vendor) + '</span><h3 style="font-size:1.6rem">' + esc(p.title) + '</h3>' +
      '<p class="why">Weil ' + esc(r[1]) + '. ' + esc(p.text) + (over ? ' Sie liegt über deinem Rahmen, ruf uns an, dann suchen wir gemeinsam eine Alternative.' : '') + '</p><p class="price" style="margin-bottom:14px">' + eur(p.price) + '</p>' +
      '<div style="display:flex;flex-wrap:wrap;gap:10px"><a class="btn sm" href="' + href(p) + '">Maschine ansehen</a><a class="btn sm ghost" href="#/seite/kontakt">Beratung anfragen</a></div></div></div>' +
      '<p style="margin-top:24px"><button class="tool" data-act="m-reset">Neu starten</button></p></div></div>';
  }

  /* ---------- Strukturierte Daten (schema.org) ---------- */
  function ld(view, parts) {
    var o = WU.ORG, here = (WU.SITE || location.origin) + '/', out = [], crumbs = [['Start', here]];
    out.push({ '@context': 'https://schema.org', '@type': 'Store', '@id': WU.SHOP + '/#store', name: o.name, url: WU.SHOP, logo: WU.LOGO, image: WU.LOGO, telephone: o.phone, email: o.email, foundingDate: String(o.since), priceRange: '€€',
      address: { '@type': 'PostalAddress', streetAddress: o.street, postalCode: o.zip, addressLocality: o.city, addressCountry: o.country },
      areaServed: ['AT', 'DE'], openingHoursSpecification: [{ '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '10:00', closes: '18:30' }, { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Saturday', opens: '10:00', closes: '17:00' }], paymentAccepted: 'PayPal, Klarna, Kreditkarte, Apple Pay, eps', sameAs: ['https://www.instagram.com/wakeupespresso_wien/'] });
    if (view === 'p') {
      var p = WU.byHandle(parts[1]);
      if (p) {
        var url = here.replace(/\/$/, '') + '/products/' + p.handle + '/', avail = 'https://schema.org/' + (p.preorder ? 'PreOrder' : 'InStock');
        var prod = { '@context': 'https://schema.org', '@type': 'Product', name: p.title, image: p.img, description: p.text, sku: p.id, brand: { '@type': 'Brand', name: p.vendor }, category: p.kind === 'kaffee' ? 'Espresso-Bohnen' : crumbOf(p)[0] === 'Kaffee' ? (p.type || 'Kaffee') : p.kind === 'live' ? (p.type || 'Zubehör') : 'Espressomaschinen und Mühlen' };
        var offs = (p.offers || []).map(function (o) { return { '@type': 'Offer', name: o[1], sku: o[3] || String(o[0]), priceCurrency: 'EUR', price: Number(o[2]).toFixed(2), availability: 'https://schema.org/' + (o[4] ? (p.preorder ? 'PreOrder' : 'InStock') : 'OutOfStock'), itemCondition: 'https://schema.org/NewCondition', url: url, seller: { '@id': WU.SHOP + '/#store' } }; });
        if (p.imgs && p.imgs.length) prod.image = p.imgs;
        prod.url = url; prod['@id'] = url + '#product';
        if (p.kind === 'kaffee') {
          prod.offers = offs.length ? offs : { '@type': 'Offer', priceCurrency: 'EUR', price: p.price.toFixed(2), availability: avail, url: url };
          prod.countryOfOrigin = { '@type': 'Country', name: 'Italien' };
          prod.additionalProperty = [['Röstung (1–5)', p.roast], ['Intensität (1–10)', p.intensity], ['Körper (1–5)', p.body], ['Bitterkeit (1–5)', p.bitter], ['Säure (1–5)', p.acid], ['Arabica-Anteil (%)', p.arabica], ['Aromen', p.aromas.join(', ')], ['Herkunft der Rösterei', (WU.REGIONS[p.vendor] || {}).place || 'Italien']]
            .map(function (x) { return { '@type': 'PropertyValue', name: x[0], value: x[1] }; });
        } else {
          prod.offers = offs.length ? offs : { '@type': 'Offer', priceCurrency: 'EUR', price: p.price.toFixed(2), availability: avail, url: url, itemCondition: 'https://schema.org/NewCondition', seller: { '@id': WU.SHOP + '/#store' } };
        }
        out.push(prod); crumbs.push([crumbOf(p)[0], here + '#/' + crumbOf(p)[1]], [p.title, here + '#/p/' + p.handle]);
      }
    } else if (view === 'maschinen') {
      var ms = WU.others.filter(function (x) { return x.kind !== 'paket'; });
      out.push({ '@context': 'https://schema.org', '@type': 'ItemList', name: 'Espressomaschinen und Mühlen', numberOfItems: ms.length, itemListElement: ms.map(function (c, i) { return { '@type': 'ListItem', position: i + 1, name: c.title, url: WU.SHOP + '/products/' + c.handle }; }) });
      crumbs.push(['Maschinen & Mühlen', here + '#/maschinen']);
    } else if (view === 'kaffee') {
      out.push({ '@context': 'https://schema.org', '@type': 'ItemList', name: 'Espresso-Bohnen aus Italien', numberOfItems: WU.coffees.length, itemListElement: WU.coffees.map(function (c, i) { return { '@type': 'ListItem', position: i + 1, name: c.title, url: WU.SHOP + '/products/' + c.handle }; }) });
      crumbs.push(['Kaffee', here + '#/kaffee']);
    } else if (view === 'faq' || view === 'home') {
      var qs = []; WU.FAQ.forEach(function (g) { g[1].forEach(function (x) { qs.push({ '@type': 'Question', name: x[0], acceptedAnswer: { '@type': 'Answer', text: x[1] } }); }); });
      out.push({ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: view === 'faq' ? qs : qs.slice(0, 4) });
      if (view === 'faq') crumbs.push(['FAQ', here + '#/faq']);
      if (view === 'home') out.push({ '@context': 'https://schema.org', '@type': 'WebSite', name: o.name, url: WU.SHOP });
    } else if (view === 'ratgeber') {
      crumbs.push(['Ratgeber', here + '#/ratgeber']);
      if (!parts[1]) out.push({ '@context': 'https://schema.org', '@type': 'Blog', name: 'Wake Up Ratgeber', inLanguage: 'de-AT', blogPost: WU.GUIDES.map(function (x) { return { '@type': 'BlogPosting', headline: x.title, description: x.teaser, image: x.img ? WU.IMG(x.img) : WU.LOGO, url: here + '#/ratgeber/' + x.slug }; }) });
      var g = WU.GUIDES.filter(function (x) { return x.slug === parts[1]; })[0];
      if (g) {
        out.push({ '@context': 'https://schema.org', '@type': 'Article', headline: g.title, description: g.teaser, datePublished: g.iso || '2026-11-13', articleSection: g.cat || 'Ratgeber', image: g.img ? WU.IMG(g.img) : WU.LOGO, mainEntityOfPage: here + '#/ratgeber/' + g.slug, inLanguage: 'de-AT', timeRequired: 'PT' + g.min + 'M', articleBody: g.sections.map(function (x) { return x[0] + ': ' + x[1]; }).join(' '), author: { '@type': 'Organization', name: o.name }, publisher: { '@id': WU.SHOP + '/#store' }, dateModified: '2026-11-13' });
        if (g.faq) out.push({ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: g.faq.map(function (x) { return { '@type': 'Question', name: x[0], acceptedAnswer: { '@type': 'Answer', text: x[1] } }; }) });
        crumbs.push([g.title, here + '#/ratgeber/' + g.slug]);
      }
    }
    out.push({ '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: crumbs.map(function (c, i) { return { '@type': 'ListItem', position: i + 1, name: c[0], item: c[1] }; }) });
    var el = document.getElementById('ld'); if (el) el.textContent = JSON.stringify(out);
  }

  /* ---------- Router ---------- */
  var STATIC_VIEWS = ['seite', 'ratgeber', 'faq', 'roestereien'];
  function route(first) {
    var h = cur().replace(/^#\/?/, ''), parts = h.split('/'), view = parts[0] || 'home', html;
    document.body.classList.remove('has-sticky', 'has-builder');
    if (view === 'kaffee') html = kaffee();
    else if (view === 'maschinen') html = maschinen();
    else if (view === 'p') { html = produkt(parts[1]); document.body.classList.add('has-sticky'); }
    else if (view === '5plus1') { html = builder(); document.body.classList.add('has-builder'); }
    else if (view === 'finder') html = finder();
    else if (view === 'maschinen-finder') html = maschinenFinder();
    else if (view === 'sortiment') html = sortiment();
    else if (view === 'faq') html = faqPage();
    else if (view === 'ratgeber') html = ratgeber(parts[1]);
    else if (view === 'roestereien') html = roestereien();
    else if (view === 'seite') html = seite(parts[1]);
    else { view = 'home'; html = home(); }
    if (!(first && app.hasAttribute('data-pre') && STATIC_VIEWS.indexOf(view) >= 0)) app.innerHTML = html;
    document.querySelectorAll('.nav a').forEach(function (a) {
      var hr = a.getAttribute('href'), on = hr === '#/' + (view === 'home' ? '' : view) || hr === toPath('#/' + (view === 'home' ? '' : view));
      if (on) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current');
    });
    var t = document.querySelector('#app h1'); document.title = (t ? t.textContent + ' | ' : '') + 'Wake Up Espressomaschinen';
    track('page_view', view + (parts[1] ? ':' + parts[1] : ''));
    ld(view, parts);
  }

  /* ---------- Events ---------- */
  document.addEventListener('click', function (ev) {
    var tr = ev.target.closest('[data-track]'); if (tr) track('cta_click', tr.getAttribute('data-track'));
    var el = ev.target.closest('[data-act]'); if (!el) return;
    var act = el.getAttribute('data-act'), d = el.dataset;
    if (act === 'add') { ev.preventDefault(); addToCart(d.id, 1); }
    else if (act === 'add-pdp') addToCart(pdp.id, pdp.qty);
    else if (act === 'opt') { pdp.id = d.id; route(); }
    else if (act === 'qty') { pdp.qty = Math.max(1, pdp.qty + Number(d.d)); route(); }
    else if (act === 'line-qty') { var l = cart.filter(function (x) { return x.id === d.id; })[0]; if (l) setQty(d.id, l.qty + Number(d.d)); }
    else if (act === 'cart-open') openCart();
    else if (act === 'cart-close') closeCart();
    else if (act === 'checkout') track('begin_checkout', totals().count + ' Artikel');
    else if (act === 'f-vendor') { filt.vendor = d.v; route(); track('filter_use', 'Rösterei ' + (d.v || 'alle')); }
    else if (act === 'f-taste') { filt.taste = filt.taste === d.v ? '' : d.v; route(); track('filter_use', 'Geschmack ' + d.v); }
    else if (act === 'f-type') { filt.type = d.v; route(); }
    else if (act === 'f-format') { filt.format = d.v; route(); }
    else if (act === 'f-reset') { filt.vendor = ''; filt.taste = ''; filt.format = ''; route(); }
    else if (act === 'b-vendor') { filt.bv = d.v; route(); }
    else if (act === 'pick') { if (picks.length < 6) { picks.push(WU.byHandle(d.h)); savePicks(); refreshBuilder(); track('bundle_slot_add', d.h); } }
    else if (act === 'unpick') { picks.splice(Number(d.i), 1); savePicks(); refreshBuilder(); }
    else if (act === 'to-builder') { if (picks.length < 6) { picks.push(WU.byHandle(d.h)); savePicks(); } location.href = toPath('#/5plus1'); }
    else if (act === 'builder-add') {
      if (picks.length < 6) return;
      picks.forEach(function (p) { addToCart(p.id, 1, true); });
      track('bundle_add_to_cart', '6 Kilo'); picks = []; savePicks(); refreshBuilder(); openCart();
    }
    else if (act === 'answer') { fin.ans[fin.step] = d.v; fin.step++; if (fin.step === 1) track('finder_start'); if (fin.step === QUESTIONS.length) track('finder_complete'); route(); window.scrollTo(0, 0); }
    else if (act === 'finder-back') { fin.step = Math.max(0, fin.step - 1); route(); }
    else if (act === 'finder-reset') { fin = { step: 0, ans: [] }; route(); }
    else if (act === 'region') { filt.vendor = d.v; filt.taste = ''; if (cur() === '#/kaffee') { ev.preventDefault(); route(); window.scrollTo(0, 0); } }
    else if (act === 'm-answer') { mf.ans[mf.step] = d.v; mf.step++; route(); window.scrollTo(0, 0); }
    else if (act === 'm-reset') { mf = { step: 0, ans: [] }; route(); }
    else if (act === 'map') { mapSel = d.v; var mp = document.getElementById('map-panel'); if (mp) mp.innerHTML = mapPanel(); document.querySelectorAll('.pin').forEach(function (g) { g.classList.toggle('on', g === el); }); track('map_select', d.v); }
    else if (act === 'thumb') { var im = document.getElementById('pdp-img'); if (im) im.src = d.src; document.querySelectorAll('.thumb').forEach(function (t) { t.classList.toggle('on', t === el); }); }
    else if (act === 'tlog') document.getElementById('tlog').classList.toggle('open');
  });
  document.addEventListener('change', function (ev) {
    if (ev.target.matches('[data-act="f-sort"]')) { filt.sort = ev.target.value; route(); }
  });
  document.addEventListener('keydown', function (ev) { if (ev.key === 'Escape') closeCart(); if ((ev.key === 'Enter' || ev.key === ' ') && ev.target.closest && ev.target.closest('.pin')) { ev.preventDefault(); ev.target.closest('.pin').dispatchEvent(new MouseEvent('click', { bubbles: true })); } });

  /* Links mit '#/…' (nach clientseitigem Neuzeichnen) auf echte Pfade führen */
  document.addEventListener('click', function (ev) {
    var a = ev.target.closest && ev.target.closest('a[href^="#/"]');
    if (!a || ev.defaultPrevented) return;
    ev.preventDefault(); location.href = toPath(a.getAttribute('href'));
  });
  try { var qv = new URLSearchParams(location.search).get('roesterei'); if (qv) filt.vendor = qv; } catch (e) {}
  var preFull = document.getElementById('full'), preHandle = (/^#\/p\/(.+)/.exec(cur()) || [])[1];
  if (preFull && preHandle) { WU.BODY = WU.BODY || {}; if (!WU.BODY[preHandle]) WU.BODY[preHandle] = preFull.innerHTML; }
  renderCart(); route(true);
})();
