// Holt die vollständige Produktbeschreibung und alle Bilder live aus dem Shopify-Shop.
// Aufruf: /.netlify/functions/shop?product=<handle>
exports.handler = async function (event) {
  const headers = { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'public, max-age=3600' };
  const handle = String((event.queryStringParameters || {}).product || '').replace(/[^a-z0-9\-_]/gi, '');
  if (!handle) return { statusCode: 400, headers, body: JSON.stringify({ error: 'product fehlt' }) };
  try {
    const res = await fetch('https://www.wakeup-espresso.com/products/' + handle + '.json', { headers: { 'User-Agent': 'wakeup-design-preview' } });
    if (!res.ok) return { statusCode: res.status, headers, body: JSON.stringify({ error: 'Shop antwortet mit ' + res.status }) };
    const p = (await res.json()).product || {};
    return { statusCode: 200, headers, body: JSON.stringify({ html: p.body_html || '', images: (p.images || []).map(function (i) { return i.src; }).slice(0, 8) }) };
  } catch (e) {
    return { statusCode: 502, headers, body: JSON.stringify({ error: 'Shop nicht erreichbar' }) };
  }
};
