// Holt den aktuellen Stand aus dem öffentlichen Shop (nur lesen) und legt ihn unter data/shop/ ab:
// Produkte, je Produktseite SEO-Angaben, Bewertungen (Loox), USPs, Kaffee-Details, Rösterei; Kollektionen mit SEO-Texten; Startseite.
const fs = require('fs'), path = require('path');
const { JSDOM } = require('jsdom');
const SHOP = 'https://www.wakeup-espresso.com', OUT = path.join(__dirname, '..', 'data', 'shop'), RAW = process.env.RAW_DIR || '/tmp/wakeup-raw';
fs.mkdirSync(RAW, { recursive: true });
const sleep = ms => new Promise(r => setTimeout(r, ms));
async function get(url, file) {
  const f = path.join(RAW, file);
  if (fs.existsSync(f) && !process.env.REFRESH) return fs.readFileSync(f, 'utf8');
  for (let i = 0; i < 4; i++) { try { const r = await fetch(url, { headers: { 'user-agent': 'Mozilla/5.0 (wakeup relaunch preview build)' } }); if (r.ok) { const t = await r.text(); fs.writeFileSync(f, t); await sleep(250); return t; } if (r.status === 404) return ''; } catch (e) {} await sleep(1500 * (i + 1)); }
  console.log('FEHLER', url); return '';
}
const tx = e => e ? e.textContent.replace(/\s+/g, ' ').trim() : '';
const abs = s => !s ? '' : s.startsWith('//') ? 'https:' + s : s.startsWith('/') ? SHOP + s : s;
const cdn = s => abs(s).replace('https://www.wakeup-espresso.com/cdn/shop/files/', 'https://cdn.shopify.com/s/files/1/0810/6799/9560/files/').replace(/[?&]width=\d+/, '').replace(/\?&/, '?');
const inner = e => e ? e.innerHTML.replace(/<!--[\s\S]*?-->/g, '').trim() : '';
function leaves(el) { const o = []; el.querySelectorAll('*').forEach(x => { if (!x.children.length && tx(x)) o.push(tx(x)); }); return o; }

function parseProduct(html) {
  const d = new JSDOM(html).window.document, q = s => d.querySelector(s), sec = k => d.querySelector('[id*="__' + k + '"]');
  const out = { seoTitle: d.title.replace(/\s+[–-]\s+WAKE UP ESPRESSOMASCHINEN$/i, '').trim(), seoDesc: (q('meta[name="description"]') || {}).content || '' };
  // Bewertungen (von Loox serverseitig ausgegeben)
  const sum = tx(q('.loox-ssr-review-summary')), m = /([\d.]+)\s*\/\s*5 from (\d+)/.exec(sum);
  if (m) out.rating = { value: Number(m[1]), count: Number(m[2]) };
  out.reviews = [...d.querySelectorAll('article.loox-review')].map(a => ({ name: tx(a.querySelector('.loox-reviewer-name')), rating: Number((tx(a.querySelector('.loox-review-rating')).split('/')[0]) || 5), date: (a.querySelector('time') || { getAttribute() { return ''; } }).getAttribute('datetime').slice(0, 10), verified: !!a.querySelector('.loox-review-verified'), text: tx(a.querySelector('.loox-review-body')), img: abs((a.querySelector('.loox-review-image') || { getAttribute() { return ''; } }).getAttribute('src')) })).filter(r => r.name);
  // USP-Leiste
  out.usp = [...d.querySelectorAll('[class*="ai-usp-bar__item"]')].map(i => [tx(i.querySelector('strong')), tx(i.querySelector('[class*="ai-usp-bar__text"]'))]).filter(u => u[0]);
  // Kaffee-Details
  const kd = d.querySelector('section.kd');
  if (kd) out.details = { title: tx(kd.querySelector('.kd__title')), img: cdn((kd.querySelector('.kd__media img') || { getAttribute() { return ''; } }).getAttribute('src')),
    rows: [...kd.querySelectorAll('.kd__row')].map(r => { const bar = r.querySelector('.kd__bar'); return { name: tx(r.querySelector('.kd__name')), on: bar ? bar.querySelectorAll('i.is-on').length : null, of: bar ? bar.querySelectorAll('i').length : null, cap: tx(r.querySelector('.kd__cap')), items: [...r.querySelectorAll('.kd__item')].map(tx), val: tx(r.querySelector('.kd__val')) }; }),
    desc: inner(kd.querySelector('.kd__desc')) };
  // Rösterei
  const rs = d.querySelector('section.rs');
  if (rs) out.roaster = { name: tx(rs.querySelector('.rs__name')), claim: tx(rs.querySelector('.rs__claim')), logo: cdn((rs.querySelector('.rs__logo') || { getAttribute() { return ''; } }).getAttribute('src')), img: cdn((rs.querySelector('.rs__media img') || { getAttribute() { return ''; } }).getAttribute('src')),
    facts: [...rs.querySelectorAll('.rs__facts > div')].map(f => [tx(f.querySelector('dt')), tx(f.querySelector('dd'))]), story: inner(rs.querySelector('.rs__story .metafield-rich_text_field') || rs.querySelector('.rs__story')) };
  // Kaufbereich: Aromanoten, Mischung, Kurzwerte, Labels
  const main = sec('main');
  if (main) { const all = [...main.querySelectorAll('*')], lab = all.filter(e => !e.children.length && /^Aromanoten$/i.test(tx(e)))[0];
    if (lab) { let box = lab.parentElement; while (box && leaves(box).length < 2) box = box.parentElement; if (box) out.aromen = leaves(box).filter(t => !/^Aromanoten$/i.test(t)).slice(0, 6); }
    const t = tx(main); let r;
    if ((r = /(\d+)\s*% Arabica/.exec(t))) out.arabica = Number(r[1]);
    if ((r = /(\d+)\s*% Robusta/.exec(t))) out.robusta = Number(r[1]);
    if ((r = /Röstgrad\s+([A-ZÄÖÜa-zäöü]+)/.exec(t))) out.roestgrad = r[1];
    if ((r = /Bitterstoffe\s+([A-ZÄÖÜa-zäöü]+)/.exec(t))) out.bitter = r[1];
    if ((r = /Intensität\s+(\d+)\s*\/\s*10/.exec(t))) out.intensitaet = Number(r[1]);
    out.labels = [...main.querySelectorAll('[class*="label"],[class*="badge"]')].filter(e => !e.children.length).map(tx).filter(x => x && x.length < 30 && !/€|%|Angebot|Ausverkauft|Sale|Aromanoten|Bewertung/i.test(x)).filter((x, i, a) => a.indexOf(x) === i).slice(0, 3);
  }
  return out;
}

(async () => {
  // Produkte
  const pj = await get(SHOP + '/products.json?limit=250', 'products.json'); const products = JSON.parse(pj).products;
  fs.writeFileSync(path.join(OUT, 'products.json'), JSON.stringify({ products }));
  const pdp = {}; let nRev = 0, miss = [];
  for (const p of products) { const h = await get(SHOP + '/products/' + p.handle, 'p-' + p.handle + '.html'); if (!h) continue; const x = parseProduct(h); pdp[p.handle] = x; nRev += x.reviews.length; if (x.rating && x.reviews.length < x.rating.count) miss.push(p.handle + ' ' + x.reviews.length + '/' + x.rating.count); }
  // Fehlende Rezensionen über das öffentliche Loox-Widget nachladen
  for (const p of products) { const x = pdp[p.handle]; if (!x || !x.rating || x.reviews.length >= x.rating.count) continue;
    const seen = new Set(x.reviews.map(r => r.name + '|' + r.text));
    for (let page = 1; page <= 12 && x.reviews.length < x.rating.count; page++) { const h = await get('https://loox.io/widget/9V9HzZyQNz/reviews/' + p.id + '?limit=20&page=' + page, 'lx-' + p.handle + '-' + page + '.html'); if (!h) break;
      const items = [...new JSDOM(h).window.document.querySelectorAll('.grid-item-wrap')]; if (!items.length) break;
      items.forEach(it => { const nm = it.querySelector('.title'); if (!nm) return; const n2 = nm.cloneNode(true); n2.querySelectorAll('span').forEach(s => s.remove()); const name = tx(n2), text = tx(it.querySelector('.main-text')), key = name + '|' + text; if (seen.has(key)) return; seen.add(key);
        const st = it.querySelector('.stars [aria-label]'), rm = st ? /(\d)\s*\/\s*5/.exec(st.getAttribute('aria-label')) : null, tm = it.querySelector('[data-time]'), im = it.querySelector('img[src*="loox.io/uploads"]');
        x.reviews.push({ name, rating: rm ? Number(rm[1]) : 5, date: tm ? new Date(Number(tm.getAttribute('data-time'))).toISOString().slice(0, 10) : '', verified: !!it.querySelector('.loox-verified-badge'), text, img: im ? abs(im.getAttribute('src')) : '' }); nRev++; }); } }
  miss = products.filter(p => pdp[p.handle] && pdp[p.handle].rating && pdp[p.handle].reviews.length < pdp[p.handle].rating.count).map(p => p.handle + ' ' + pdp[p.handle].reviews.length + '/' + pdp[p.handle].rating.count);
  fs.writeFileSync(path.join(OUT, 'pdp.json'), JSON.stringify(pdp));
  // Kollektionen mit SEO-Text
  const cj = JSON.parse(await get(SHOP + '/collections.json?limit=250', 'collections.json')).collections, cols = {};
  for (const c of cj) { const h = await get(SHOP + '/collections/' + c.handle, 'c-' + c.handle + '.html'); const d = h ? new JSDOM(h).window.document : null;
    cols[c.handle] = { title: c.title, body: c.description || c.body_html || '', count: c.products_count, img: c.image ? c.image.src : '', seoTitle: d ? d.title.replace(/\s+[–-]\s+WAKE UP ESPRESSOMASCHINEN$/i, '').trim() : '', seoDesc: d ? ((d.querySelector('meta[name="description"]') || {}).content || '') : '',
      handles: d ? [...new Set([...d.querySelectorAll('ul.products.collection > li:not(.promotion-column) a[href*="/products/"]')].map(a => a.getAttribute('href').split('/products/')[1].split(/[?#]/)[0]))] : [] };
    for (let pg = 2; pg <= 6 && cols[c.handle].handles.length < c.products_count; pg++) { const h2 = await get(SHOP + '/collections/' + c.handle + '?page=' + pg, 'c-' + c.handle + '-' + pg + '.html'); if (!h2) break; const before = cols[c.handle].handles.length;
      [...new JSDOM(h2).window.document.querySelectorAll('ul.products.collection > li:not(.promotion-column) a[href*="/products/"]')].forEach(a => { const x = a.getAttribute('href').split('/products/')[1].split(/[?#]/)[0]; if (!cols[c.handle].handles.includes(x)) cols[c.handle].handles.push(x); }); if (cols[c.handle].handles.length === before) break; } }
  fs.writeFileSync(path.join(OUT, 'collections-seo.json'), JSON.stringify(cols));
  // Startseite
  const hh = await get(SHOP + '/', 'home.html'), hd = new JSDOM(hh).window.document;
  const home = { seoTitle: hd.title, seoDesc: (hd.querySelector('meta[name="description"]') || {}).content || '', sections: [] };
  hd.querySelectorAll('[id^="shopify-section-template"]').forEach(s => { const c = s.cloneNode(true); c.querySelectorAll('script,style,svg,noscript,template,form,product-card,.product-card,[class*="product-card"]').forEach(x => x.remove()); const hs = [...c.querySelectorAll('h1,h2,h3')].map(tx).filter(Boolean), rte = [...c.querySelectorAll('.rte,[class*="rich-text"],[class*="richtext"]')].filter(e => tx(e).length > 150).sort((a, b) => tx(b).length - tx(a).length)[0];
    home.sections.push({ id: s.id.replace(/^shopify-section-template--\d+__/, ''), heads: hs.slice(0, 8), len: tx(c).length, html: rte ? inner(rte) : tx(c).length > 1500 ? inner(c) : '' }); });
  fs.writeFileSync(path.join(OUT, 'home.json'), JSON.stringify(home));
  // Sitemap und alle Seiten, Richtlinien und Blogbeiträge
  const sm = await get(SHOP + '/sitemap.xml', 'sitemap.xml'), urls = [];
  for (const m of sm.matchAll(/<loc>([^<]+)<\/loc>/g)) { const u = m[1].replace(/&amp;/g, '&'); if (/agentic/.test(u)) continue; const x = await get(u, 'sm-' + u.split('/').pop().replace(/[^a-z0-9_]/gi, '_') + '.xml'); for (const k of x.matchAll(/<loc>([^<]+)<\/loc>/g)) { const pth = k[1].replace(SHOP, ''); if (pth && !/^https?:/.test(pth) && pth !== '/') urls.push(pth); } }
  ['terms-of-service', 'legal-notice', 'privacy-policy', 'refund-policy', 'subscription-policy', 'shipping-policy'].forEach(x => urls.push('/policies/' + x));
  const uniq = [...new Set(urls)]; fs.writeFileSync(path.join(OUT, 'sitemap.json'), JSON.stringify(uniq));
  const pagesAll = {};
  for (const u of uniq.filter(x => /^\/(pages|policies|blogs)\//.test(x))) { const h = await get(SHOP + u, 'x-' + u.replace(/[^a-z0-9_-]/gi, '_') + '.html'); if (!h) continue; const d = new JSDOM(h).window.document;
    const main = d.querySelector('.shopify-policy__container') || d.querySelector('main') || d.querySelector('#MainContent') || d.querySelector('[role="main"]'); if (!main) continue; const c = main.cloneNode(true);
    c.querySelectorAll('script,style,svg,noscript,template,form,nav,button,product-card,[class*="product-card"],[class*="product-grid"],.loox-ssr-reviews,[id*="loox"],[class*="breadcrumb"]').forEach(x => x.remove());
    const h1 = tx(c.querySelector('h1')) || tx(d.querySelector('h1')); pagesAll[u] = { h1, html: inner(c), seoTitle: d.title.replace(/\s+[–-]\s+WAKE UP ESPRESSOMASCHINEN$/i, '').trim(), seoDesc: (d.querySelector('meta[name="description"]') || {}).content || '' }; }
  fs.writeFileSync(path.join(OUT, 'pages-all.json'), JSON.stringify(pagesAll));
  console.log('Sitemap-URLs', uniq.length, '| Seiten/Richtlinien/Beiträge', Object.keys(pagesAll).length);
  console.log('Produkte', products.length, '| Seiten', Object.keys(pdp).length, '| Rezensionen', nRev, '| mit Bewertung', Object.values(pdp).filter(x => x.rating).length, '| Rösterei-Block', Object.values(pdp).filter(x => x.roaster).length, '| Details', Object.values(pdp).filter(x => x.details).length, '| Kollektionen', Object.keys(cols).length, 'mit Text', Object.values(cols).filter(c => c.body.length > 300).length);
  if (miss.length) console.log('Unvollständige Rezensionen:', miss.join(', '));
})();
