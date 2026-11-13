# Wake Up Espressomaschinen – Vorschau des neuen Shops

Statische Seite mit denselben Adressen wie Shopify (`/products/…`, `/collections/…`, `/pages/…`, `/blogs/ratgeber/…`).

- `data/shop/` – Abzug aus dem Shopify-Shop (Produkte, Seiten, Blog)
- `build/build.js` – erzeugt `dist/`: Produktdaten, vorgerenderte Seiten, Meta-Angaben, JSON-LD, Sitemap
- `src/` – Vorlage, Styles, Inhalte (`content.js`) und Shop-Logik (`app.js`)
- `dist/` – fertige Seite, wird von Netlify ausgeliefert (kein Build auf Netlify nötig)

Bauen: `npm install && npm run build`

Die Vorschau steht auf noindex. Für eine indexierbare Version: `GO_LIVE=1 SITE_URL=https://… npm run build` und den Header `X-Robots-Tag` in `netlify.toml` entfernen.
