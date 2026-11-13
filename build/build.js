// Baut die statische Seite nach dist/: Shop-Daten normalisieren, jede Seite vorrendern, SEO-Kopf und Schema einsetzen.
const fs = require('fs'), path = require('path'), vm = require('vm');
const { JSDOM } = require('jsdom');
const ROOT = path.join(__dirname, '..'), SRC = path.join(ROOT, 'src'), OUT = path.join(ROOT, 'dist'), SHOPDATA = path.join(ROOT, 'data', 'shop');
const SITE = process.env.SITE_URL || 'https://ephemeral-babka-c0e0eb.netlify.app';
const PREVIEW = process.env.GO_LIVE !== '1';            // Vorschau: noindex. Für Go-live GO_LIVE=1 setzen.
const SHOP = 'https://www.wakeup-espresso.com', CDN = 'https://cdn.shopify.com/s/files/1/0810/6799/9560/files/';
const read = f => fs.readFileSync(f, 'utf8');
const write = (f, s) => { fs.mkdirSync(path.dirname(f), { recursive: true }); fs.writeFileSync(f, s); };
const text = s => String(s || '').replace(/<[^>]+>/g, ' ').replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/\s+/g, ' ').trim();
const cut = (s, n) => { s = text(s); if (s.length <= n) return s; const t = s.slice(0, n); const i = Math.max(t.lastIndexOf('. '), t.lastIndexOf('! ')); return i > n * 0.5 ? t.slice(0, i + 1) : t.slice(0, t.lastIndexOf(' ')) + ' …'; };

// ---------- Adressen ----------
const PAGE_MAP = { 'about-us': 'ueber-uns', 'contact': 'kontakt', 'gastro-buro': 'gastro-buero', 'versand-rabatte': 'versand-rabatte', 'maschinenservice': 'maschinenservice', 'einschulungen': 'einschulungen', 'kaffeeabonnement': 'kaffee-abo', 'info-eureka': 'eureka', 'info-mazzer': 'mazzer' };
const ROASTER_MAP = { 'info-guglielmo': 'roesterei-guglielmo', 'info-kremoso': 'roesterei-kremoso', 'die-roesterei-ionia': 'roesterei-ionia', 'info-trombetta': 'roesterei-trombetta', 'info-lamessicana': 'roesterei-la-messicana' };
const BLOG_MAP = { 'einkreiser-zweikreiser-dualboiler-hebelmashinen': 'einkreiser-zweikreiser-dualboiler-hebelmaschinen', 'reinigung-wartung-was-tun': 'reinigung-wartung', 'muhlen-im-vergleich': 'kaffeemuehlen-im-vergleich', 'espresso-unterwegs-warum-die-moka-kanne-der-perfekte-reisebegleiter-ist': 'moka-kanne' };
const MACHINE_COLS = /espressomaschinen|mahlwerke|eureka|mazzer|969|quickmill|lamarzocco|lasanmarco|hebel|kreiser|dual-boiler/;
const COFFEE_COLS = /kaffee|espresso-gemahlen|moka|cialde|probier|guglielmo|kremoso|escaffe|ionia|trombetta|messicana/;
let HANDLES = new Set();
function mapUrl(href) {
  if (!href) return href;
  let u = href.replace(/^https?:\/\/(www\.)?wakeup-espresso\.com/, '').replace(/^file:\/\/\/C:/, '');
  if (/^(https?:|mailto:|tel:|#)/.test(u)) return u;
  let m;
  if ((m = /^\/products\/([^\/?#]+)/.exec(u))) return HANDLES.has(m[1]) ? '/products/' + m[1] + '/' : SHOP + u;
  if ((m = /^\/collections\/([^\/?#]+)/.exec(u))) return MACHINE_COLS.test(m[1]) ? '/collections/maschinen/' : COFFEE_COLS.test(m[1]) ? '/collections/kaffee/' : '/collections/alle/';
  if ((m = /^\/pages\/([^\/?#]+)/.exec(u))) return m[1] === 'faq' ? '/pages/faq/' : PAGE_MAP[m[1]] ? '/pages/' + PAGE_MAP[m[1]] + '/' : ROASTER_MAP[m[1]] ? '/blogs/ratgeber/' + ROASTER_MAP[m[1]] + '/' : SHOP + u;
  if ((m = /^\/blogs\/news\/([^\/?#]+)/.exec(u))) return BLOG_MAP[m[1]] ? '/blogs/ratgeber/' + BLOG_MAP[m[1]] + '/' : '/blogs/ratgeber/';
  return u.startsWith('/') ? SHOP + u : u;
}

// ---------- HTML aus dem Shop säubern ----------
const KEEP = new Set(['P', 'H2', 'H3', 'H4', 'UL', 'OL', 'LI', 'STRONG', 'B', 'EM', 'I', 'A', 'IMG', 'BR', 'TABLE', 'THEAD', 'TBODY', 'TR', 'TD', 'TH', 'BLOCKQUOTE']);
const DROP = new Set(['SCRIPT', 'STYLE', 'IFRAME', 'FORM', 'INPUT', 'BUTTON', 'SVG', 'NOSCRIPT', 'VIDEO', 'LINK', 'META', 'SELECT', 'TEXTAREA', 'OBJECT']);
function sanitize(html) {
  const doc = new JSDOM('<body>' + (html || '') + '</body>').window.document;
  const walk = node => {
    [...node.children].forEach(el => {
      if (DROP.has(el.tagName)) return el.remove();
      walk(el);
      let tag = el.tagName;
      if (tag === 'H1' || tag === 'H5' || tag === 'H6') { const n = doc.createElement(tag === 'H1' ? 'h2' : 'h4'); n.innerHTML = el.innerHTML; el.replaceWith(n); return; }
      if (!KEEP.has(tag)) {
        const block = ['DIV', 'SECTION', 'ARTICLE'].includes(tag) && [...el.childNodes].some(c => c.nodeType === 3 && c.textContent.trim());
        if (block) { const n = doc.createElement('p'); n.innerHTML = el.innerHTML; el.replaceWith(n); } else el.replaceWith(...el.childNodes);
        return;
      }
      [...el.attributes].forEach(a => { if (!['href', 'src', 'alt', 'colspan', 'rowspan'].includes(a.name)) el.removeAttribute(a.name); });
      if (tag === 'A') { const h = mapUrl(el.getAttribute('href')); if (!h || /^javascript:/i.test(h)) el.replaceWith(...el.childNodes); else { el.setAttribute('href', h); if (/^https?:/.test(h)) el.setAttribute('rel', 'noopener'); } }
      if (tag === 'IMG') { let s = el.getAttribute('src') || ''; if (s.startsWith('//')) s = 'https:' + s; if (!/^https:\/\/cdn\.shopify\.com/.test(s)) return el.remove(); el.setAttribute('src', s); el.setAttribute('loading', 'lazy'); if (!el.hasAttribute('alt')) el.setAttribute('alt', ''); }
    });
  };
  walk(doc.body);
  doc.body.querySelectorAll('p,h2,h3,h4,li').forEach(e => { if (!e.textContent.trim() && !e.querySelector('img')) e.remove(); });
  doc.body.querySelectorAll('table').forEach(tb => { const w = doc.createElement('div'); w.className = 'tbl'; tb.replaceWith(w); w.appendChild(tb); const r = tb.querySelector('tr'); if (r && !tb.querySelector('th')) r.querySelectorAll('td').forEach(c => { const th = doc.createElement('th'); th.innerHTML = c.innerHTML; c.replaceWith(th); }); });
  return doc.body.innerHTML.replace(/\]\]&gt;/g, '').replace(/(<br\s*\/?>\s*){3,}/g, '<br><br>').replace(/\u00a0/g, ' ').trim();
}

// ---------- Produkte ----------
const shopProducts = JSON.parse(read(path.join(SHOPDATA, 'products.json'))).products;
shopProducts.forEach(p => HANDLES.add(p.handle));
const sb = {}; sb.window = sb; vm.runInNewContext(read(path.join(__dirname, 'profiles.js')), sb);
const PROFILE = {}; sb.WU.COFFEE_ROWS.forEach(r => { PROFILE[r[0]] = r; });
const PAKETE = ['probierpaket-6x1kg-bohnen', 'wake-up-bestseller-4x1kg-bohnen', 'wake-up-finest-selection-4x1kg-bohnen', 'wake-up-coffein-bombs-6x1kg-bohnen'];
const PREORDER = ['lamarzocco-linea-mini-r', '969-coffee-elba-gentile-kipphebel', '969-coffee-elba-gentile', 'quickmill-carola-evo', 'mazzer-mini-g'];
const TYPE_FIX = { 'Reinigungsmittel': 'Reinigung', 'Ersatzteil': 'Ersatzteile', 'Vakkumbehälter': 'Vakuumbehälter', 'Espressomaschine': 'Espressomaschinen', 'Kaffeemühle': 'Mühlen' };
const vendor = v => /wake up/i.test(v) ? 'Wake Up' : v === '969 coffee' ? '969.coffee' : /^joe ?frex$/i.test(v) ? 'Joe Frex' : v;
const BODY = {}, coffees = [], others = [];
shopProducts.forEach(p => {
  const vs = p.variants.map(v => ({ id: String(v.id), title: v.title === 'Default Title' ? 'Standard' : v.title, price: Number(v.price), compare: Number(v.compare_at_price) || 0, available: !!v.available, sku: v.sku || '' }));
  const imgs = p.images.slice(0, 6).map(i => i.src.replace(/\?.*$/, '') + '?width=900');
  const body = sanitize(p.body_html); if (text(body)) BODY[p.handle] = '<h2>Beschreibung</h2>' + body;
  const base = { handle: p.handle, vendor: vendor(p.vendor), img: imgs[0] || CDN + 'WU_LOGO_transparent.png', imgs, text: cut(body, 230), offers: vs.map(v => [v.id, v.title, v.price, v.sku, v.available ? 1 : 0]), preorder: PREORDER.includes(p.handle) };
  const r = PROFILE[p.handle], kg = vs.find(v => /^(1000g|1kg)$/.test(v.title.toLowerCase().replace(/\s/g, ''))), karton = vs.find(v => /karton/i.test(v.title));
  if (r && kg) { coffees.push(Object.assign(base, { kind: 'kaffee', title: r[1], id: kg.id, kartonId: karton ? karton.id : '', price: kg.price, roast: r[7], intensity: r[8], acid: r[9], body: r[10], bitter: r[11], arabica: r[12], aromas: r[13].split(',') })); return; }
  const v0 = vs.find(v => v.available) || vs[0], t = p.title;
  let kind = 'live', type = TYPE_FIX[p.product_type] || p.product_type || 'Weiteres';
  if (PAKETE.includes(p.handle)) kind = 'paket';
  else if (/^Maschinenset/.test(t)) kind = 'set';
  else if (p.product_type === 'Espressomaschine') kind = 'maschine';
  else if (p.product_type === 'Kaffeemühle') kind = 'muehle';
  else if (p.product_type === 'Kaffee') type = /Probier|TESTEN/.test(t) ? 'Probierpakete' : /Cialde|Pads/.test(t) ? 'E.S.E. Pads' : /MOKA/.test(t) ? 'Moka gemahlen' : /gemahlen/.test(t) ? 'Espresso gemahlen' : /500g/.test(t) ? 'Kaffee 500 g' : /250g/.test(t) ? 'Kaffee 250 g' : 'Kaffee 1 kg';
  others.push(Object.assign(base, { kind, type, live: kind === 'live', title: t.replace(/\s+-\s+/g, ' ').trim(), id: v0.id, price: v0.price, compare: v0.compare > v0.price ? v0.compare : 0, soldout: !v0.available, variants: vs.map(v => ({ id: v.id, title: v.title, price: v.price, available: v.available })) }));
});
const order = sb.WU.COFFEE_ROWS.map(r => r[0]); coffees.sort((a, b) => order.indexOf(a.handle) - order.indexOf(b.handle));
const kindRank = { paket: 0, maschine: 1, set: 2, muehle: 3, live: 4 }; others.sort((a, b) => kindRank[a.kind] - kindRank[b.kind] || (a.kind === 'live' ? a.type.localeCompare(b.type) : a.price - b.price));

// ---------- Seiten, Blog, FAQ aus dem Shop ----------
const rawPages = JSON.parse(read(path.join(SHOPDATA, 'pages.json')));
const dom = k => new JSDOM('<div id="x">' + (rawPages[k] || '') + '</div>').window.document.getElementById('x');
const rte = (k, all) => { const l = [...dom(k).querySelectorAll('.rte')].filter(e => !e.closest('details') && text(e.innerHTML).length > 40); if (!l.length) return ''; return all ? [...new Set(l.map(e => sanitize(e.innerHTML)))].map(h => /^</.test(h) ? h : '<p>' + h + '</p>').join('') : sanitize(l.sort((a, b) => b.textContent.length - a.textContent.length)[0].innerHTML); };
const imgsOf = (k, re) => [...new Set([...dom(k).querySelectorAll('img')].map(i => (i.getAttribute('src') || i.getAttribute('data-src') || '')).map(s => s.startsWith('//') ? 'https:' + s : s).filter(s => re.test(s)).map(s => s.replace(/\?.*$/, '').replace(/_\d+x(\d+)?(?=\.\w+$)/, '') + '?width=700'))];
const SC = { pages: {}, guides: {} };
Object.keys(PAGE_MAP).forEach(k => { const slug = PAGE_MAP[k]; if (slug === 'kontakt') return; SC.pages[slug] = { html: rte('page-' + k, ['about-us', 'gastro-buro'].includes(k)), imgs: k === 'about-us' ? imgsOf('page-' + k, /TEAM/i) : k === 'gastro-buro' ? imgsOf('page-' + k, /Gastro_/) : [] }; });
{ // Über uns: Einleitung, Geschichte und Team mit Namen und Fotos
  const d = dom('page-about-us'), intro = d.querySelector('.rte'), esc2 = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');
  let h = intro ? sanitize(intro.innerHTML) : '';
  const tl = [...d.querySelectorAll('.timeline-content--inner')];
  if (tl.length) h += '<h2>Unsere Geschichte</h2>' + tl.map(e => '<h3>' + esc2(e.querySelector('h5').textContent.trim()) + '</h3>' + sanitize(e.querySelector('.rte').innerHTML)).join('');
  const team = [...d.querySelectorAll('.multi-row--row-inner')];
  if (team.length) h += '<h2>Unser Team</h2><div class="team">' + team.map(e => { const n = e.querySelector('.multi-row--content-heading').textContent.replace(/\s+/g, ' ').trim(), i = e.querySelector('img'), f = i ? (i.getAttribute('src') || '').split('/').pop().replace(/\?.*$/, '') : '';
    return '<div class="member">' + (f ? '<img src="' + CDN + f + '?width=700" alt="' + esc2(n) + ', Wake Up Espressomaschinen" loading="lazy" width="630" height="420">' : '') + '<div><h3>' + esc2(n) + '</h3>' + sanitize(e.querySelector('.rte').innerHTML) + '</div></div>'; }).join('') + '</div>';
  SC.pages['ueber-uns'] = { html: h, imgs: [] };
}
Object.keys(ROASTER_MAP).forEach(k => { SC.guides[ROASTER_MAP[k]] = rte('page-' + k); });
const unent = s => s.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&amp;/g, '&');
read(path.join(SHOPDATA, 'blog.atom')).split('<entry>').slice(1).forEach(e => {
  const link = (e.match(/<link[^>]*href="([^"]+)"/) || [])[1] || '', h = link.split('/').pop(), c = (e.match(/<content[^>]*>([\s\S]*?)<\/content>/) || [])[1] || '';
  if (BLOG_MAP[h]) SC.guides[BLOG_MAP[h]] = sanitize(unent(c));
});
const FAQ_SHOP = []; { let cur = null; const groups = ['Kaffee', 'Espresso Maschinen & Mahlwerke', 'Bestellungen', 'Sonstiges'];
  dom('page-faq').querySelectorAll('h2,h3,details').forEach(el => {
    if (el.tagName !== 'DETAILS') { const t = el.textContent.trim(); if (groups.includes(t)) { cur = [t.replace('Espresso Maschinen & Mahlwerke', 'Maschinen und Mühlen'), []]; FAQ_SHOP.push(cur); } return; }
    const q = el.querySelector('summary'); if (!q || !cur) return; const qt = q.textContent.replace(/\s+/g, ' ').trim(); const c = el.cloneNode(true); c.querySelector('summary').remove();
    const a = c.innerHTML.replace(/<\/(p|li|div|h\d)>|<br\s*\/?>/gi, ' ').replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/\s+/g, ' ').trim(); if (qt && a) cur[1].push([qt, a]);
  }); }

// ---------- Client-Daten ----------
const dataJs = '/* Automatisch erzeugt aus data/shop/products.json (node build/build.js). Nicht von Hand bearbeiten. */\n' +
  'window.WU=' + JSON.stringify({ CDN, SHOP, SITE, FREE_SHIPPING: 89, LOGO: CDN + 'WU_LOGO_transparent.png?v=1709016505', staticCatalog: true, coffees, others, FAQ_SHOP }) + ';\n' +
  'WU.all=WU.coffees.concat(WU.others);WU.byHandle=function(h){for(var i=0;i<WU.all.length;i++)if(WU.all[i].handle===h)return WU.all[i];};\n';

// ---------- Vorrendern ----------
fs.rmSync(OUT, { recursive: true, force: true });
fs.cpSync(path.join(SRC, 'assets'), path.join(OUT, 'assets'), { recursive: true });
write(path.join(OUT, 'assets/js/data.js'), dataJs);
const template = read(path.join(SRC, 'template.html')), contentJs = read(path.join(SRC, 'assets/js/content.js')), appJs = read(path.join(SRC, 'assets/js/app.js'));
const probe = new JSDOM('', { runScripts: 'outside-only' }).window; probe.eval(dataJs); probe.eval(contentJs);
const routes = ['/', '/collections/kaffee/', '/collections/maschinen/', '/collections/alle/', '/pages/5plus1/', '/pages/kaffee-finder/', '/pages/maschinen-finder/', '/pages/faq/', '/pages/roestereien/', '/blogs/ratgeber/']
  .concat(Object.keys(probe.WU.PAGES).map(s => '/pages/' + s + '/'), probe.WU.GUIDES.map(g => '/blogs/ratgeber/' + g.slug + '/'), probe.WU.all.map(p => '/products/' + p.handle + '/'));
const slugify = s => s.toLowerCase().replace(/ä/g, 'ae').replace(/ö/g, 'oe').replace(/ü/g, 'ue').replace(/ß/g, 'ss').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const HOME = { title: 'Italienischer Espresso & Siebträgermaschinen | Wake Up Wien', desc: 'Espresso wie im Italien-Urlaub: säurearme Röstungen aus Süditalien, Siebträgermaschinen mit Einschulung und der 5+1 Karton. Gratis Versand ab € 89.' };
// Titel und Beschreibungen nach Keyword-Planer (Österreich, Nov. 2025 bis Okt. 2026)
const SEO = {
  '/collections/maschinen/': ['Siebträgermaschinen & Espressomaschinen kaufen | Wake Up Wien', 'Siebträger-Kaffeemaschinen und Espressomaschinen von 969.coffee, Quick Mill, La Marzocco und La San Marco. In Wien testen, mit Einschulung und eigener Werkstatt.'],
  '/collections/kaffee/': ['Italienische Kaffeebohnen & Espresso kaufen | Wake Up Wien', 'Italienischer Kaffee von Guglielmo, Kremoso, Ionia und Co.: säurearme Bohnen in 1 kg, 500 g und 250 g, gemahlen und als Pads. 5+1 Kilo gratis, Versand ab € 89 frei.'],
  '/collections/alle/': ['Kaffeezubehör, Kaffee & Espressomaschinen | Wake Up Wien', 'Kaffeezubehör aus Wien: Tamper, Milchkännchen, Reiniger, Ersatzteile, dazu italienische Kaffeebohnen, Siebträgermaschinen und Mühlen. Gratis Versand ab € 89.'],
  '/pages/maschinen-finder/': ['Welche Siebträgermaschine passt zu mir? Maschinen-Finder', 'Zwei Fragen, eine Empfehlung: So findest du die Siebträger-Kaffeemaschine, die zu deinem Alltag passt. Danach beraten wir dich persönlich in Wien.'],
  '/pages/einschulungen/': ['Barista-Einschulung für deine Siebträgermaschine | Wake Up Wien', null],
  '/blogs/ratgeber/erste-siebtraegermaschine/': ['Erste Siebträgermaschine kaufen und testen: Kaufberatung', 'Welche Siebträgermaschine für Einsteiger? Bauarten, Mühle, Zubehör und typische Fehler. Mit Tipp, wie du Maschinen in Wien vor dem Kauf testen kannst.'],
  '/blogs/ratgeber/roesterei-guglielmo/': ['Guglielmo Kaffee aus Kalabrien: Rösterei & alle Sorten', null]
};
HOME.title = 'Wake Up Espressomaschinen Wien | Siebträger & Kaffee';
HOME.desc = 'Siebträgermaschinen, Mühlen und italienische Kaffeebohnen aus Wien. Säurearme Röstungen aus Süditalien, Einschulung, eigene Werkstatt und 5+1 Kilo gratis.';
const sitemap = [];
routes.forEach(route => {
  const d = new JSDOM(template, { url: SITE + route, runScripts: 'outside-only', pretendToBeVisual: true }), w = d.window, doc = w.document;
  w.scrollTo = () => {}; w.eval(dataJs); w.WU.SC = SC; w.WU.BODY = BODY; w.eval(contentJs); w.eval(appJs);
  doc.getElementById('app').setAttribute('data-pre', '1');
  // Inhaltsverzeichnis
  const toc = doc.getElementById('toc');
  if (toc) { const hs = [...doc.querySelectorAll('.prose > h2')]; const used = {};
    hs.forEach(h => { let id = slugify(h.textContent) || 'abschnitt'; while (used[id]) id += '-2'; used[id] = 1; h.id = id; });
    if (hs.length >= 3) toc.innerHTML = '<b>Inhalt</b><ol>' + hs.map(h => '<li><a href="#' + h.id + '">' + h.textContent + '</a></li>').join('') + '</ol>'; else toc.remove(); }
  { const bl = doc.querySelector('.byline'), pr = doc.querySelector('.prose'); if (bl && pr) bl.textContent = bl.textContent.replace(/Lesezeit \d+ Minuten/, 'Lesezeit ' + Math.max(2, Math.round(pr.textContent.split(/\s+/).length / 200)) + ' Minuten'); }
  // echte Links
  doc.querySelectorAll('a[href^="#/"]').forEach(a => a.setAttribute('href', w.WU.toPath(a.getAttribute('href'))));
  doc.querySelectorAll('.prose a[href^="/"], .rich a[href^="/"]').forEach(a => { if (!routes.includes(a.getAttribute('href').replace(/[?#].*$/, ''))) a.setAttribute('href', SHOP + a.getAttribute('href')); });
  doc.querySelectorAll('.rich img:not([alt]), .prose img[alt=""]').forEach(i => i.setAttribute('alt', (doc.querySelector('h1') || {}).textContent || ''));
  doc.body.className = doc.body.className.replace(/cart-open/, '').trim();
  // Kopf
  const h1 = (doc.querySelector('#app h1') || {}).textContent || 'Wake Up Espressomaschinen';
  const prod = route.startsWith('/products/') ? w.WU.byHandle(route.split('/')[2]) : null, isArt = /^\/blogs\/ratgeber\/.+/.test(route);
  let title = route === '/' ? HOME.title : h1 + ' | Wake Up Espressomaschinen'; if (title.length > 62) title = h1 + ' | Wake Up'; if (title.length > 62) title = h1;
  const lead = doc.querySelector('.page-head > p:not(.crumbs):not(.byline)') || doc.querySelector('.hero-sub');
  let desc = route === '/' ? HOME.desc : prod ? cut((prod.text || h1) + (prod.kind === 'kaffee' ? ' Jetzt im 1-kg-Beutel oder im Karton mit 5+1 Kilo bestellen.' : ' Gratis Versand ab € 89.'), 158) : cut(lead ? lead.textContent : h1, 158);
  if (desc.length < 110) { const fp = [...doc.querySelectorAll('.prose > p, .rich p, .page-body p')].map(p => p.textContent.trim()).find(x => x.length > 60); if (fp) desc = cut(desc + ' ' + fp, 158); }
  if (SEO[route]) { title = SEO[route][0]; if (SEO[route][1]) desc = SEO[route][1]; }
  const img = prod ? prod.img : (doc.querySelector('.lead-img') || {}).src || CDN + 'banner-red-desktop-1.jpg?width=1200';
  const esc = s => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
  const fixUrls = v => typeof v === 'string' ? (v.includes('/#/') ? (m => SITE + w.WU.toPath('#/' + m[1]) + (m[2] || ''))(/\/#\/([^#]*)(#.*)?$/.exec(v)) : v) : Array.isArray(v) ? v.map(fixUrls) : v && typeof v === 'object' ? Object.fromEntries(Object.entries(v).map(([k, x]) => [k, fixUrls(x)])) : v;
  const ld = fixUrls(JSON.parse(doc.getElementById('ld').textContent || '[]'));
  const TODAY = new Date().toISOString().slice(0, 10), ORG = { '@type': 'Organization', name: 'Wake Up Espressomaschinen', url: SITE + '/', logo: { '@type': 'ImageObject', url: CDN + 'WU_LOGO_transparent.png' } };
  (Array.isArray(ld) ? ld : [ld]).forEach(x => { if (x['@type'] === 'Article' || x['@type'] === 'BlogPosting') { const pr = doc.querySelector('.prose');
    x.author = ORG; x.publisher = ORG; x.dateModified = TODAY; x.wordCount = pr ? pr.textContent.split(/\s+/).length : undefined; x.timeRequired = 'PT' + Math.max(2, Math.round((x.wordCount || 400) / 200)) + 'M';
    x.image = [...new Set([].concat(x.image || [], [...doc.querySelectorAll('.prose img')].map(i => i.src)))].filter(Boolean).slice(0, 6); } });
  doc.getElementById('ld').textContent = JSON.stringify(ld);
  doc.title = title;
  doc.querySelector('meta[name="description"]').setAttribute('content', desc);
  const robots = doc.querySelector('meta[name="robots"]'); if (PREVIEW) robots.setAttribute('content', 'noindex, nofollow'); else robots.setAttribute('content', 'index, follow, max-image-preview:large');
  doc.head.insertAdjacentHTML('beforeend', '<link rel="canonical" href="' + SITE + route + '">' +
    '<meta property="og:site_name" content="Wake Up Espressomaschinen"><meta property="og:locale" content="de_AT"><meta property="og:type" content="' + (prod ? 'product' : isArt ? 'article' : 'website') + '">' +
    '<meta property="og:title" content="' + esc(title) + '"><meta property="og:description" content="' + esc(desc) + '"><meta property="og:url" content="' + SITE + route + '"><meta property="og:image" content="' + esc(img) + '">' +
    (prod ? '<meta property="product:price:amount" content="' + prod.price.toFixed(2) + '"><meta property="product:price:currency" content="EUR">' : '') +
    '<meta name="twitter:card" content="summary_large_image">');
  write(path.join(OUT, route, 'index.html'), '<!doctype html>\n' + doc.documentElement.outerHTML);
  sitemap.push(route); w.close();
});
// 404, Sitemap, robots
const nf = new JSDOM(template).window.document; nf.title = 'Seite nicht gefunden | Wake Up Espressomaschinen';
nf.getElementById('app').innerHTML = '<div class="wrap page-head"><h1>Diese Seite gibt es nicht</h1><p>Vielleicht hilft dir einer dieser Wege weiter.</p></div><div class="wrap" style="padding-bottom:80px;display:flex;flex-wrap:wrap;gap:12px"><a class="btn" href="/collections/kaffee/">Kaffee entdecken</a><a class="btn ghost" href="/collections/maschinen/">Maschinen ansehen</a><a class="btn ghost" href="/">Zur Startseite</a></div>';
{ const tw = new JSDOM(template, { url: SITE + '/', runScripts: 'outside-only' }).window; tw.scrollTo = () => {}; tw.eval(dataJs); tw.WU.SC = SC; tw.WU.BODY = BODY; tw.eval(contentJs); tw.eval(appJs);
  nf.querySelectorAll('a[href^="#/"]').forEach(a => a.setAttribute('href', tw.WU.toPath(a.getAttribute('href')))); tw.close(); }
write(path.join(OUT, '404.html'), '<!doctype html>\n' + nf.documentElement.outerHTML);
write(path.join(OUT, 'sitemap.xml'), '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' + sitemap.map(r => '  <url><loc>' + SITE + r + '</loc></url>').join('\n') + '\n</urlset>\n');
write(path.join(OUT, 'robots.txt'), PREVIEW ? 'User-agent: *\nDisallow: /\n' : 'User-agent: *\nAllow: /\n\nUser-agent: GPTBot\nAllow: /\nUser-agent: OAI-SearchBot\nAllow: /\nUser-agent: ClaudeBot\nAllow: /\nUser-agent: PerplexityBot\nAllow: /\n\nSitemap: ' + SITE + '/sitemap.xml\n');
console.log('Seiten:', sitemap.length, '| Produkte:', coffees.length + others.length, '| Beschreibungen:', Object.keys(BODY).length, '| Shop-Seiten:', Object.keys(SC.pages).filter(k => SC.pages[k].html).length, '| Shop-Beiträge:', Object.keys(SC.guides).filter(k => SC.guides[k]).length, '| FAQ:', FAQ_SHOP.reduce((n, g) => n + g[1].length, 0));
