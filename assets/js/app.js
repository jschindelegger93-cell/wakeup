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
    for (var j = 0; j < WU.others.length; j++) if (WU.others[j].id === id) return { p: WU.others[j], label: '', price: WU.others[j].price };
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
    var checkout = WU.SHOP + '/cart/' + cart.map(function (l) { return l.id + ':' + l.qty; }).join(',');
    body.innerHTML = ship + '<div class="lines">' + lines + hint + '</div><div class="drawer-foot">' +
      '<div class="tot"><span>Zwischensumme</span><span>' + eur(t.sub) + '</span></div>' +
      (t.free ? '<div class="tot save"><span>5+1: ' + t.free + ' Kilo gratis</span><span>− ' + eur(t.save) + '</span></div>' : '') +
      '<div class="tot big"><span>Summe</span><span>' + eur(t.total) + '</span></div>' +
      '<p class="fine">Preise inkl. MwSt. Versand wird an der Kassa berechnet.' + (t.free ? ' Der 5+1-Abzug ist hier eine Vorschau, im Shop rechnet ihn die Rabatt-App.' : '') + '</p>' +
      '<a class="btn block" href="' + esc(checkout) + '" data-act="checkout" rel="noopener">Zur Kassa</a></div>';
  }
  function openCart() { document.body.classList.add('cart-open'); track('cart_open'); }
  function closeCart() { document.body.classList.remove('cart-open'); }

  /* ---------- Bausteine ---------- */
  function beans(n) { var h = ''; for (var i = 1; i <= 5; i++) h += '<i' + (i <= n ? ' class="on"' : '') + '></i>'; return '<span class="beans" aria-label="Röstung ' + n + ' von 5">' + h + '</span>'; }
  function href(p) { return '#/p/' + p.handle; }
  function card(p) {
    var badge = p.compare ? '<span class="badge">Spare ' + eur(p.compare - p.price) + '</span>' : (p.preorder ? '<span class="badge dark">Vorbestellen</span>' : '');
    var meta = p.kind === 'kaffee' ? '<span class="roast">Röstung ' + beans(p.roast) + '</span>' : '';
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
      '<h1>Fünf Kilo aussuchen. Das sechste schenken wir dir.</h1>' +
      '<p class="hero-sub">Dunkel geröstet, säurearm und direkt aus Süditalien. Misch dir deinen Karton quer über alle sechs Röstereien.</p>' +
      '<div class="hero-cta"><a class="btn light" href="#/5plus1" data-track="hero_5plus1">Karton zusammenstellen</a><a class="btn line-light" href="#/kaffee" data-track="hero_kaffee">Alle Kaffees ansehen</a></div>' +
      '<ul class="hero-facts"><li>Gratis Versand ab € 89</li><li>Lieferung in 1–3 Werktagen</li><li>Wiener Familienbetrieb seit 2010</li></ul></div>' +
      '<a class="karton" href="#/5plus1" aria-label="Zum 5+1 Konfigurator" style="text-decoration:none;color:#fff"><div class="karton-top"><span>Dein Karton</span><em>5 bezahlen, 6 bekommen</em></div>' + slotsHtml(top, false) + '</a>' +
      '</div></section>' +

      '<section class="trust"><div class="wrap"><ul>' +
      '<li><b>Gratis Versand ab € 89</b><span>in Österreich, 1–3 Werktage</span></li>' +
      '<li><b>Eigene Werkstatt in Wien</b><span>Jede Maschine vor Versand geprüft</span></li>' +
      '<li><b>Persönliche Einschulung</b><span>Im Store, per Telefon oder Videocall</span></li>' +
      '<li><b>Frisch aus Italien</b><span>Mehrmals im Jahr nachbestellt</span></li></ul></div></section>' +

      '<section class="sec"><div class="wrap"><div class="cats">' +
      '<a class="cat dark" href="#/kaffee"><img src="' + esc(k.img) + '" alt=""><h3>Kaffee</h3><span>' + WU.coffees.length + ' Röstungen in der 1-kg-Packung</span></a>' +
      '<a class="cat" href="#/maschinen"><img src="' + esc(m.img) + '" alt=""><h3>Espressomaschinen</h3><span>Einkreiser bis Hebelmaschine</span></a>' +
      '<a class="cat" href="#/maschinen"><img src="' + esc(z.img) + '" alt=""><h3>Mühlen &amp; Sets</h3><span>Im Set 7 % sparen</span></a>' +
      '</div></div></section>' +

      '<section class="sec" style="padding-top:0"><div class="wrap"><div class="sec-head"><div><h2>Die Bestseller</h2><p>Was unsere Kundinnen und Kunden am häufigsten nachbestellen.</p></div><a class="link" href="#/kaffee">Alle ' + WU.coffees.length + ' Kaffees</a></div>' +
      '<div class="rail">' + WU.coffees.slice(0, 8).map(card).join('') + '</div></div></section>' +

      '<section class="sec band"><div class="wrap split"><div><h2>So funktioniert 5+1</h2><ol class="steps">' +
      '<li><div><b>Fünf Kilo frei wählen</b><span>Alle Kaffees mit 1-kg-Packung, auch gemischt.</span></div></li>' +
      '<li><div><b>Das sechste Kilo dazulegen</b><span>Du suchst es selbst aus, es kostet nichts.</span></div></li>' +
      '<li><div><b>Mit einem Klick in den Warenkorb</b><span>Ab € 89 liefern wir versandkostenfrei.</span></div></li></ol>' +
      '<a class="btn" style="margin-top:24px" href="#/5plus1">Karton zusammenstellen</a></div>' +
      '<div><h2>Noch unsicher?</h2><p style="margin-top:10px;color:var(--mut)">Drei kurze Fragen, dann zeigen wir dir die Röstung, die zu deinem Geschmack passt.</p><a class="btn ghost" style="margin-top:20px" href="#/finder">Kaffee-Finder starten</a></div></div></section>' +

      '<section class="sec"><div class="wrap"><div class="sec-head"><div><h2>Probierpakete</h2><p>Mehrere Röstungen auf einmal testen und dabei sparen.</p></div></div><div class="grid">' + pakete.map(card).join('') + '</div></div></section>' +

      '<section class="sec" style="padding-top:0"><div class="wrap"><div class="sec-head"><div><h2>Maschinen, die bleiben</h2><p>Profi-Technik für zu Hause. Geprüft in unserer Werkstatt, mit Einschulung geliefert.</p></div><a class="link" href="#/maschinen">Alle Maschinen und Mühlen</a></div>' +
      '<div class="rail">' + machines.map(card).join('') + '</div></div></section>' +

      '<section class="sec band"><div class="wrap split"><div><h2>Ein Familienbetrieb, der selbst schraubt</h2><p style="margin-top:12px;color:#3d2e25">Seit 2010 dreht sich bei uns in Wien alles um Espresso. Gründer Mario Sciurti ist selbst Techniker. Deshalb verkaufen wir nur Maschinen, die wir auch reparieren können und wollen.</p>' +
      '<ul class="facts"><li>Maschinenservice für alle bei uns gekauften Geräte</li><li>Mühle meist schon voreingestellt</li><li>Offizieller Vertreter von La San Marco</li></ul></div>' +
      '<div><h2>Häufige Fragen</h2><div style="margin-top:12px">' +
      faq('Ab wann ist der Versand gratis?', 'Ab € 89 Warenwert in Österreich und ab € 150 nach Deutschland.') +
      faq('Wie schnell wird geliefert?', 'Kaffee und Zubehör, die du bis 13 Uhr bestellst, gehen meist am selben Werktag raus. Die Lieferung dauert in der Regel 1–3 Werktage.') +
      faq('Wie kommt eine Espressomaschine zu mir?', 'Sicher auf Palette per Spedition. Vorher prüfen wir sie in unserer Werkstatt.') +
      faq('Wie kann ich bezahlen?', 'Mit PayPal, Klarna, Kreditkarte, Apple Pay oder eps.') +
      '</div></div></div></section>';
  }
  function faq(q, a) { return '<details><summary>' + esc(q) + '</summary><p>' + esc(a) + '</p></details>'; }

  /* ---------- Kaffee-Übersicht ---------- */
  var filt = { vendor: '', taste: '', sort: 'top' };
  var TASTES = { kraeftig: ['Kräftig', function (c) { return c.intensity >= 7; }], ausgewogen: ['Ausgewogen', function (c) { return c.intensity >= 4 && c.intensity <= 6; }], fein: ['Fein und mild', function (c) { return c.intensity <= 3; }] };
  function coffeeList() {
    var list = WU.coffees.filter(function (c) { return (!filt.vendor || c.vendor === filt.vendor) && (!filt.taste || TASTES[filt.taste][1](c)); });
    if (filt.sort === 'asc') list.sort(function (a, b) { return a.price - b.price; });
    if (filt.sort === 'desc') list.sort(function (a, b) { return b.price - a.price; });
    if (filt.sort === 'int') list.sort(function (a, b) { return b.intensity - a.intensity; });
    return list;
  }
  function kaffee() {
    var vendors = []; WU.coffees.forEach(function (c) { if (vendors.indexOf(c.vendor) < 0) vendors.push(c.vendor); });
    var list = coffeeList();
    var tools = '<button class="tool' + (!filt.vendor ? ' on' : '') + '" data-act="f-vendor" data-v="">Alle Röstereien</button>' +
      vendors.map(function (v) { return '<button class="tool' + (filt.vendor === v ? ' on' : '') + '" data-act="f-vendor" data-v="' + esc(v) + '">' + esc(v) + '</button>'; }).join('');
    var tastes = Object.keys(TASTES).map(function (k) { return '<button class="tool' + (filt.taste === k ? ' on' : '') + '" data-act="f-taste" data-v="' + k + '">' + TASTES[k][0] + '</button>'; }).join('') +
      '<select class="tool" data-act="f-sort" aria-label="Sortieren"><option value="top"' + (filt.sort === 'top' ? ' selected' : '') + '>Empfohlen</option><option value="asc"' + (filt.sort === 'asc' ? ' selected' : '') + '>Preis aufsteigend</option><option value="desc"' + (filt.sort === 'desc' ? ' selected' : '') + '>Preis absteigend</option><option value="int"' + (filt.sort === 'int' ? ' selected' : '') + '>Kräftigste zuerst</option></select>';
    return head('Kaffee', 'Espresso-Bohnen aus Italien', 'Dunkel geröstet und säurearm. Jede Röstung gibt es im 1-kg-Beutel und im Karton mit 5+1 Kilo.') +
      '<div class="wrap" style="padding-bottom:64px"><div class="tools">' + tools + '</div><div class="tools">' + tastes + '</div>' +
      '<p class="count">' + list.length + ' von ' + WU.coffees.length + ' Kaffees</p>' +
      (list.length ? '<div class="grid">' + list.map(card).join('') + '</div>' : '<div class="empty">Zu dieser Auswahl gibt es keinen Kaffee.<br><br><button class="btn sm" data-act="f-reset">Filter zurücksetzen</button></div>') + '</div>';
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
      group('muehle', 'Kaffeemühlen', 'Die Maschine ist nur so gut wie die Mühle daneben.') + '</div>';
  }

  /* ---------- Produktseite ---------- */
  var pdp = { id: '', qty: 1 };
  function meter(label, v, max) { return '<div class="meter"><span>' + label + '</span><i><b style="width:' + Math.round(v / max * 100) + '%"></b></i><em>' + v + '/' + max + '</em></div>'; }
  function produkt(h) {
    var p = WU.byHandle(h);
    if (!p) return head('Nicht gefunden', 'Dieses Produkt gibt es hier nicht') + '<div class="wrap" style="padding-bottom:64px"><a class="btn" href="#/kaffee">Zu den Kaffees</a></div>';
    var isC = p.kind === 'kaffee';
    if (pdp.h !== h) { pdp = { h: h, id: p.id, qty: 1 }; }
    var v = variant(pdp.id) || variant(p.id);
    var opts = isC ? '<div class="opts">' +
      '<button class="opt' + (pdp.id === p.id ? ' on' : '') + '" data-act="opt" data-id="' + p.id + '"><div><b>1 kg Bohnen</b><span>' + eur(p.price) + ' pro kg</span></div><strong>' + eur(p.price) + '</strong></button>' +
      '<button class="opt' + (pdp.id === p.kartonId ? ' on' : '') + '" data-act="opt" data-id="' + p.kartonId + '"><div><b>Karton mit 6 kg</b><span>5+1 kg gratis, ' + eur(p.price * 5 / 6) + ' pro kg</span></div><strong>' + eur(p.price * 5) + '</strong></button></div>' : '';
    var profile = isC ? '<div class="profile"><div><div class="blend-l"><span>' + p.arabica + ' % Arabica</span><span>' + (100 - p.arabica) + ' % Robusta</span></div><div class="blend"><b style="width:' + p.arabica + '%"></b></div></div>' +
      meter('Röstung', p.roast, 5) + meter('Intensität', p.intensity, 10) + meter('Körper', p.body, 5) + meter('Bitterkeit', p.bitter, 5) + meter('Säure', p.acid, 5) +
      '<div class="chips">' + p.aromas.map(function (a) { return '<span class="chip">' + esc(a.trim()) + '</span>'; }).join('') + '</div></div>' : '';
    var service = (p.kind === 'maschine' || p.kind === 'set') ? '<div class="service"><h3>Bei jeder Maschine dabei</h3><ul class="facts"><li>Vor dem Versand in unserer Werkstatt geprüft</li><li>Persönliche Einschulung per Telefon oder WhatsApp-Videocall</li><li>Maschinenservice bei uns in Wien</li><li>Lieferung sicher auf Palette per Spedition</li></ul></div>' : '';
    var label = p.preorder ? 'Vorbestellen' : 'In den Warenkorb';
    var priceHtml = (p.compare ? '<del>' + eur(p.compare) + '</del>' : '') + eur(v.price);
    return '<div class="wrap page-head"><p class="crumbs"><a href="#/">Start</a> / <a href="#/' + (isC || p.kind === 'paket' ? 'kaffee' : 'maschinen') + '">' + (isC || p.kind === 'paket' ? 'Kaffee' : 'Maschinen & Mühlen') + '</a></p></div>' +
      '<div class="wrap pdp"><div class="pdp-media"><img src="' + esc(p.img) + '" alt="' + esc(p.title) + '" width="800" height="800" fetchpriority="high"></div><div>' +
      '<span class="vendor">' + esc(p.vendor) + '</span><h1>' + esc(p.title) + '</h1>' +
      (isC ? '<p class="roast" style="margin-top:10px">Röstung ' + beans(p.roast) + '</p>' : '') +
      '<div class="pdp-price"><span class="price">' + priceHtml + '</span>' + (p.compare ? '<span class="chip" style="background:var(--rosso);color:#fff">Spare ' + eur(p.compare - p.price) + '</span>' : '') + (p.preorder ? '<span class="chip">Vorbestellung</span>' : '') + '</div>' +
      '<p class="pdp-note">Preis inkl. MwSt., zzgl. Versand. Kostenloser Versand ab € 89 Warenwert.</p>' + opts +
      '<div class="buy"><div class="qty"><button data-act="qty" data-d="-1" aria-label="Weniger">−</button><output>' + pdp.qty + '</output><button data-act="qty" data-d="1" aria-label="Mehr">+</button></div>' +
      '<button class="btn" data-act="add-pdp">' + label + '</button></div>' +
      (isC ? '<button class="btn ghost block" style="margin-top:10px" data-act="to-builder" data-h="' + p.handle + '">In meinen 5+1 Karton legen</button>' : '') +
      '<ul class="facts"><li>Lieferung in 1–3 Werktagen in Österreich</li>' + (isC ? '<li>Im 6-kg-Karton zahlst du nur 5 kg</li>' : '') + '<li>Sicher zahlen mit PayPal, Klarna, Karte, Apple Pay oder eps</li></ul>' +
      profile + '<p class="pdp-text">' + esc(p.text) + '</p>' + service +
      '<p style="margin-top:18px"><a class="link" href="' + WU.SHOP + '/products/' + p.handle + '" rel="noopener">Vollständige Beschreibung im Shop</a></p>' +
      '</div></div>' +
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
    var top = head('Kaffee-Finder', 'Welcher Kaffee passt zu dir?', 'Drei Fragen, eine Empfehlung mit Begründung.');
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

  /* ---------- Router ---------- */
  function route() {
    var h = location.hash.replace(/^#\/?/, ''), parts = h.split('/'), view = parts[0] || 'home', html;
    document.body.classList.remove('has-sticky', 'has-builder');
    if (view === 'kaffee') html = kaffee();
    else if (view === 'maschinen') html = maschinen();
    else if (view === 'p') { html = produkt(parts[1]); document.body.classList.add('has-sticky'); }
    else if (view === '5plus1') { html = builder(); document.body.classList.add('has-builder'); }
    else if (view === 'finder') html = finder();
    else { view = 'home'; html = home(); }
    app.innerHTML = html;
    document.querySelectorAll('.nav a').forEach(function (a) {
      var on = a.getAttribute('href') === '#/' + (view === 'home' ? '' : view);
      if (on) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current');
    });
    var t = document.querySelector('#app h1'); document.title = (t ? t.textContent + ' | ' : '') + 'Wake Up Espressomaschinen';
    track('page_view', view + (parts[1] ? ':' + parts[1] : ''));
  }
  var lastPath = '';
  window.addEventListener('hashchange', function () {
    var path = location.hash; route();
    if (path !== lastPath) window.scrollTo(0, 0);
    lastPath = path; closeCart();
  });

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
    else if (act === 'f-reset') { filt.vendor = ''; filt.taste = ''; route(); }
    else if (act === 'b-vendor') { filt.bv = d.v; route(); }
    else if (act === 'pick') { if (picks.length < 6) { picks.push(WU.byHandle(d.h)); savePicks(); refreshBuilder(); track('bundle_slot_add', d.h); } }
    else if (act === 'unpick') { picks.splice(Number(d.i), 1); savePicks(); refreshBuilder(); }
    else if (act === 'to-builder') { if (picks.length < 6) { picks.push(WU.byHandle(d.h)); savePicks(); } location.hash = '#/5plus1'; }
    else if (act === 'builder-add') {
      if (picks.length < 6) return;
      picks.forEach(function (p) { addToCart(p.id, 1, true); });
      track('bundle_add_to_cart', '6 Kilo'); picks = []; savePicks(); refreshBuilder(); openCart();
    }
    else if (act === 'answer') { fin.ans[fin.step] = d.v; fin.step++; if (fin.step === 1) track('finder_start'); if (fin.step === QUESTIONS.length) track('finder_complete'); route(); window.scrollTo(0, 0); }
    else if (act === 'finder-back') { fin.step = Math.max(0, fin.step - 1); route(); }
    else if (act === 'finder-reset') { fin = { step: 0, ans: [] }; route(); }
    else if (act === 'tlog') document.getElementById('tlog').classList.toggle('open');
  });
  document.addEventListener('change', function (ev) {
    if (ev.target.matches('[data-act="f-sort"]')) { filt.sort = ev.target.value; route(); }
  });
  document.addEventListener('keydown', function (ev) { if (ev.key === 'Escape') closeCart(); });

  renderCart(); route(); lastPath = location.hash;
})();
