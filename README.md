# Wake Up Espresso – Design-Entwurf

Klickdummy für ein neues Shop-Design von wakeup-espresso.com. Statisches HTML, CSS und Vanilla-JS, kein Build-Schritt.

- `index.html` – Grundgerüst (Header, Warenkorb, Footer)
- `assets/js/data.js` – Produkte, Preise, Röstprofile aus dem Shopify-Shop (Stand 13.11.2026)
- `assets/js/app.js` – Seiten: Start, Kaffee, Produkt, Maschinen, 5+1 Karton, Kaffee-Finder
- `assets/css/styles.css` – Design

"Zur Kassa" übergibt den Warenkorb an den echten Shop. Der 5+1-Abzug im Warenkorb ist eine Vorschau (günstigstes Kilo gratis).

Vor einem Go-live: `noindex` in `index.html`, `robots.txt` und `netlify.toml` entfernen.
