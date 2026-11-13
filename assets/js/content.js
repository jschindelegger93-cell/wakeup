/* Inhalte: Röstereien, Service-Seiten, FAQ, Ratgeber. Fakten aus dem Shop wakeup-espresso.com (Stand 13.11.2026). */
window.WU = window.WU || {};

WU.ORG = { name: 'Wake Up Espressomaschinen', street: 'Landstraßer Hauptstraße 105', zip: '1030', city: 'Wien', country: 'AT', phone: '+43 1 9089092', email: 'office@wakeup-espresso.com', since: 2010 };

/* Rösterei → Herkunft */
WU.REGIONS = {
  'Guglielmo': { region: 'Kalabrien', place: 'Capanello, Provinz Catanzaro', line: 'Von der Küste Kalabriens. Kräftig, schokoladig, mit dichter Crema.', mood: 'Die Bar an der Strandpromenade' },
  'Kremoso': { region: 'Neapel', place: 'Napoli', line: 'Sehr dunkel und ölig geröstet, wie man ihn in Neapel am Tresen trinkt.', mood: 'Im Stehen, mit Blick auf den Vesuv' },
  'Escaffe': { region: 'Basilikata', place: 'Basilikata', line: 'Von den Brüdern Esposito. Nussig, würzig, kaum Säure.', mood: 'Das kleine Café am Dorfplatz' },
  'Ionia': { region: 'Sizilien', place: 'Giarre, am Fuß des Ätna', line: 'Seit 1960 am Ätna geröstet. Rauchig, würzig, typisch sizilianisch.', mood: 'Nach dem Markt in Catania' },
  'Trombetta': { region: 'Rom', place: 'Roma', line: 'Seit 1890 in Rom. Ausgewogen, nussig, elegant.', mood: 'Der schnelle Caffè neben der Stazione' },
  'La Messicana': { region: 'Piacenza', place: 'Piacenza, Norditalien', line: 'Seit 1957. Barmischungen mit wenig Bitterstoffen und viel Crema.', mood: 'Die Autobahn-Raststation Richtung Süden' }
};

/* Service-Seiten: [Überschrift, Text] */
WU.PAGES = {
  'ueber-uns': { title: 'Über uns', shop: 'about-us', intro: 'Säurearme, authentisch italienische Röstungen, abseits des glattgebügelten Mainstream-Geschmacks. Das war von Anfang an unsere Idee.', blocks: [
    ['Ein Wiener Familienbetrieb', 'Seit 2010 dreht sich bei uns alles um Espresso. Wir importieren die Röstungen ausgewählter italienischer Röstereien direkt und bestellen mehrmals im Jahr frisch nach.'],
    ['Eigene Werkstatt', 'Gründer Mario Sciurti ist selbst Techniker. Jede Maschine wird vor dem Versand bei uns geprüft, und wir warten und reparieren alle Geräte, die bei uns gekauft wurden.'],
    ['Wir verkaufen nur, was wir selbst trinken', 'Zu Hause läuft bei uns derselbe Kaffee wie im Geschäft. Deshalb ist das Sortiment bewusst überschaubar.']] },
  'einschulungen': { title: 'Einschulungen', shop: 'einschulungen', intro: 'Zu jeder Maschine gehört eine ordentliche Einführung in die Welt des Espressos.', blocks: [
    ['Beim Kauf im Geschäft', 'Seit über einem Jahrzehnt zeigen wir unseren Kundinnen und Kunden direkt an der Maschine, wie Mahlgrad, Menge und Tampern zusammenspielen.'],
    ['Beim Kauf im Online-Shop', 'Du bekommst die Einschulung per Telefon oder WhatsApp-Videocall. Einen Barista-Kurs brauchst du danach nicht.'],
    ['Mühle schon eingestellt', 'Kaufst du Maschine und Mühle zusammen, ist die Mühle meist schon auf deinen Kaffee eingestellt, wenn die Lieferung ankommt.']] },
  'maschinenservice': { title: 'Maschinenservice', shop: 'maschinenservice', intro: 'Wer einmal guten Espresso zu Hause hatte, will nicht mehr darauf verzichten. Damit das so bleibt, braucht die Maschine Pflege.', blocks: [
    ['Service in unserer Werkstatt', 'Wir warten und reparieren alle bei uns gekauften Maschinen, von der Brühgruppen-Dichtung bis zur Pumpe.'],
    ['Was du selbst tun kannst', 'Regelmäßig rückspülen, das Sieb sauber halten und das passende Wasser verwenden. Reinigungsmittel, Bürsten, Dichtungen und Wasserfilter gibt es bei uns.'],
    ['Termin vereinbaren', 'Ruf uns an oder schreib uns, dann finden wir einen Termin.']] },
  'gastro-buero': { title: 'Gastro & Büro', shop: 'gastro-buro', intro: 'Maßgeschneiderte Lösungen für Lokale jeder Art und für dein Team im Büro.', blocks: [
    ['Maschinen und Mühlen', 'Wir stellen die passende Kombination aus Maschine und Mühle zusammen, abgestimmt auf Menge und Platz.'],
    ['Kaffee im Karton', 'Italienische Barmischungen in der Kiloverpackung. Im Karton zahlst du 5 Kilo und bekommst 6.'],
    ['Persönliche Beratung', 'Schreib uns kurz, was du vorhast. Wir melden uns mit einem Vorschlag.']] },
  'versand-rabatte': { title: 'Versand & Rabatte', shop: 'versand-rabatte', intro: 'Wir verschicken in der Regel am gleichen Tag, von Montag bis Samstag.', blocks: [
    ['Versandkosten', 'Gratis Versand ab € 89 Warenwert in Österreich und ab € 150 nach Deutschland. Die Lieferung dauert meist 1–3 Werktage.'],
    ['5+1 Kilo', 'In Italien ist das Kilo die Standardverpackung für Bohnen. Im Karton mit 6 Kilo zahlst du nur 5. Im 5+1 Karton kannst du die Sorten frei mischen.'],
    ['Maschinensets', 'Maschine und Mühle im Set: minus 7 % beim Checkout.'],
    ['Maschinenversand', 'Espressomaschinen verschicken wir sicher auf Palette per Spedition.']] },
  'kontakt': { title: 'Kontakt', shop: 'contact', intro: 'Komm vorbei, ruf an oder schreib uns. Wir beraten dich persönlich.', blocks: [
    ['Geschäft und Werkstatt', 'Wake Up Espressomaschinen, Landstraßer Hauptstraße 105, 1030 Wien.'],
    ['Telefon und E-Mail', 'Telefon +43 1 9089092, E-Mail office@wakeup-espresso.com.'],
    ['Öffnungszeiten', 'Die aktuellen Öffnungszeiten findest du auf der Kontaktseite im Shop.']] }
};

/* FAQ: Gruppe → [Frage, Antwort] */
WU.FAQ = [
  ['Bestellung und Versand', [
    ['Ab wann ist der Versand gratis?', 'Ab € 89 Warenwert in Österreich und ab € 150 nach Deutschland.'],
    ['Wie schnell wird geliefert?', 'Wir verschicken in der Regel am gleichen Tag, von Montag bis Samstag. Kaffee und Zubehör, die du bis 13 Uhr bestellst, gehen meist noch am selben Werktag raus. Die Lieferung dauert in der Regel 1–3 Werktage.'],
    ['Wohin liefert ihr?', 'Nach Österreich, Deutschland und in die EU.'],
    ['Wie kann ich bezahlen?', 'Mit PayPal, Klarna, Kreditkarte, Apple Pay oder eps. Du kaufst mit Trusted-Shops-Käuferschutz.'],
    ['Was heißt „Vorbestellen“?', 'Das Produkt ist gerade nicht lagernd. Du kannst es trotzdem bestellen, wir verschicken es sofort nach dem Eintreffen bei uns.']]],
  ['5+1 und Rabatte', [
    ['Wie funktioniert 5+1?', 'Du nimmst 6 Kilo Bohnen und bezahlst 5. Das gibt es als Karton einer Sorte oder frei gemischt im 5+1 Karton.'],
    ['Kann ich im 5+1 Karton verschiedene Röstereien mischen?', 'Ja. Du wählst sechs Kaffees mit 1-kg-Packung, quer über alle Röstereien.'],
    ['Was bringt ein Maschinenset?', 'Wenn du Espressomaschine und Mühle im Set kaufst, sparst du 7 % beim Checkout.'],
    ['Was sind Probierpakete?', 'Fertig zusammengestellte Pakete mit vier oder sechs Röstungen zum Kennenlernen, günstiger als einzeln gekauft.']]],
  ['Kaffee', [
    ['Warum ist euer Kaffee so säurearm?', 'Die Bohnen sind dunkel bis sehr dunkel geröstet, wie in Süditalien üblich. Bei längerer Röstung nimmt die Säure ab. Statt Säure schmeckst du Kakao, Haselnuss, dunkle Schokolade und Gewürze.'],
    ['Arabica oder Robusta, was ist besser?', 'Keines von beiden. Robusta sorgt für dichte Crema, viel Körper und mehr Koffein. Ein hoher Arabica-Anteil schmeckt runder und milder. Auf jeder Produktseite siehst du das Mischverhältnis.'],
    ['Welcher Kaffee passt für Cappuccino?', 'Kräftige Mischungen mit Robusta-Anteil setzen sich in der Milch besser durch. Der Kaffee-Finder schlägt dir passende Röstungen vor.'],
    ['Habt ihr entkoffeinierten Espresso?', 'Ja, zum Beispiel Guglielmo Dek in ganzen Bohnen für die Siebträgermaschine.'],
    ['Wie bewahre ich Bohnen richtig auf?', 'Kühl, trocken, dunkel und luftdicht verschlossen. Nicht in den Kühlschrank stellen, dort ziehen die Bohnen Feuchtigkeit und Gerüche.'],
    ['Gibt es den Kaffee auch gemahlen oder als Pads?', 'Ja. Im Shop gibt es gemahlenen Espresso für den Siebträger, Moka-Kaffee für die Espressokanne und E.S.E.-Pads.']]],
  ['Maschinen und Mühlen', [
    ['Welche Maschine ist die richtige für mich?', 'Das hängt vor allem davon ab, wie oft du Milchgetränke machst. Einkreiser sind ideal für Espresso-Puristen, Zweikreiser und Dualboiler für Cappuccino. Der Maschinen-Finder hilft dir bei der Auswahl.'],
    ['Wie kommt die Maschine zu mir?', 'Sicher auf Palette per Spedition. Vorher prüfen wir jede Maschine in unserer Werkstatt.'],
    ['Bekomme ich eine Einschulung?', 'Ja, zu jeder Maschine. Im Geschäft direkt am Gerät, beim Onlinekauf per Telefon oder WhatsApp-Videocall.'],
    ['Brauche ich wirklich eine eigene Mühle?', 'Für Espresso aus dem Siebträger ja. Frisch gemahlen und auf deinen Kaffee eingestellt macht die Mühle den größten Unterschied in der Tasse.'],
    ['Was passiert, wenn etwas kaputtgeht?', 'Unser Maschinenservice in Wien wartet und repariert alle bei uns gekauften Maschinen.']]]
];

/* Ratgeber */
WU.GUIDES = [
  { slug: 'siebtraeger-typen', title: 'Einkreiser, Zweikreiser, Dualboiler oder Hebelmaschine?', teaser: 'Vier Bauarten, eine Frage: Wie oft machst du Milchschaum?', min: 4, shop: 'einkreiser-zweikreiser-dualboiler-hebelmashinen', related: ['quickmill-carola-evo', 'elba-quattro', 'lamarzocco-linea-mini-r', 'la-san-marco-20-20-leva'], sections: [
    ['Einkreiser', 'Ein Kessel für alles. Kompakt, unkompliziert und schnell aufgeheizt. Ideal, wenn du fast nur Espresso trinkst. Für Milchschaum musst du die Temperatur umschalten und kurz warten.'],
    ['Zweikreiser', 'Ein Kessel für Dampf, durch den das Brühwasser in einem eigenen Kreislauf läuft. Du beziehst Espresso und schäumst gleichzeitig Milch. Die beliebteste Bauart für Cappuccino zu Hause.'],
    ['Dualboiler', 'Zwei getrennte Kessel, einer für Espresso, einer für Dampf. Die Brühtemperatur lässt sich exakt einstellen und der Dampf bleibt kräftig, auch bei mehreren Getränken hintereinander.'],
    ['Hebelmaschine', 'Der Druck kommt nicht von einer Pumpe, sondern von einer Feder, die du mit dem Hebel spannst. Leise, langlebig und für viele die schönste Art, Espresso zu machen.']] },
  { slug: 'mahlgrad-einstellen', title: 'Mahlgrad einstellen: So gelingt der erste Espresso', teaser: 'Zu sauer, zu bitter, zu dünn? Meist liegt es am Mahlgrad.', min: 3, related: ['eureka-mignon-15bl', 'eureka-mignon-kupfer', 'mazzer-mini-g'], sections: [
    ['Der Richtwert', 'Für einen doppelten Espresso etwa 16–18 g Kaffeemehl. Die Durchlaufzeit sollte bei rund 25–30 Sekunden liegen. Das ist ein Startpunkt, kein Gesetz.'],
    ['Läuft zu schnell durch', 'Der Espresso schmeckt dünn und säuerlich, die Crema ist hell. Stell die Mühle feiner.'],
    ['Läuft zu langsam oder tröpfelt', 'Der Espresso schmeckt bitter und verbrannt. Stell die Mühle gröber.'],
    ['Immer nur eine Sache ändern', 'Menge und Tamperdruck gleich lassen und nur den Mahlgrad in kleinen Schritten verstellen. Bei einem neuen Kaffee beginnt das Einstellen von vorn.']] },
  { slug: 'reinigung-wartung', title: 'Reinigung und Wartung: Was wirklich nötig ist', teaser: 'Fünf Minuten in der Woche verlängern das Leben deiner Maschine um Jahre.', min: 3, shop: 'reinigung-wartung-was-tun', related: ['quickmill-carola-evo', '969-coffee-elba-mini-lux'], sections: [
    ['Nach jedem Bezug', 'Siebträger ausklopfen, kurz Wasser durch die Brühgruppe laufen lassen und die Dampflanze sofort abwischen und ausblasen.'],
    ['Einmal pro Woche', 'Bei Maschinen mit Rückspülmöglichkeit mit dem Blindsieb rückspülen. Siebe und Siebträger in warmem Wasser mit Kaffeefettlöser einlegen.'],
    ['Wasser', 'Kalk ist der häufigste Grund für Reparaturen. Verwende weiches oder gefiltertes Wasser. Wie oft entkalkt werden muss, hängt von deiner Wasserhärte ab.'],
    ['Wenn es doch einmal tropft', 'Dichtungen sind Verschleißteile. Unser Maschinenservice tauscht sie und sieht sich die Maschine bei der Gelegenheit ganz an.']] },
  { slug: 'arabica-robusta', title: 'Arabica und Robusta: Was süditalienischen Espresso ausmacht', teaser: 'Warum der Espresso in Neapel anders schmeckt als in Mailand.', min: 3, related: ['guglielmo-caffeteria', 'ionia-gastronom', 'guglielmo-club-99', 'kremoso'], sections: [
    ['Je weiter südlich, desto mehr Robusta', 'Italienische Röstungen mischen Arabica mit Robusta. Im Süden ist der Robusta-Anteil traditionell höher. Das ergibt den kräftigen Espresso, den viele aus dem Urlaub kennen.'],
    ['Was Robusta bringt', 'Dichte, haselnussbraune Crema, viel Körper, kaum Säure und mehr Koffein. Reine Robusta-Mischungen sind die kräftigsten im Sortiment.'],
    ['Was Arabica bringt', 'Feinere Aromen, etwas mehr Frucht und einen runderen, milderen Geschmack. 100 % Arabica gibt es bei uns auch dunkel geröstet und damit säurearm.'],
    ['Das Röstprofil lesen', 'Auf jeder Produktseite siehst du Mischverhältnis, Röstung, Intensität, Körper, Bitterkeit und Säure. So findest du schnell eine Röstung, die ähnlich schmeckt wie dein Favorit.']] },
  { slug: 'moka-kanne', title: 'Espresso unterwegs: Die Moka-Kanne', teaser: 'Der Reisebegleiter, der in jeden Rucksack passt.', min: 2, shop: 'espresso-unterwegs-warum-die-moka-kanne-der-perfekte-reisebegleiter-ist', related: [], sections: [
    ['So geht es', 'Wasser bis knapp unter das Ventil füllen, den Trichter locker mit Moka-Kaffee füllen und nicht andrücken. Bei mittlerer Hitze aufsetzen.'],
    ['Der richtige Moment', 'Sobald der Kaffee hörbar zu blubbern beginnt, die Kanne vom Herd nehmen. So wird er nicht bitter.'],
    ['Der richtige Kaffee', 'Moka-Kaffee ist etwas gröber gemahlen als Espresso für den Siebträger. Im Shop gibt es ihn fertig gemahlen in der 250-g-Packung.']] }
];
