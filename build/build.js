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
let KNOWN_COLS = new Set();
const PAGES_ALL = JSON.parse(read(path.join(SHOPDATA, 'pages-all.json')));
const SMALL_MAP = { 'herkunft_gug': '/blogs/ratgeber/roesterei-guglielmo/', 'herkunft_kre': '/blogs/ratgeber/roesterei-kremoso/', 'herkunft_lamess': '/blogs/ratgeber/roesterei-la-messicana/', 'herkunft_ionia': '/blogs/ratgeber/roesterei-ionia/', 'herkunft_trombetta': '/blogs/ratgeber/roesterei-trombetta/', 'herkunft-esc': '/blogs/ratgeber/roesterei-escaffe/', 'die-rosterei-escaffe': '/blogs/ratgeber/roesterei-escaffe/', 'info_qm': '/collections/maschinen/', 'maschinensets': '/collections/espressomaschinensets/', 'info-lamarzocco': '/collections/lamarzocco/' };
const textLen = h => String(h || '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim().length;
// Seiten aus dem Shop, die es hier noch nicht gibt, werden unter derselben Adresse übernommen
const XPAGES = {};
Object.keys(PAGES_ALL).forEach(u => { let m;
  if ((m = /^\/pages\/([^\/]+)$/.exec(u)) && m[1] !== 'faq' && !PAGE_MAP[m[1]] && !ROASTER_MAP[m[1]] && !SMALL_MAP[m[1]] && textLen(PAGES_ALL[u].html) > 150) XPAGES[m[1]] = PAGES_ALL[u];
  if ((m = /^\/policies\/([^\/]+)$/.exec(u))) XPAGES['policy-' + m[1]] = PAGES_ALL[u]; });
BLOG_MAP['wakeupespresso-com-in-neuem-gewand'] = 'wakeupespresso-com-in-neuem-gewand';
function target(u) {
  let m;
  if ((m = /^\/products\/([^\/?#]+)/.exec(u))) return HANDLES.has(m[1]) ? '/products/' + m[1] + '/' : null;
  if ((m = /^\/collections\/([^\/?#]+)/.exec(u))) return m[1] === 'italienischer-kaffee' ? '/collections/kaffee/' : m[1] === 'alle-espressomaschinen' ? '/collections/maschinen/' : m[1] === 'all' ? '/collections/alle/' : KNOWN_COLS.has(m[1]) ? '/collections/' + m[1] + '/' : MACHINE_COLS.test(m[1]) ? '/collections/maschinen/' : COFFEE_COLS.test(m[1]) ? '/collections/kaffee/' : '/collections/alle/';
  if ((m = /^\/pages\/([^\/?#]+)/.exec(u))) return m[1] === 'faq' ? '/pages/faq/' : PAGE_MAP[m[1]] ? '/pages/' + PAGE_MAP[m[1]] + '/' : ROASTER_MAP[m[1]] ? '/blogs/ratgeber/' + ROASTER_MAP[m[1]] + '/' : SMALL_MAP[m[1]] ? SMALL_MAP[m[1]] : XPAGES[m[1]] ? '/pages/' + m[1] + '/' : null;
  if ((m = /^\/blogs\/news\/([^\/?#]+)/.exec(u))) return BLOG_MAP[m[1]] ? '/blogs/ratgeber/' + BLOG_MAP[m[1]] + '/' : '/blogs/ratgeber/';
  if (/^\/blogs\/news\/?$/.test(u)) return '/blogs/ratgeber/';
  if ((m = /^\/policies\/([^\/?#]+)/.exec(u))) return XPAGES['policy-' + m[1]] ? '/policies/' + m[1] + '/' : null;
  if (/^\/(search|cart|account)/.test(u)) return null;
  return null;
}
function mapUrl(href) {
  if (!href) return href;
  let u = href.replace(/^https?:\/\/(www\.)?wakeup-espresso\.com/, '').replace(/^file:\/\/\/C:/, '');
  if (/^(https?:|mailto:|tel:|#)/.test(u)) return u;
  if (u === '/' || u === '') return '/';
  const tg = target(u); if (tg) return tg;
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
{ const cs = JSON.parse(read(path.join(SHOPDATA, 'collections-seo.json'))); Object.keys(cs).forEach(h => { if (h !== 'frontpage' && cs[h].handles.some(x => HANDLES.has(x))) KNOWN_COLS.add(h); }); }
const sb = {}; sb.window = sb; vm.runInNewContext(read(path.join(__dirname, 'profiles.js')), sb);
const PROFILE = {}; sb.WU.COFFEE_ROWS.forEach(r => { PROFILE[r[0]] = r; });
const PAKETE = ['probierpaket-6x1kg-bohnen', 'wake-up-bestseller-4x1kg-bohnen', 'wake-up-finest-selection-4x1kg-bohnen', 'wake-up-coffein-bombs-6x1kg-bohnen'];
const PREORDER = ['lamarzocco-linea-mini-r', '969-coffee-elba-gentile-kipphebel', '969-coffee-elba-gentile', 'quickmill-carola-evo', 'mazzer-mini-g'];
const TYPE_FIX = { 'Reinigungsmittel': 'Reinigung', 'Ersatzteil': 'Ersatzteile', 'Vakkumbehälter': 'Vakuumbehälter', 'Espressomaschine': 'Espressomaschinen', 'Kaffeemühle': 'Mühlen' };
const vendor = v => /wake up/i.test(v) ? 'Wake Up' : v === '969 coffee' ? '969.coffee' : /^joe ?frex$/i.test(v) ? 'Joe Frex' : v;
const PDP = JSON.parse(read(path.join(SHOPDATA, 'pdp.json'))), COLSEO = JSON.parse(read(path.join(SHOPDATA, 'collections-seo.json'))), HOMESEO = JSON.parse(read(path.join(SHOPDATA, 'home.json')));
const USP = (Object.values(PDP).find(x => x.usp && x.usp.length) || { usp: [] }).usp;
function extras(p, base, body) {
  const x = PDP[p.handle] || {};
  if (x.rating && x.rating.count) base.rating = [x.rating.value, x.rating.count];
  { const ls = (x.labels || []).filter(l => !/^\d+\s*(g|kg|ml|l|stk\.?|x)\b/i.test(l) && !/^(Standard|Default|Vorbestell|Ausverkauft)/i.test(l)); if (ls.length) base.labels = ls; }
  { const RG = { Hell: 2, Mittel: 3, Mitteldunkel: 4, Dunkel: 5 }, BI = { Mild: 2, Mittel: 3, 'Kräftig': 4, Hoch: 5 };
    if (x.roestgrad) base.rg = [RG[x.roestgrad] || 3, x.roestgrad]; if (x.bitter) base.bi = [BI[x.bitter] || 3, x.bitter]; if (x.intensitaet) base.it = x.intensitaet; if (x.arabica != null) base.ar = x.arabica; }
  { const mood = p.images.find(i => /mood/i.test(i.src)) || p.images[1]; if (mood) base.hov = mood.src.replace(/\?.*$/, '') + '?width=600'; }
  if (x.details && x.details.img) base.kdimg = x.details.img;
  if (x.aromen && x.aromen.length) base.aromen = x.aromen;
  const bul = [], rows = (x.details && x.details.rows) || [], row = n => rows.find(r => r.name === n);
  if (x.arabica != null) bul.push(['Mischung', x.arabica + ' % Arabica' + (x.robusta ? ', ' + x.robusta + ' % Robusta' : '')]);
  if (x.roestgrad) bul.push(['Röstgrad', x.roestgrad]);
  [['Säure', 'Säure'], ['Körper', 'Körper'], ['Zubereitung', 'Zubereitung'], ['Serviervorschlag', 'Ideal für'], ['Koffein', 'Koffein'], ['Form', 'Form']].forEach(([n, l]) => { const r = row(n); if (r) { const v = r.cap || r.val || r.items.join(', '); if (v) bul.push([l, v]); } });
  if (!bul.length) { const d = new JSDOM('<body>' + body + '</body>').window.document; [...d.querySelectorAll('li')].map(li => li.textContent.replace(/\s+/g, ' ').trim()).filter(s => s.length > 8 && s.length < 140).slice(0, 5).forEach(s => bul.push(['', s])); }
  if (bul.length) base.bul = bul;
  if (x.details && x.details.desc && x.details.desc.replace(/<[^>]+>/g, '').trim().length > 40) base.kd = 1;
  return base;
}
const BODY = {}, coffees = [], others = [];
shopProducts.forEach(p => {
  const vs = p.variants.map(v => ({ id: String(v.id), title: v.title === 'Default Title' ? 'Standard' : v.title, price: Number(v.price), compare: Number(v.compare_at_price) || 0, available: !!v.available, sku: v.sku || '' }));
  const imgs = p.images.slice(0, 6).map(i => i.src.replace(/\?.*$/, '') + '?width=900');
  const body = sanitize(p.body_html); if (text(body)) BODY[p.handle] = '<h2>Beschreibung</h2>' + body;
  const base = { handle: p.handle, vendor: vendor(p.vendor), img: imgs[0] || CDN + 'WU_LOGO_transparent.png', imgs, text: cut(body, 230), offers: vs.map(v => [v.id, v.title, v.price, v.sku, v.available ? 1 : 0]), preorder: PREORDER.includes(p.handle) };
  extras(p, base, body);
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
// Produktseiten: Details, Rösterei und Rezensionen 1:1 aus dem Shop
SC.pdp = {};
Object.keys(PDP).forEach(h => { const x = PDP[h]; SC.pdp[h] = { seoTitle: x.seoTitle, seoDesc: x.seoDesc, reviews: x.reviews || [], rating: x.rating || null,
  details: x.details ? { title: x.details.title, rows: x.details.rows, desc: sanitize(x.details.desc) } : null,
  roaster: x.roaster && x.roaster.name ? { name: x.roaster.name, claim: x.roaster.claim, logo: x.roaster.logo, img: x.roaster.img, facts: x.roaster.facts, story: sanitize(x.roaster.story) } : null }; });
// Kollektionen: SEO-Text, Titel und Produkte
const COL_FIXED = { 'italienischer-kaffee': 'kaffee', 'alle-espressomaschinen': 'maschinen' };
const COLS = {}; SC.cols = {};
Object.keys(COLSEO).forEach(h => { const c = COLSEO[h], hs = c.handles.filter(x => HANDLES.has(x)); if (h === 'frontpage') return;
  const d = new JSDOM('<body>' + c.body + '</body>').window.document, h1 = d.querySelector('h1,h2'); let head = '';
  d.querySelectorAll('h1').forEach(e => { const s = e.textContent.replace(/\s+/g, ' ').trim(); if (s && !head) head = s; e.remove(); });
  const key = COL_FIXED[h] || h;
  SC.cols[key] = { html: sanitize(d.body.innerHTML), seoTitle: c.seoTitle, seoDesc: c.seoDesc };
  if (!COL_FIXED[h] && hs.length) COLS[h] = { t: c.title, h1: head || c.title, h: hs }; });
Object.keys(XPAGES).forEach(k => { const d = new JSDOM('<body>' + XPAGES[k].html + '</body>').window.document; d.querySelectorAll('h1').forEach(e => e.remove()); SC.pages[k] = { html: sanitize(d.body.innerHTML), imgs: [] }; });
const XP = {}; Object.keys(XPAGES).forEach(k => { XP[k] = { title: XPAGES[k].h1 || XPAGES[k].seoTitle, shop: k.startsWith('policy-') ? '' : k, policy: k.startsWith('policy-') }; });
{ const e = PAGES_ALL['/pages/die-rosterei-escaffe']; if (e) { const d = dom2(e.html); SC.guides['roesterei-escaffe'] = sanitize(d); }
  const a = PAGES_ALL['/blogs/news/wakeupespresso-com-in-neuem-gewand']; if (a) SC.guides['wakeupespresso-com-in-neuem-gewand'] = sanitize(dom2(a.html)); }
function dom2(html) { const d = new JSDOM('<body>' + html + '</body>').window.document; d.querySelectorAll('h1,time,[class*="meta"],[class*="share"],[class*="article-nav"],[class*="tags"]').forEach(e => e.remove()); const r = [...d.querySelectorAll('.rte')].sort((a, b) => b.textContent.length - a.textContent.length)[0]; return r ? r.innerHTML : d.body.innerHTML; }
const XG = PAGES_ALL['/blogs/news/wakeupespresso-com-in-neuem-gewand'] ? [{ slug: 'wakeupespresso-com-in-neuem-gewand', title: PAGES_ALL['/blogs/news/wakeupespresso-com-in-neuem-gewand'].h1, teaser: PAGES_ALL['/blogs/news/wakeupespresso-com-in-neuem-gewand'].seoDesc || 'Neuigkeiten aus dem Geschäft.' }] : [];
SC.home = { html: sanitize((HOMESEO.sections.filter(s => s.html).sort((a, b) => b.html.length - a.html.length)[0] || { html: '' }).html) };
// ---------- Zusätzliche SEO-Texte: aus den Shop-Daten erzeugt, mit internen Links ----------
const ALLP = coffees.concat(others), byH = {}; ALLP.forEach(p => { byH[p.handle] = p; });
const eur = n => '€ ' + n.toFixed(2).replace('.', ',').replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
const E = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;');
const colUrl = h => h === 'italienischer-kaffee' ? '/collections/kaffee/' : h === 'alle-espressomaschinen' ? '/collections/maschinen/' : '/collections/' + h + '/';
const G = (slug, label) => '<a href="/blogs/ratgeber/' + slug + '/">' + label + '</a>';
const TYPE_TEXT = {
  'einkreiser-espressomaschinen': ['Einkreiser: ein Kessel für Espresso und Dampf', 'Ein Einkreiser hat einen einzigen Kessel, der sowohl das Brühwasser als auch den Dampf liefert. Für Espresso arbeitet er bei rund 93 °C, für Milchschaum heizt er auf Dampftemperatur hoch. Zwischen Bezug und Schäumen wartest du deshalb kurz. Dafür sind Einkreiser kompakt, schnell aufgeheizt und günstiger als Maschinen mit zwei Kreisläufen. Sie passen, wenn du vor allem Espresso trinkst und nur gelegentlich Milch schäumst.'],
  'zweikreiser-espressomaschinen': ['Zweikreiser: Espresso und Milchschaum gleichzeitig', 'Ein Zweikreiser hat einen Dampfkessel, durch den ein Wärmetauscher führt. Das Brühwasser fließt frisch durch diesen Wärmetauscher und wird auf dem Weg zur Brühgruppe erhitzt. So kannst du Espresso beziehen und gleichzeitig Milch schäumen. Vor dem ersten Bezug lässt man kurz Wasser durch die Brühgruppe laufen, damit die Temperatur passt. Zweikreiser sind die klassische Wahl für alle, die täglich Cappuccino trinken.'],
  'dual-boiler': ['Dualboiler: zwei Kessel, genaue Temperatur', 'Ein Dualboiler hat einen eigenen Kessel für das Brühwasser und einen zweiten für den Dampf. Beide werden getrennt geregelt. Die Brühtemperatur bleibt dadurch auch bei vielen Bezügen hintereinander stabil, und der Dampf ist jederzeit bereit. Dualboiler sind größer und teurer, lohnen sich aber, wenn du viel und genau arbeiten willst.'],
  'hebelmaschinen': ['Hebelmaschinen: Espresso von Hand', 'Bei einer Hebelmaschine erzeugt keine Pumpe den Druck, sondern eine Feder oder deine Hand. Du ziehst den Hebel, das Wasser benetzt den Kaffee, und beim Loslassen drückt die Feder das Wasser durch den Puck. Der Druck fällt dabei sanft ab, was dem Espresso einen runden, weichen Charakter gibt. Hebelmaschinen arbeiten fast lautlos und haben wenige Verschleißteile. Sie brauchen etwas Übung und werden nicht rückgespült.'],
  'mahlwerke': ['Kaffeemühlen: wichtiger als die Maschine', 'Für Espresso muss der Kaffee sehr fein und gleichmäßig gemahlen sein. Schon kleine Schritte am Mahlgrad verändern die Bezugszeit deutlich. Eine Espressomühle lässt sich deshalb stufenlos oder in sehr feinen Schritten verstellen und mahlt direkt in den Siebträger. Größere Mahlscheiben arbeiten schneller und erwärmen den Kaffee weniger.'],
  'espressomaschinensets': ['Maschine und Mühle im Set', 'Ein Siebträger ist nur so gut wie die Mühle daneben. In den Sets haben wir Maschinen und Mühlen kombiniert, die zusammenpassen. Du bekommst beide Geräte aufeinander abgestimmt und sparst gegenüber dem Einzelkauf.'],
  'probiersets': ['Probiersets: mehrere Röstungen vergleichen', 'Welcher Espresso dir schmeckt, findest du am schnellsten im direkten Vergleich heraus. In einem Probierset bekommst du mehrere Röstungen auf einmal und kannst mild, ausgewogen und kräftig nebeneinander probieren. Beim Wechsel der Sorte stellst du den Mahlgrad neu ein.'],
  'wake-up-probierpakete': ['Wake Up Probierpakete', 'Die Probierpakete haben wir selbst zusammengestellt: Bestseller, feine Mischungen und besonders kräftige Röstungen, jeweils in der 1-kg-Packung. So lernst du mehrere Röstereien kennen, bevor du dich festlegst.']
};
function guidesFor(list) { const k = new Set(list.map(p => p.kind)), ty = new Set(list.map(p => p.type || '')), out = [];
  if (k.has('maschine') || k.has('set')) out.push(G('einkreiser-zweikreiser-dualboiler-hebelmaschinen', 'Einkreiser, Zweikreiser, Dualboiler und Hebelmaschinen im Vergleich'), G('erste-siebtraegermaschine', 'Die erste Siebträgermaschine: Kaufberatung'), G('wasser', 'Das richtige Wasser für deine Espressomaschine'));
  if (k.has('muehle') || k.has('set')) out.push(G('kaffeemuehlen-im-vergleich', 'Kaffeemühlen im Vergleich'), G('mahlgrad-einstellen', 'Mahlgrad einstellen'));
  if (k.has('kaffee') || [...ty].some(x => /Kaffee|Moka|Espresso|Pads|Probier/.test(x))) out.push(G('arabica-robusta', 'Arabica und Robusta: der Unterschied'), G('bohnen-lagern', 'Kaffeebohnen richtig lagern'), G('espresso-fehler', 'Espresso zu sauer oder zu bitter?'));
  if ([...ty].some(x => /Moka/.test(x))) out.push(G('moka-kanne', 'Die Moka-Kanne richtig verwenden'));
  if ([...ty].some(x => /Reinig|Ersatz|Wasserfilter/.test(x))) out.push(G('reinigung-wartung', 'Reinigung und Wartung'), G('wasser', 'Das richtige Wasser für deine Espressomaschine'));
  if ([...ty].some(x => /Milch|Tamper|Knock|Sieb/.test(x))) out.push(G('milchschaum', 'Der perfekte Milchschaum'), G('mahlgrad-einstellen', 'Mahlgrad einstellen'));
  return [...new Set(out)].slice(0, 5); }
function colExtra(key, title, handles) { const list = handles.map(h => byH[h]).filter(Boolean); if (!list.length) return '';
  const prices = list.map(p => p.price).sort((a, b) => a - b), vend = [...new Set(list.map(p => p.vendor))], machines = list.some(p => p.kind === 'maschine' || p.kind === 'set');
  let h = ''; const tt = TYPE_TEXT[key]; if (tt) h += '<h2>' + tt[0] + '</h2><p>' + tt[1] + '</p>';
  h += '<h3>' + E(title) + ' im Überblick</h3><p>In dieser Kategorie findest du ' + (list.length === 1 ? 'ein Produkt' : list.length + ' Produkte') + (vend.length > 1 ? ' von ' + vend.slice(0, 6).map(E).join(', ') : ' von ' + E(vend[0])) + (prices.length > 1 && prices[0] !== prices[prices.length - 1] ? ', von ' + eur(prices[0]) + ' bis ' + eur(prices[prices.length - 1]) : ' um ' + eur(prices[0])) + '.</p><ul>' +
    list.slice(0, 14).map(p => '<li><a href="/products/' + p.handle + '/">' + E(p.title) + '</a>, ' + (p.offers && p.offers.length > 1 ? 'ab ' : '') + eur(Math.min.apply(null, (p.offers || [[0, 0, p.price]]).map(o => o[2]))) + (p.rating ? ', ' + String(p.rating[0].toFixed(1)).replace('.', ',') + ' von 5 Sternen bei ' + p.rating[1] + ' Bewertungen' : '') + '</li>').join('') + '</ul>';
  const gs = guidesFor(list); if (gs.length) h += '<h3>Passende Ratgeber</h3><ul>' + gs.map(g => '<li>' + g + '</li>').join('') + '</ul>';
  h += '<h3>Versand und Service</h3><p>' + (machines ? 'Espressomaschinen verschicken wir sicher auf Palette per Spedition. Jede Maschine prüfen wir vorher in unserer Werkstatt in Wien, und du bekommst eine persönliche <a href="/pages/einschulungen/">Einschulung</a>. Für Wartung und Reparatur gibt es unseren <a href="/pages/maschinenservice/">Maschinenservice</a>. ' : 'Wir verschicken in der Regel am gleichen Tag, von Montag bis Samstag. Je nach Adresse ist dein Paket in 1 bis 3 Werktagen bei dir. In Österreich ist der Versand ab € 89 Warenwert kostenlos, nach Deutschland ab € 150. ') + 'Alle Details stehen unter <a href="/pages/versand-rabatte/">Versand und Rabatte</a>. Fragen beantworten wir im Geschäft in Wien, am Telefon oder in den <a href="/pages/faq/">FAQ</a>.</p>';
  const sib = Object.keys(COLSEO).filter(o => o !== key && o !== 'frontpage' && COLSEO[o].handles.some(x => HANDLES.has(x)) && COLSEO[o].handles.filter(x => handles.includes(x)).length >= Math.min(2, handles.length)).slice(0, 6);
  if (sib.length) h += '<h3>Verwandte Kategorien</h3><ul>' + sib.map(o => '<li><a href="' + colUrl(o) + '">' + E(COLSEO[o].title) + '</a></li>').join('') + '</ul>';
  return h; }
Object.keys(COLSEO).forEach(h => { if (h === 'frontpage') return; const key = COL_FIXED[h] || h, hs = COLSEO[h].handles.filter(x => HANDLES.has(x)); if (!SC.cols[key] || !hs.length) return; SC.cols[key].html += colExtra(h, COLSEO[h].title, hs); });
// Markenseiten aus dem Shop: Produkte der Marke verlinken
Object.keys(XPAGES).forEach(k => { if (k.startsWith('policy-')) return; const norm = s => s.toLowerCase().replace(/[^a-z0-9]/g, ''), vend = [...new Set(ALLP.map(p => p.vendor))].find(v => norm(v).length > 3 && norm(k).includes(norm(v))); if (!vend) return;
  const list = ALLP.filter(p => p.vendor === vend); if (!list.length) return;
  SC.pages[k].html += '<h2>' + E(vend) + ' bei Wake Up</h2><ul>' + list.map(p => '<li><a href="/products/' + p.handle + '/">' + E(p.title) + '</a>, ' + eur(p.price) + '</li>').join('') + '</ul>' + (guidesFor(list).length ? '<h2>Passende Ratgeber</h2><ul>' + guidesFor(list).map(g => '<li>' + g + '</li>').join('') + '</ul>' : ''); });
SC.cols.sortiment = { html: colExtra('alle', 'Das ganze Sortiment', ALLP.filter(p => p.rating).sort((a, b) => b.rating[1] - a.rating[1]).slice(0, 12).map(p => p.handle)).replace('In dieser Kategorie findest du', 'Die am häufigsten bewerteten Produkte:') };
// Röstereien-Beiträge: Geschichte aus dem Shop, alle Produkte, Links
Object.keys(probeRegions()).forEach(v => { const slug = 'roesterei-' + v.toLowerCase().replace(/\s+/g, '-'), list = ALLP.filter(p => p.vendor === v); if (!list.length) return;
  const x = Object.keys(PDP).map(k => PDP[k]).find(q => q.roaster && q.roaster.name === v && textLen(q.roaster.story) > 200), ch = v.toLowerCase().replace(/\s+/g, '-');
  let h = SC.guides[slug] || '';
  if (x && textLen(h) < 200 + textLen(x.roaster.story)) h += '<h2>Die Geschichte von ' + E(v) + '</h2>' + sanitize(x.roaster.story);
  const groups = {}; list.forEach(p => { const g = p.kind === 'kaffee' ? 'Ganze Bohne 1 kg' : (p.type || 'Weitere'); (groups[g] = groups[g] || []).push(p); });
  h += '<h2>Alle Produkte von ' + E(v) + ' bei Wake Up</h2>' + Object.keys(groups).map(g => '<h3>' + E(g) + '</h3><ul>' + groups[g].map(p => '<li><a href="/products/' + p.handle + '/">' + E(p.title) + '</a>, ' + eur(p.price) + '</li>').join('') + '</ul>').join('') +
    '<p>' + (KNOWN_COLS.has(ch) ? 'Alle Sorten mit Filter findest du in der Kategorie <a href="/collections/' + ch + '/">' + E(v) + '</a>. ' : '') + 'Im <a href="/pages/5plus1/">5+1 Karton</a> kannst du ' + E(v) + ' mit anderen Röstereien mischen. Wenn du unsicher bist, hilft der <a href="/pages/kaffee-finder/">Kaffee-Finder</a>.</p>';
  SC.guides[slug] = h; });
function probeRegions() { const w = new JSDOM('', { runScripts: 'outside-only' }).window; w.eval('window.WU={coffees:[],others:[],all:[],FAQ_SHOP:[]};'); try { w.eval(read(path.join(SRC, 'assets/js/content.js'))); } catch (e) {} return w.WU.REGIONS || {}; }
const FAQ_SHOP = []; { let cur = null; const groups = ['Kaffee', 'Espresso Maschinen & Mahlwerke', 'Bestellungen', 'Sonstiges'];
  dom('page-faq').querySelectorAll('h2,h3,details').forEach(el => {
    if (el.tagName !== 'DETAILS') { const t = el.textContent.trim(); if (groups.includes(t)) { cur = [t.replace('Espresso Maschinen & Mahlwerke', 'Maschinen und Mühlen'), []]; FAQ_SHOP.push(cur); } return; }
    const q = el.querySelector('summary'); if (!q || !cur) return; const qt = q.textContent.replace(/\s+/g, ' ').trim(); const c = el.cloneNode(true); c.querySelector('summary').remove();
    const a = c.innerHTML.replace(/<\/(p|li|div|h\d)>|<br\s*\/?>/gi, ' ').replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/\s+/g, ' ').trim(); if (qt && a) cur[1].push([qt, a]);
  }); }

// ---------- Client-Daten ----------
const dataJs = '/* Automatisch erzeugt aus data/shop/products.json (node build/build.js). Nicht von Hand bearbeiten. */\n' +
  'window.WU=' + JSON.stringify({ CDN, SHOP, SITE, FREE_SHIPPING: 89, LOGO: CDN + 'WU_LOGO_transparent.png?v=1709016505', staticCatalog: true, coffees, others, FAQ_SHOP, USP, COLS, XP, XG }) + ';\n' +
  'WU.all=WU.coffees.concat(WU.others);WU.byHandle=function(h){for(var i=0;i<WU.all.length;i++)if(WU.all[i].handle===h)return WU.all[i];};\n';

// ---------- Vorrendern ----------
fs.rmSync(OUT, { recursive: true, force: true });
fs.cpSync(path.join(SRC, 'assets'), path.join(OUT, 'assets'), { recursive: true });
write(path.join(OUT, 'assets/js/data.js'), dataJs);
const template = read(path.join(SRC, 'template.html')), contentJs = read(path.join(SRC, 'assets/js/content.js')), appJs = read(path.join(SRC, 'assets/js/app.js'));
const probe = new JSDOM('', { runScripts: 'outside-only' }).window; probe.eval(dataJs); probe.eval(contentJs);
const routes = ['/', '/collections/kaffee/', '/collections/maschinen/', '/collections/alle/', '/pages/5plus1/', '/pages/kaffee-finder/', '/pages/maschinen-finder/', '/pages/faq/', '/pages/roestereien/', '/blogs/ratgeber/']
  .concat(Object.keys(COLS).map(h => '/collections/' + h + '/'), Object.keys(probe.WU.PAGES).map(s => s.startsWith('policy-') ? '/policies/' + s.slice(7) + '/' : '/pages/' + s + '/'), probe.WU.GUIDES.map(g => '/blogs/ratgeber/' + g.slug + '/'), probe.WU.all.map(p => '/products/' + p.handle + '/'));
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
  if (prod && SC.pdp[prod.handle]) { const s = SC.pdp[prod.handle]; if (s.seoTitle) title = s.seoTitle; if (s.seoDesc) desc = s.seoDesc; }
  { const cm = /^\/collections\/([^\/]+)\/$/.exec(route), ck = cm && SC.cols[cm[1]]; if (ck && COLS[cm[1]]) { if (ck.seoTitle) title = ck.seoTitle; if (ck.seoDesc) desc = ck.seoDesc; } }
  { const xm = /^\/(pages|policies)\/([^\/]+)\/$/.exec(route), xk = xm && XPAGES[(xm[1] === 'policies' ? 'policy-' : '') + xm[2]]; if (xk) { if (xk.seoTitle) title = xk.seoTitle + (/^info/.test(xm[2]) ? ': Infos zur Marke' : '') + ' | Wake Up'; if (xk.seoDesc) desc = xk.seoDesc; } }
  if (SEO[route]) { title = SEO[route][0]; if (SEO[route][1]) desc = SEO[route][1]; }
  const img = prod ? prod.img : (doc.querySelector('.lead-img') || {}).src || CDN + 'banner-red-desktop-1.jpg?width=1200';
  const esc = s => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
  const fixUrls = v => typeof v === 'string' ? (v.includes('/#/') ? (m => SITE + w.WU.toPath('#/' + m[1]) + (m[2] || ''))(/\/#\/([^#]*)(#.*)?$/.exec(v)) : v) : Array.isArray(v) ? v.map(fixUrls) : v && typeof v === 'object' ? Object.fromEntries(Object.entries(v).map(([k, x]) => [k, fixUrls(x)])) : v;
  let ld = fixUrls(JSON.parse(doc.getElementById('ld').textContent || '[]'));
  const TODAY = new Date().toISOString().slice(0, 10), ORG = { '@type': 'Organization', name: 'Wake Up Espressomaschinen', url: SITE + '/', logo: { '@type': 'ImageObject', url: CDN + 'WU_LOGO_transparent.png' } };
  (Array.isArray(ld) ? ld : [ld]).forEach(x => { if (x['@type'] === 'Article' || x['@type'] === 'BlogPosting') { const pr = doc.querySelector('.prose');
    x.author = ORG; x.publisher = ORG; x.dateModified = TODAY; x.wordCount = pr ? pr.textContent.split(/\s+/).length : undefined; x.timeRequired = 'PT' + Math.max(2, Math.round((x.wordCount || 400) / 200)) + 'M';
    x.image = [...new Set([].concat(x.image || [], [...doc.querySelectorAll('.prose img')].map(i => i.src)))].filter(Boolean).slice(0, 6); } });
  // ---------- Schema anreichern ----------
  { const arr = Array.isArray(ld) ? ld : [ld], url = SITE + route, YEAR_END = (new Date().getFullYear() + 1) + '-12-31';
    const RETURN = { '@type': 'MerchantReturnPolicy', applicableCountry: ['AT', 'DE'], returnPolicyCategory: 'https://schema.org/MerchantReturnFiniteReturnWindow', merchantReturnDays: 14, returnMethod: 'https://schema.org/ReturnByMail', merchantReturnLink: SITE + '/policies/refund-policy/' };
    const ship = (price, pallet) => [['AT', pallet ? 99 : price >= 89 ? 0 : 4.99], ['DE', pallet ? 159 : price >= 150 ? 0 : 9.99]].map(([c, v]) => ({ '@type': 'OfferShippingDetails', shippingRate: { '@type': 'MonetaryAmount', value: v.toFixed(2), currency: 'EUR' }, shippingDestination: { '@type': 'DefinedRegion', addressCountry: c }, deliveryTime: { '@type': 'ShippingDeliveryTime', handlingTime: { '@type': 'QuantitativeValue', minValue: 0, maxValue: 1, unitCode: 'DAY' }, transitTime: { '@type': 'QuantitativeValue', minValue: 1, maxValue: pallet ? 5 : 3, unitCode: 'DAY' } } }));
    arr.forEach(x => {
      if (x['@type'] === 'Store') { x.url = SITE + '/'; x.hasMerchantReturnPolicy = RETURN; x.contactPoint = { '@type': 'ContactPoint', telephone: x.telephone, email: x.email, contactType: 'customer service', areaServed: ['AT', 'DE'], availableLanguage: ['de', 'en'] }; x.knowsAbout = ['Espresso', 'Siebträgermaschinen', 'Kaffeemühlen', 'italienischer Kaffee']; }
      if (x['@type'] === 'Product' && prod) { const pallet = prod.kind === 'maschine' || prod.kind === 'set';
        (Array.isArray(x.offers) ? x.offers : [x.offers]).forEach(o => { if (!o) return; o.priceValidUntil = YEAR_END; o.shippingDetails = ship(Number(o.price), pallet); o.hasMerchantReturnPolicy = RETURN; o.url = url; });
        x.inLanguage = 'de-AT'; x.mainEntityOfPage = url;
        if (!x.additionalProperty && prod.bul) x.additionalProperty = prod.bul.filter(b => b[0]).map(b => ({ '@type': 'PropertyValue', name: b[0], value: b[1] }));
        if (!x.countryOfOrigin && /Kaffee|Moka|Espresso|Pads/.test(prod.type || '')) x.countryOfOrigin = { '@type': 'Country', name: 'Italien' };
        const s = SC.pdp[prod.handle]; if (s && s.seoDesc) x.description = s.seoDesc + (x.description ? ' ' + x.description : ''); }
      if (x['@type'] === 'Article' || x['@type'] === 'BlogPosting') { x.inLanguage = 'de-AT'; x.mainEntityOfPage = url; x.url = url; x.isPartOf = { '@type': 'Blog', name: 'Wake Up Ratgeber', url: SITE + '/blogs/ratgeber/' }; }
      if (x['@type'] === 'WebSite') { x.url = SITE + '/'; x.inLanguage = 'de-AT'; x.publisher = { '@id': SHOP + '/#store' }; } });
    // Kollektionen: CollectionPage, ItemList und FAQ aus dem SEO-Text
    if (/^\/collections\//.test(route)) { const cards = [...doc.querySelectorAll('#app .card')].slice(0, 60), h1t = (doc.querySelector('#app h1') || {}).textContent || '';
      for (let k = arr.length - 1; k >= 0; k--) if (arr[k]['@type'] === 'ItemList') arr.splice(k, 1);
      arr.push({ '@context': 'https://schema.org', '@type': 'CollectionPage', name: h1t, url, inLanguage: 'de-AT', description: desc, isPartOf: { '@type': 'WebSite', url: SITE + '/' },
        mainEntity: { '@type': 'ItemList', numberOfItems: cards.length, itemListElement: cards.map((c, i) => { const a = c.querySelector('a.card-title'); return { '@type': 'ListItem', position: i + 1, name: a.textContent.trim(), url: SITE + a.getAttribute('href') }; }) } });
      const qa = []; doc.querySelectorAll('.seo-text p').forEach(pp => { const st = pp.querySelector('strong,b'); if (!st || pp.firstElementChild !== st && pp.textContent.trim().indexOf(st.textContent.trim()) !== 0) return; const q = st.textContent.trim(); if (!/\?$/.test(q)) return; const ans = pp.textContent.replace(q, '').trim(); if (ans.length > 15) qa.push({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: ans } }); });
      if (qa.length >= 2) arr.push({ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: qa });
      if (!arr.some(x => x['@type'] === 'BreadcrumbList') || /^\/collections\/(?!kaffee|maschinen|alle)/.test(route)) { for (let k = arr.length - 1; k >= 0; k--) if (arr[k]['@type'] === 'BreadcrumbList') arr.splice(k, 1);
        arr.push({ '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [['Start', SITE + '/'], ['Sortiment', SITE + '/collections/alle/'], [h1t, url]].filter((c, i, a2) => !(i === 1 && url === c[1])).map((c, i) => ({ '@type': 'ListItem', position: i + 1, name: c[0], item: c[1] })) }); } }
    // Service-Seiten und Richtlinien
    if (/^\/(pages|policies)\//.test(route) && !arr.some(x => /FAQPage|WebPage|ContactPage|AboutPage/.test(x['@type']))) arr.push({ '@context': 'https://schema.org', '@type': /kontakt/.test(route) ? 'ContactPage' : /ueber-uns/.test(route) ? 'AboutPage' : 'WebPage', name: h1, url, inLanguage: 'de-AT', description: desc, isPartOf: { '@type': 'WebSite', url: SITE + '/' }, about: { '@id': SHOP + '/#store' } });
    ld = arr; }
  if (prod && SC.pdp[prod.handle] && SC.pdp[prod.handle].reviews.length) (Array.isArray(ld) ? ld : [ld]).forEach(x => { if (x['@type'] === 'Product') { const s = SC.pdp[prod.handle];
    x.aggregateRating = { '@type': 'AggregateRating', ratingValue: s.rating.value, reviewCount: s.rating.count, bestRating: 5, worstRating: 1 };
    x.review = s.reviews.map(r => ({ '@type': 'Review', author: { '@type': 'Person', name: r.name }, datePublished: r.date || undefined, reviewBody: r.text || undefined, reviewRating: { '@type': 'Rating', ratingValue: r.rating, bestRating: 5, worstRating: 1 } })); } });
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
{ const SM = JSON.parse(read(path.join(SHOPDATA, 'sitemap.json'))), have = new Set(sitemap), lines = [], csv = ['alte Adresse (Shopify);Adresse in der Vorschau;Art'], open = [];
  SM.forEach(u => { const clean = u.replace(/[?#].*$/, '').replace(/\/$/, ''), tg = target(clean);
    if (!tg || !have.has(tg)) { open.push(clean); return; }
    if (tg === clean + '/') { csv.push(clean + ';' + tg + ';gleich'); return; }
    lines.push(clean + '  ' + tg + '  301'); lines.push(clean + '/  ' + tg + '  301'); csv.push(clean + ';' + tg + ';Weiterleitung 301'); });
  lines.push('/collections/all  /collections/alle/  301', '/collections/all/  /collections/alle/  301', '/collections  /collections/alle/  301', '/collections/  /collections/alle/  301', '/blogs/news/*  /blogs/ratgeber/  301', '/pages/5-1  /pages/5plus1/  301');
  write(path.join(OUT, '_redirects'), '# Alle Adressen aus der Shopify-Sitemap, die hier anders heißen\n' + [...new Set(lines)].join('\n') + '\n');
  write(path.join(ROOT, 'docs', 'adressen-shopify-vorschau.csv'), csv.join('\n') + '\n');
  console.log('Shop-Sitemap:', SM.length, 'Adressen |', csv.filter(l => /;gleich$/.test(l)).length, 'gleich |', csv.filter(l => /301$/.test(l)).length, 'weitergeleitet | offen:', open.length, open.join(' ')); }
console.log('Seiten:', sitemap.length, '| Produkte:', coffees.length + others.length, '| Beschreibungen:', Object.keys(BODY).length, '| Shop-Seiten:', Object.keys(SC.pages).filter(k => SC.pages[k].html).length, '| Shop-Beiträge:', Object.keys(SC.guides).filter(k => SC.guides[k]).length, '| FAQ:', FAQ_SHOP.reduce((n, g) => n + g[1].length, 0));
