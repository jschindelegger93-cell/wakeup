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

/* Bilder aus dem Shop für Seiten und Ratgeber */
WU.IMG = function (name) { return WU.CDN + name + (name.indexOf('?') < 0 ? '?width=1200' : ''); };
WU.PAGES['ueber-uns'].img = 'ScrollingBoxes3.png';
WU.PAGES['kontakt'].img = 'duotone_30.png';
WU.PAGES['maschinenservice'].img = 'ScrollingBoxes2.png';
WU.PAGES['einschulungen'].img = 'duotone_26.png';
WU.PAGES['gastro-buero'].img = 'Untitled-216.jpg';
(function () {
  var imgs = { 'siebtraeger-typen': 'Kaffeemaschinen.png', 'mahlgrad-einstellen': '04_Artboard_11.jpg', 'reinigung-wartung': 'ScrollingBoxes2.png', 'arabica-robusta': 'banner-red-desktop-1.jpg', 'moka-kanne': 'banner-orange-desktop-1.jpg' };
  WU.GUIDES.forEach(function (g) { g.img = imgs[g.slug]; });
})();
WU.GUIDES.push(
  { slug: 'bestellen-wie-in-italien', img: 'ScrollingBoxes4.png', title: 'Bestellen wie in Italien: Caffè, Macchiato, Corretto', teaser: 'Wer in Italien einen Espresso will, bestellt einfach „un caffè“.', min: 3, related: ['guglielmo-espresso-bar', 'kremoso-armonia', 'ionia-special-bar'], sections: [
    ['Un caffè', 'Der Espresso heißt in Italien schlicht Caffè. Getrunken wird er im Stehen an der Bar, in zwei, drei Schlucken, oft mit einem Glas Wasser davor.'],
    ['Macchiato und Cappuccino', 'Caffè macchiato ist ein Espresso mit einem Klecks Milchschaum. Cappuccino trinkt man in Italien traditionell am Vormittag.'],
    ['Corretto', 'Der „korrigierte“ Espresso bekommt einen Schuss Hochprozentiges, meist Grappa.'],
    ['Das Gefühl nach Hause holen', 'Dunkle Röstung, Robusta-Anteil, dichte Crema: Genau das macht den Geschmack aus, den du aus dem Urlaub kennst. Unsere Röstungen aus Kalabrien, Neapel und Sizilien bringen ihn in deine Küche.']] },
  { slug: 'milchschaum', img: '08_006.jpg', title: 'Der perfekte Milchschaum für Cappuccino', teaser: 'Feinporig, glänzend und süß. Mit drei Handgriffen klappt es.', min: 3, related: ['elba-quattro', 'lamarzocco-linea-mini-r', 'guglielmo-caffeteria'], sections: [
    ['Kalte Milch, saubere Lanze', 'Starte mit kalter Milch aus dem Kühlschrank und einem Kännchen, das höchstens zur Hälfte gefüllt ist. Die Dampflanze vorher kurz ausblasen.'],
    ['Erst ziehen, dann rollen', 'Die Düse knapp unter die Oberfläche halten, bis die Milch leise zischt und etwas an Volumen gewinnt. Dann tiefer eintauchen und die Milch im Kännchen kreisen lassen.'],
    ['Rechtzeitig aufhören', 'Sobald du das Kännchen kaum noch anfassen kannst, ist die Milch warm genug, das sind etwa 60–65 °C. Heißer wird sie nicht besser, sondern verliert ihre Süße.'],
    ['Welcher Kaffee dazu', 'Für Milchgetränke eignen sich kräftige Mischungen mit Robusta-Anteil. Sie setzen sich in der Milch durch.']] },
  { slug: 'espresso-fehler', img: 'Kaffee.png', title: 'Sauer, bitter, wässrig: Espresso-Fehler schnell beheben', teaser: 'Die häufigsten Probleme und was du als Erstes änderst.', min: 3, related: ['eureka-mignon-15bl', 'guglielmo-espresso-classico-aus-kalabrien'], sections: [
    ['Sauer und dünn', 'Der Espresso läuft zu schnell durch. Mahlgrad feiner stellen oder etwas mehr Kaffee ins Sieb geben.'],
    ['Bitter und verbrannt', 'Der Espresso läuft zu langsam. Mahlgrad gröber stellen. Prüfe auch, ob die Maschine sauber ist: alte Kaffeefette schmecken bitter.'],
    ['Keine Crema', 'Oft sind die Bohnen zu alt oder zu grob gemahlen. Mischungen mit Robusta-Anteil bilden von Natur aus mehr Crema.'],
    ['Jeder Bezug anders', 'Dann stimmt meist die Menge nicht. Wiege das Kaffeemehl ein paar Mal ab, bis du ein Gefühl dafür hast.']] },
  { slug: 'muehle-wichtiger', img: 'ScrollingBoxes1.png', title: 'Warum die Mühle wichtiger ist als die Maschine', teaser: 'Eine Espressomaschine ist nur so gut wie die Mühle daneben.', min: 2, shop: 'muhlen-im-vergleich', related: ['eureka-mignon-15bl', 'eureka-mignon-16cr', 'eureka-mignon-kupfer', 'mazzer-mini-g'], sections: [
    ['Frisch gemahlen', 'Gemahlener Kaffee verliert sein Aroma innerhalb von Minuten. Wer direkt vor dem Bezug mahlt, schmeckt den Unterschied sofort.'],
    ['Stufenlos einstellbar', 'Für Espresso reichen grobe Rasterstufen nicht. Erst eine stufenlose Verstellung erlaubt es, den Mahlgrad genau auf die Bohne abzustimmen.'],
    ['Unsere Empfehlung', 'Für zu Hause empfehlen wir seit über zehn Jahren die Eureka Mignon Silenzio: stufenlos, sehr leise und passend zu jeder Maschine. Wer aufs Gramm genau dosieren will, nimmt die Mazzer Mini g mit integrierter Waage.']] },
  { slug: 'wasser', img: 'duotone_26.png', title: 'Das richtige Wasser für deine Espressomaschine', teaser: 'Kalk ist der häufigste Grund für Reparaturen.', min: 2, related: ['quickmill-carola-evo', '969-coffee-elba-mini-lux'], sections: [
    ['Warum Wasser wichtig ist', 'Espresso besteht fast nur aus Wasser. Hartes Wasser schmeckt flach und lagert Kalk in Kessel und Leitungen ab.'],
    ['Was du tun kannst', 'Verwende weiches oder gefiltertes Wasser. Wasserfilter für den Tank gibt es bei uns im Shop.'],
    ['Entkalken', 'Wie oft das nötig ist, hängt von deiner Wasserhärte und der Maschine ab. Im Zweifel fragst du unseren Maschinenservice, bevor du selbst entkalkst.']] },
  { slug: 'bohnen-lagern', img: 'Produktbild.png', title: 'Kaffeebohnen richtig lagern', teaser: 'So bleibt das Kilo bis zur letzten Tasse frisch.', min: 2, related: ['probierpaket-6x1kg-bohnen', 'wake-up-bestseller-4x1kg-bohnen'], sections: [
    ['Kühl, trocken, dunkel, dicht', 'Luft, Licht, Wärme und Feuchtigkeit sind die Feinde des Aromas. Lass die Bohnen in der Originalverpackung und verschließe sie gut.'],
    ['Nicht in den Kühlschrank', 'Dort ziehen die Bohnen Feuchtigkeit und fremde Gerüche an.'],
    ['Karton auf Vorrat', 'Ungeöffnete Packungen halten ihr Aroma deutlich länger als angebrochene. Deshalb lohnt sich der Karton mit 5+1 Kilo auch für kleinere Haushalte.']] },
  { slug: 'erste-siebtraegermaschine', img: 'Untitled-216.jpg', title: 'Die erste Siebträgermaschine: Was du wirklich brauchst', teaser: 'Maschine, Mühle, guter Kaffee. Mehr ist es am Anfang nicht.', min: 3, related: ['maschinenset-quickmill-carola-evo', 'maschinenset-elba-mini-lux', 'maschinenset-elba-quattro'], sections: [
    ['Maschine und Mühle gemeinsam denken', 'Plane die Mühle von Anfang an mit ein. Im Set aus Maschine und Mühle sparst du bei uns 7 % beim Checkout.'],
    ['Das Zubehör', 'Ein Tamper, der zum Sieb passt, ein Abschlagbehälter und ein Milchkännchen. Alles andere kann warten.'],
    ['Die Einschulung', 'Zu jeder Maschine gehört bei uns eine persönliche Einschulung, im Geschäft oder per Videocall. Danach weißt du, wie du Mahlgrad und Menge einstellst.'],
    ['Wenn du unsicher bist', 'Der Maschinen-Finder gibt dir in zwei Fragen eine erste Richtung. Oder du rufst uns einfach an.']] }
);

/* Ratgeber-Ausbau: zusätzliche Abschnitte (s) und Fragen (f) je Artikel.
   Themen abgeleitet aus dem, was Mitbewerber-Ratgeber abdecken (Mahlgrad, Milchschaum, Siebträger oder Vollautomat, Zubereitung, Rezepte). */
WU.EXTRA = {
  'siebtraeger-typen': { s: [
    ['Aufheizzeit und Platzbedarf', 'Kleine Einkreiser sind am schnellsten betriebsbereit und brauchen am wenigsten Stellfläche. Maschinen mit großer Brühgruppe und Kessel brauchen länger, halten die Temperatur dafür sehr stabil. Miss vor dem Kauf die Höhe unter dem Oberschrank, denn der Wassertank wird meist von oben befüllt.'],
    ['Wassertank oder Festwasser', 'Für zu Hause reicht fast immer ein Tank. Ein Festwasseranschluss lohnt sich, wenn sehr viele Getränke pro Tag gemacht werden, etwa im Büro.'],
    ['Vibrations- oder Rotationspumpe', 'Vibrationspumpen sind kompakt und günstiger, Rotationspumpen laufen leiser und gleichmäßiger. Im Geschmack ist der Unterschied klein, im Geräusch deutlich.'],
    ['Unsere Faustregel', 'Fast nur Espresso: Einkreiser. Täglich Cappuccino: Zweikreiser. Mehrere Milchgetränke hintereinander und exakte Temperatur: Dualboiler. Freude am Handwerk: Hebelmaschine.']],
    f: [['Reicht ein Einkreiser für Cappuccino?', 'Ja, für gelegentliche Milchgetränke. Du musst zwischen Brühen und Dampf umschalten und kurz warten.'], ['Welche Maschine ist am leisesten?', 'Hebelmaschinen arbeiten ohne Pumpe und sind am leisesten. Bei Pumpenmaschinen sind Modelle mit Rotationspumpe ruhiger.']] },
  'mahlgrad-einstellen': { s: [
    ['Schritt für Schritt', 'Erstens die Menge festlegen und beibehalten. Zweitens gleichmäßig und gerade tampern. Drittens Bezug starten und die Zeit stoppen. Viertens den Mahlgrad um eine kleine Stufe verändern und wiederholen, bis Zeit und Geschmack passen.'],
    ['Woran du es schmeckst', 'Sauer, dünn, helle Crema: zu grob. Bitter, verbrannt, dunkle fleckige Crema: zu fein. Süß, rund, haselnussbraune Crema: getroffen.'],
    ['Wenn sich plötzlich alles ändert', 'Neue Packung, anderes Wetter oder ältere Bohnen verändern den Durchlauf. Kleine Korrekturen am Mahlgrad sind normal und kein Zeichen für einen Defekt.'],
    ['Dunkle Röstungen', 'Süditalienische Röstungen verzeihen mehr als helle. Sie brauchen meist einen etwas gröberen Mahlgrad und laufen trotzdem cremig durch.']],
    f: [['Wie viel Kaffee kommt ins Sieb?', 'Als Startwert etwa 16–18 g für das Doppelsieb. Wichtig ist, dass die Menge bei jedem Bezug gleich bleibt.'], ['Muss ich bei jeder neuen Sorte neu einstellen?', 'Ja, fast immer. Jede Röstung verhält sich in der Mühle etwas anders.']] },
  'reinigung-wartung': { s: [
    ['Der Wochenplan', 'Täglich: Siebträger und Dampflanze reinigen, Abtropfschale leeren. Wöchentlich: rückspülen, Siebe einlegen, Duschensieb abbürsten. Alle paar Monate: Dichtung und Duschensieb prüfen.'],
    ['Die Mühle nicht vergessen', 'Kaffeeöle setzen sich auch im Mahlwerk ab und werden ranzig. Auswurf regelmäßig auspinseln und den Bohnenbehälter mit einem trockenen Tuch auswischen.'],
    ['Was du dafür brauchst', 'Blindsieb, Kaffeefettlöser, eine Bürste für die Brühgruppe und ein Tuch nur für die Dampflanze. Im Service-Set ist das Wichtigste beisammen.'],
    ['Wann zum Service', 'Wenn Wasser neben dem Siebträger austritt, der Druck schwankt oder die Maschine ungewohnte Geräusche macht.']],
    f: [['Wie oft soll ich rückspülen?', 'Bei täglicher Nutzung etwa einmal pro Woche mit Kaffeefettlöser.'], ['Kann ich selbst entkalken?', 'Das hängt von der Maschine ab. Frag im Zweifel vorher unseren Maschinenservice.']] },
  'arabica-robusta': { s: [
    ['Warum Robusta zu Unrecht einen schlechten Ruf hat', 'Billiger Robusta schmeckt hart und erdig. Sorgfältig ausgewählter und dunkel gerösteter Robusta bringt dagegen Schokolade, Nuss und eine Crema, die stehen bleibt.'],
    ['Mischungen im Überblick', '100 % Arabica: fein, mild, aromatisch. 70–90 % Arabica: rund, mit mehr Crema. Um 50 %: klassischer Barkaffee. Unter 30 % und reiner Robusta: sehr kräftig, viel Koffein, ideal mit Milch.'],
    ['Koffein', 'Robusta enthält deutlich mehr Koffein als Arabica. Wer es stark mag, greift zu Mischungen mit hohem Robusta-Anteil.'],
    ['So findest du deine Mischung', 'Mit einem Probierpaket testest du vier oder sechs Röstungen nebeneinander. Oder du mischst dir im 5+1 Karton selbst eine Auswahl.']],
    f: [['Ist 100 % Arabica besser?', 'Nein, nur anders. Es kommt darauf an, ob du es fein und mild oder kräftig mit viel Crema magst.'], ['Welche Mischung hat die meiste Crema?', 'Mischungen mit hohem Robusta-Anteil.']] },
  'moka-kanne': { s: [
    ['Häufige Fehler', 'Zu heiße Platte, angedrücktes Kaffeemehl und zu fein gemahlener Kaffee. Alle drei machen den Moka bitter.'],
    ['Pflege', 'Nur mit warmem Wasser ausspülen und offen trocknen lassen. Dichtung und Sieb hin und wieder prüfen.'],
    ['Moka ist kein Espresso', 'Die Kanne arbeitet mit viel weniger Druck als eine Siebträgermaschine. Das Ergebnis ist kräftig und aromatisch, hat aber keine Crema.']],
    f: [['Welcher Mahlgrad für die Moka-Kanne?', 'Etwas gröber als für Espresso aus dem Siebträger. Fertig gemahlenen Moka-Kaffee gibt es bei uns in 250 g.']] },
  'bestellen-wie-in-italien': { s: [
    ['Kleines Wörterbuch', 'Ristretto: noch kürzer und dichter. Lungo: mit mehr Wasser. Doppio: doppelte Menge. Freddo: kalt. Al vetro: im Glas serviert.'],
    ['Die Regeln an der Bar', 'Oft zahlst du zuerst an der Kassa und legst den Bon auf den Tresen. Getrunken wird im Stehen. Wer sich setzt, zahlt meist mehr.'],
    ['Affogato und Shakerato', 'Affogato ist eine Kugel Vanilleeis mit heißem Espresso übergossen. Der Shakerato wird mit Eis und etwas Zucker kalt geschüttelt. Beides gelingt zu Hause mit jeder kräftigen Röstung.']],
    f: [['Was ist der Unterschied zwischen Caffè und Espresso?', 'Keiner. In Italien bestellt man einen Caffè und bekommt einen Espresso.']] },
  'milchschaum': { s: [
    ['Welche Milch', 'Vollmilch schäumt am cremigsten. Pflanzliche Alternativen funktionieren am besten in der Barista-Variante.'],
    ['Typische Fehler', 'Grobe Blasen: Düse zu weit oben. Kein Volumen: Düse zu tief. Schaum trennt sich von der Milch: zu lange gewartet, vor dem Eingießen noch einmal schwenken.'],
    ['Nach dem Schäumen', 'Kännchen kurz auf die Arbeitsfläche klopfen, schwenken, bis die Oberfläche glänzt, und sofort eingießen. Dampflanze abwischen und ausblasen.']],
    f: [['Wie heiß soll die Milch werden?', 'Etwa 60–65 °C. Dann ist sie am süßesten.'], ['Brauche ich dafür einen Zweikreiser?', 'Nein, aber er macht es bequemer, weil du gleichzeitig Espresso beziehen kannst.']] },
  'espresso-fehler': { s: [
    ['Die fünf Stellschrauben', 'In Italien spricht man von den fünf M: die Mischung, die Mühle, die Maschine, die Menge und der Mensch, der sie bedient. Geh sie der Reihe nach durch, wenn etwas nicht schmeckt.'],
    ['Maschine nicht heiß genug', 'Ist die Maschine noch nicht vollständig aufgeheizt, schmeckt der Espresso flach oder sauer. Siebträger immer eingespannt mit aufheizen.'],
    ['Wasser läuft am Rand vorbei', 'Dann ist schief getampert oder das Sieb zu wenig gefüllt. Gleichmäßig verteilen und gerade andrücken.']],
    f: [['Warum schmeckt mein Espresso plötzlich anders?', 'Meist wegen einer neuen Packung oder älterer Bohnen. Stell den Mahlgrad leicht nach.']] },
  'muehle-wichtiger': { s: [
    ['On-Demand statt Vorratsmahlen', 'Eine On-Demand-Mühle mahlt jede Portion frisch direkt in den Siebträger. Es bleibt kein altes Kaffeemehl im Dosierer liegen.'],
    ['Lautstärke', 'Wer morgens mahlt, während andere schlafen, merkt den Unterschied. Die Mignon Silenzio trägt ihren Namen nicht zufällig.'],
    ['Im Set sparen', 'Maschine und Mühle gemeinsam: minus 7 % beim Checkout. Außerdem ist die Mühle dann meist schon auf deinen Kaffee eingestellt.']],
    f: [['Kann ich fertig gemahlenen Kaffee im Siebträger verwenden?', 'Ja, es gibt bei uns gemahlenen Espresso. Den Mahlgrad kannst du dann aber nicht mehr an deine Maschine anpassen.']] },
  'wasser': { s: [
    ['Leitungswasser in Wien', 'Wiener Hochquellwasser ist vergleichsweise weich. In vielen anderen Regionen ist das Wasser deutlich härter. Die Wasserhärte erfährst du bei deinem Wasserversorger.'],
    ['Kein destilliertes Wasser', 'Ganz ohne Mineralien schmeckt Espresso leer, und manche Füllstandssensoren arbeiten damit nicht zuverlässig.']],
    f: [['Wie oft muss ich den Wasserfilter wechseln?', 'Halte dich an die Angabe des Herstellers, sie hängt von Wasserhärte und Verbrauch ab.']] },
  'bohnen-lagern': { s: [
    ['Wie lange halten Bohnen?', 'Ungeöffnet viele Monate. Nach dem Öffnen schmecken sie in den ersten Wochen am besten.'],
    ['Nur so viel in die Mühle, wie du brauchst', 'Im Bohnenbehälter stehen die Bohnen warm und im Licht. Fülle lieber öfter kleine Mengen nach.']],
    f: [['Kann ich Bohnen einfrieren?', 'Das geht in luftdichten Portionen. Für den Alltag ist kühl, trocken und gut verschlossen einfacher.']] },
  'erste-siebtraegermaschine': { s: [
    ['Siebträger oder Vollautomat?', 'Der Vollautomat ist bequem, der Siebträger macht den besseren Espresso und hält bei guter Pflege viele Jahre. Wer Freude am Zubereiten hat, wird mit dem Siebträger glücklicher.'],
    ['Was es am Anfang kostet', 'Rechne mit einer Maschine, einer Mühle und etwas Zubehör. Bei den Maschinensets ist das Wichtigste schon kombiniert.'],
    ['Die ersten Tage', 'Plane ein paar Bezüge zum Einstellen ein. Nach der Einschulung gelingt der Espresso meist schon am ersten Abend.']],
    f: [['Ist ein Siebträger kompliziert?', 'Nein. Nach der Einschulung sind es vier Handgriffe: mahlen, tampern, einspannen, beziehen.'], ['Welcher Kaffee für den Anfang?', 'Eine verzeihende, dunkle Barmischung. Der Kaffee-Finder schlägt dir eine vor.']] }
};
WU.GUIDES.forEach(function (g) {
  var x = WU.EXTRA[g.slug]; if (!x) return;
  g.sections = g.sections.concat(x.s); g.faq = x.f;
  g.min = Math.max(g.min, Math.round(g.sections.reduce(function (n, s) { return n + s[1].split(' ').length; }, 0) / 180) + 1);
});

/* ===== Struktur für die statische Seite: Kategorien, Querverweise, Röstereien-Beiträge, weitere Seiten ===== */
WU.FAQ = (WU.FAQ_SHOP || []).concat(WU.FAQ.filter(function (g) { return g[0] === '5+1 und Rabatte'; }));
WU.PAGES['kaffee-abo'] = { title: 'Kaffee-Abo', shop: 'kaffeeabonnement', intro: 'Dein Lieblingskaffee kommt automatisch, in dem Rhythmus, der zu dir passt.', blocks: [] };
WU.PAGES['eureka'] = { title: 'Kaffeemühlen von Eureka', shop: 'info-eureka', intro: 'Seit über zehn Jahren unsere Empfehlung für zu Hause.', blocks: [], img: 'ScrollingBoxes1.png' };
WU.PAGES['mazzer'] = { title: 'Kaffeemühlen von Mazzer', shop: 'info-mazzer', intro: 'Mühlen aus Venetien, gebaut für Jahrzehnte.', blocks: [] };
WU.PAGES['ueber-uns'].links = [['#/roestereien', 'Unsere sechs Röstereien'], ['#/seite/maschinenservice', 'Maschinenservice'], ['#/seite/einschulungen', 'Einschulungen'], ['#/seite/kontakt', 'Kontakt und Öffnungszeiten']];
WU.PAGES['einschulungen'].links = [['#/ratgeber/mahlgrad-einstellen', 'Mahlgrad einstellen'], ['#/ratgeber/milchschaum', 'Der perfekte Milchschaum'], ['#/maschinen', 'Espressomaschinen ansehen']];
WU.PAGES['maschinenservice'].links = [['#/ratgeber/reinigung-wartung', 'Reinigung und Wartung'], ['#/ratgeber/wasser', 'Das richtige Wasser'], ['#/seite/kontakt', 'Termin vereinbaren']];
WU.PAGES['gastro-buero'].links = [['#/maschinen', 'Maschinen und Mühlen'], ['#/5plus1', '5+1 Karton zusammenstellen'], ['#/seite/kontakt', 'Beratung anfragen']];
WU.PAGES['versand-rabatte'].links = [['#/5plus1', '5+1 Karton zusammenstellen'], ['#/seite/kaffee-abo', 'Kaffee-Abo'], ['#/faq', 'Fragen und Antworten']];
WU.PAGES['eureka'].links = [['#/ratgeber/kaffeemuehlen-im-vergleich', 'Kaffeemühlen im Vergleich'], ['#/maschinen', 'Alle Mühlen ansehen']];
WU.PAGES['mazzer'].links = [['#/ratgeber/kaffeemuehlen-im-vergleich', 'Kaffeemühlen im Vergleich'], ['#/p/mazzer-mini-g', 'Mazzer Mini g']];
(function () {
  function g(slug) { return WU.GUIDES.filter(function (x) { return x.slug === slug; })[0]; }
  /* Beiträge, die es im Shop-Blog gibt, bekommen dessen Adresse und Text (src = Handle im Shop-Blog) */
  var a = g('siebtraeger-typen'); a.slug = 'einkreiser-zweikreiser-dualboiler-hebelmaschinen'; a.src = 'einkreiser-zweikreiser-dualboiler-hebelmashinen'; a.iso = '2024-03-16'; a.date = '16. März 2024';
  a = g('reinigung-wartung'); a.src = 'reinigung-wartung-was-tun'; a.iso = '2024-03-16'; a.date = '16. März 2024';
  a = g('muehle-wichtiger'); a.slug = 'kaffeemuehlen-im-vergleich'; a.title = 'Kaffeemühlen im Vergleich: Warum die Mühle wichtiger ist als die Maschine'; a.src = 'muhlen-im-vergleich'; a.iso = '2024-03-16'; a.date = '16. März 2024';
  a = g('moka-kanne'); a.title = 'Espresso unterwegs: Warum die Moka-Kanne der perfekte Reisebegleiter ist'; a.src = 'espresso-unterwegs-warum-die-moka-kanne-der-perfekte-reisebegleiter-ist'; a.iso = '2025-07-17'; a.date = '17. Juli 2025';
  var CAT = { 'Maschinen und Mühlen': ['einkreiser-zweikreiser-dualboiler-hebelmaschinen', 'erste-siebtraegermaschine', 'kaffeemuehlen-im-vergleich', 'reinigung-wartung', 'wasser'],
    'Zubereitung': ['mahlgrad-einstellen', 'milchschaum', 'espresso-fehler', 'moka-kanne', 'bohnen-lagern'],
    'Kaffeewissen und Italien': ['arabica-robusta', 'bestellen-wie-in-italien'] };
  Object.keys(CAT).forEach(function (c) { CAT[c].forEach(function (s) { g(s).cat = c; }); });
  var REL = {
    'einkreiser-zweikreiser-dualboiler-hebelmaschinen': ['erste-siebtraegermaschine', 'kaffeemuehlen-im-vergleich', 'milchschaum'],
    'erste-siebtraegermaschine': ['einkreiser-zweikreiser-dualboiler-hebelmaschinen', 'kaffeemuehlen-im-vergleich', 'mahlgrad-einstellen'],
    'kaffeemuehlen-im-vergleich': ['mahlgrad-einstellen', 'espresso-fehler', 'erste-siebtraegermaschine'],
    'reinigung-wartung': ['wasser', 'espresso-fehler', 'einkreiser-zweikreiser-dualboiler-hebelmaschinen'],
    'wasser': ['reinigung-wartung', 'espresso-fehler'],
    'mahlgrad-einstellen': ['espresso-fehler', 'kaffeemuehlen-im-vergleich', 'arabica-robusta'],
    'milchschaum': ['einkreiser-zweikreiser-dualboiler-hebelmaschinen', 'arabica-robusta', 'bestellen-wie-in-italien'],
    'espresso-fehler': ['mahlgrad-einstellen', 'reinigung-wartung', 'bohnen-lagern'],
    'moka-kanne': ['bestellen-wie-in-italien', 'bohnen-lagern', 'arabica-robusta'],
    'bohnen-lagern': ['arabica-robusta', 'mahlgrad-einstellen'],
    'arabica-robusta': ['roesterei-guglielmo', 'roesterei-kremoso', 'bestellen-wie-in-italien'],
    'bestellen-wie-in-italien': ['roesterei-kremoso', 'roesterei-ionia', 'arabica-robusta']
  };
  Object.keys(REL).forEach(function (s) { g(s).rel = REL[s]; });
  /* Röstereien als eigene Beiträge */
  var SRC = { 'Guglielmo': 'info-guglielmo', 'Kremoso': 'info-kremoso', 'Ionia': 'die-roesterei-ionia', 'Trombetta': 'info-trombetta', 'La Messicana': 'info-lamessicana' };
  var names = Object.keys(WU.REGIONS);
  names.forEach(function (v, i) {
    var r = WU.REGIONS[v], cs = WU.coffees.filter(function (c) { return c.vendor === v; }), slug = 'roesterei-' + v.toLowerCase().replace(/\s+/g, '-');
    var strong = cs.slice().sort(function (x, y) { return y.intensity - x.intensity; })[0], mild = cs.slice().sort(function (x, y) { return x.intensity - y.intensity; })[0];
    var secs = [['Was ' + v + ' ausmacht', r.line + ' Bei uns gibt es ' + cs.length + ' Röstungen von ' + v + ' in der 1-kg-Packung, dazu je nach Sorte kleinere Packungen, gemahlenen Kaffee und Pads.']];
    if (strong && mild && strong !== mild) secs.push(['Von mild bis kräftig', 'Die kräftigste Röstung im Sortiment ist ' + strong.title + ' mit Intensität ' + strong.intensity + ' von 10 und ' + strong.arabica + ' % Arabica. Am mildesten ist ' + mild.title + ' mit Intensität ' + mild.intensity + ' von 10 und ' + mild.arabica + ' % Arabica.']);
    secs.push(['So probierst du ' + v, 'Im 5+1 Karton kannst du mehrere Röstungen von ' + v + ' mit anderen Röstereien mischen. Bezahlt werden fünf Kilo, das sechste ist gratis.']);
    WU.GUIDES.push({ slug: slug, cat: 'Röstereien', title: 'Die Rösterei ' + v + ' aus ' + r.region, teaser: r.mood + '. ' + r.line, min: 2, src: SRC[v], page: true,
      img: cs[0] ? cs[0].img : '', fit: true, sections: secs, related: cs.slice(0, 4).map(function (c) { return c.handle; }),
      rel: ['roesterei-' + names[(i + 1) % names.length].toLowerCase().replace(/\s+/g, '-'), 'arabica-robusta', 'bestellen-wie-in-italien'],
      faq: [['Woher kommt ' + v + '?', 'Aus ' + r.place + '.'], ['Welche Röstung von ' + v + ' ist die kräftigste?', strong ? strong.title + ' mit Intensität ' + strong.intensity + ' von 10.' : 'Das zeigt dir das Röstprofil auf jeder Produktseite.']] });
  });
})();

/* ===== Vertiefung der Ratgeber: zusätzliche Abschnitte mit Tabellen, Listen, Fotos und Querverweisen ===== */
(function () {
  function g(slug) { return WU.GUIDES.filter(function (x) { return x.slug === slug; })[0]; }
  function add(slug, more) { var x = g(slug); if (x) x.more = (x.more || []).concat(more); }
  function tbl(head, rows) { return '<div class="tbl"><table><thead><tr>' + head.map(function (h) { return '<th>' + h + '</th>'; }).join('') + '</tr></thead><tbody>' + rows.map(function (r) { return '<tr>' + r.map(function (c) { return '<td>' + c + '</td>'; }).join('') + '</tr>'; }).join('') + '</tbody></table></div>'; }
  function ul(items) { return '<ul class="facts">' + items.map(function (i) { return '<li>' + i + '</li>'; }).join('') + '</ul>'; }
  function ol(items) { return '<ol class="steps">' + items.map(function (i) { return '<li><span>' + i + '</span></li>'; }).join('') + '</ol>'; }

  (function () { var m = g('milchschaum'); m.sections = m.sections.filter(function (s) { return ['Welche Milch', 'Typische Fehler'].indexOf(s[0]) < 0; }); })();
  add('wasser', [
    ['Wasserhärte kurz erklärt', '<p>Für die Maschine zählen zwei Werte. Die Gesamthärte beschreibt, wie viel Kalzium und Magnesium im Wasser gelöst ist. Die Karbonathärte ist der Teil davon, der sich beim Erhitzen als Kalk absetzt. Genau dieser Teil lagert sich in Kessel, Wärmetauscher und Ventilen ab.</p><p>Angegeben wird die Härte in Grad deutscher Härte (°dH). Den Wert für deine Adresse nennt dir dein Wasserversorger. In Wien hängt er vom Bezirk ab, weil nicht jedes Gebiet aus derselben Leitung versorgt wird. Teststreifen aus der Drogerie reichen für eine grobe Einordnung.</p>' +
      tbl(['Gesamthärte', 'Einordnung', 'Was das für die Maschine heißt'], [['unter 4 °dH', 'sehr weich', 'Kaum Kalk, der Espresso kann aber flach und spitz schmecken'], ['4 bis 8 °dH', 'weich', 'Guter Bereich für Geschmack und Maschine'], ['8 bis 14 °dH', 'mittelhart', 'Filter im Tank oder gefiltertes Wasser verwenden'], ['über 14 °dH', 'hart', 'Ohne Filter verkalkt die Maschine schnell']])],
    ['Welches Wasser passt', ul(['<b>Gefiltertes Leitungswasser</b> ist für die meisten Haushalte die einfachste Lösung. Ein Tischfilter oder ein Filter im Wassertank senkt die Karbonathärte.', '<b>Stilles Mineralwasser</b> funktioniert, wenn es wenig Mineralien enthält. Der Wert steht auf dem Etikett.', '<b>Destilliertes Wasser</b> ist keine gute Idee. Ohne Mineralien schmeckt Espresso leer, und manche Füllstandssonden erkennen das Wasser nicht.', '<b>Festwasseranschluss</b>: Hier gehört ein passender Filter mit Wasseruhr davor. Das planen wir gern mit dir.'])],
    ['Filter richtig verwenden', '<p>Ein Filter arbeitet nur, solange seine Kapazität reicht. Tausche ihn nach der Literangabe des Herstellers und nicht erst, wenn der Espresso anders schmeckt. Notiere das Datum beim Einsetzen. Wer täglich mehrere Tassen bezieht und Milch schäumt, verbraucht deutlich mehr Wasser als gedacht, weil auch Spülen und Dampf dazuzählen.</p>'],
    ['Woran du Kalk erkennst', ul(['Die Maschine braucht länger zum Aufheizen.', 'Der Dampf wird schwächer oder kommt stoßweise.', 'Aus der Brühgruppe kommt weniger Wasser als früher.', 'Ventile tropfen nach oder schließen nicht mehr sauber.']) + '<p>Bei Zweikreisern und Dualboilern raten wir vom Entkalken auf eigene Faust ab. Gelöste Kalkstücke können Leitungen und Ventile verlegen. Das erledigt unser <a href="#/seite/maschinenservice">Maschinenservice</a> in der Werkstatt. Wie du die Maschine im Alltag pflegst, steht im Beitrag <a href="#/ratgeber/reinigung-wartung">Reinigung und Wartung</a>.</p>']
  ]);

  add('bohnen-lagern', [
    ['Was mit Kaffee nach der Röstung passiert', '<p>Frisch geröstete Bohnen geben über Wochen Kohlendioxid ab. Deshalb haben Kaffeebeutel ein kleines Ventil: Gas kann hinaus, Luft kommt nicht hinein. Gleichzeitig beginnt Sauerstoff, die Aromen und Öle abzubauen. Solange der Beutel verschlossen ist, läuft das langsam. Nach dem Öffnen geht es deutlich schneller.</p><p>Italienische Röstereien füllen ihre Bohnen unter Schutzatmosphäre ab. Ungeöffnet halten sie deshalb lange. Das Mindesthaltbarkeitsdatum steht auf jeder Packung.</p>'],
    ['So lange bleibt Kaffee gut', tbl(['Zustand', 'Richtwert', 'Tipp'], [['Ungeöffnet im Ventilbeutel', 'bis zum Mindesthaltbarkeitsdatum', 'Kühl und dunkel lagern'], ['Geöffnet, ganze Bohne', 'drei bis vier Wochen', 'Beutel flach drücken und dicht verschließen'], ['Im Bohnenbehälter der Mühle', 'wenige Tage', 'Nur den Bedarf für ein bis zwei Tage einfüllen'], ['Gemahlen', 'am besten sofort verwenden', 'Erst direkt vor dem Bezug mahlen']])],
    ['Der richtige Behälter', '<p>Am einfachsten bleibt der Kaffee im Originalbeutel, den du nach jeder Entnahme zudrückst und verschließt. Wer umfüllen will, nimmt eine lichtdichte, luftdichte Dose. Vakuumbehälter saugen zusätzlich die Luft ab. Glas sieht schön aus, gehört dann aber in den Schrank und nicht auf die Fensterbank.</p>'],
    ['Kann man Kaffee einfrieren?', '<p>Ja, wenn du es richtig machst. Friere ganze Bohnen in kleinen, luftdichten Portionen ein und taue jede Portion nur einmal auf. Lass den Beutel geschlossen, bis er Raumtemperatur hat, sonst bildet sich Kondenswasser auf den Bohnen. Für ein Kilo, das in einem Monat verbraucht ist, lohnt sich der Aufwand nicht.</p>'],
    ['Ein Kilo oder kleinere Packungen?', '<p>Als Faustregel: Ein doppelter Espresso braucht rund 16 Gramm. Ein Kilo reicht also für etwa 60 Doppelte. Trinkst du zwei am Tag, ist das Kilo in einem Monat leer und die 1-kg-Packung die richtige Wahl. Trinkst du seltener, bleiben 250 g oder 500 g frischer. Im <a href="#/5plus1">5+1 Karton</a> bleiben die übrigen Beutel verschlossen, bis du sie brauchst. Wenn der Espresso trotz frischer Bohnen nicht schmeckt, hilft der Beitrag <a href="#/ratgeber/espresso-fehler">Espresso zu sauer oder zu bitter</a>.</p>']
  ]);

  add('espresso-fehler', [
    ['Die Richtwerte für einen Espresso', '<p>Bevor du Fehler suchst, brauchst du einen Ausgangspunkt. Diese Werte sind keine Gesetze, aber ein guter Start für italienische Röstungen.</p>' + tbl(['Größe', 'Richtwert'], [['Kaffeemenge im Doppelsieb', '14 bis 18 g'], ['Menge in der Tasse', 'etwa das Doppelte der Kaffeemenge'], ['Bezugszeit', '25 bis 30 Sekunden'], ['Brühdruck', 'rund 9 bar'], ['Brühtemperatur', '90 bis 94 °C']]) + '<p>Eine Feinwaage und die Stoppuhr am Handy reichen, um das zu prüfen.</p>'],
    ['Fehlerbild und Lösung auf einen Blick', tbl(['Was du schmeckst oder siehst', 'Wahrscheinliche Ursache', 'Was du änderst'], [['Sauer, dünn, helle Crema', 'Zu wenig extrahiert', 'Feiner mahlen, etwas mehr Kaffee, Maschine länger aufheizen'], ['Bitter, verbrannt, dunkle fleckige Crema', 'Zu stark extrahiert', 'Gröber mahlen, Bezug früher stoppen'], ['Läuft in unter 15 Sekunden durch', 'Mahlgrad zu grob oder zu wenig Kaffee', 'Feiner mahlen, Dosis prüfen'], ['Tropft nur oder kommt gar nicht', 'Mahlgrad zu fein oder zu viel Kaffee', 'Gröber mahlen, Dosis senken'], ['Sauer und bitter zugleich', 'Wasser sucht sich Kanäle im Kaffeepuck', 'Gleichmäßig verteilen, gerade tampen'], ['Kaum Crema', 'Bohnen zu alt oder zu grob gemahlen', 'Frische Bohnen, feiner mahlen'], ['Schmeckt ranzig oder muffig', 'Alte Kaffeefette in der Brühgruppe', 'Brühgruppe und Siebe reinigen']])],
    ['Immer nur eine Sache ändern', '<p>Wer Mahlgrad, Menge und Temperatur gleichzeitig verstellt, weiß danach nicht, was geholfen hat. Halte die Kaffeemenge fest und arbeite zuerst nur mit dem Mahlgrad. Erst wenn die Bezugszeit passt, lohnt sich der Blick auf die Menge. Wie du dabei vorgehst, zeigt der Beitrag <a href="#/ratgeber/mahlgrad-einstellen">Mahlgrad einstellen</a>.</p>'],
    ['Wenn es an der Bohne liegt', '<p>Manche Röstungen schmecken von Natur aus kräftiger und herber, andere milder. Mischungen mit viel Robusta bringen mehr Körper und Bitterkeit mit, reine Arabicas mehr Säure. Das ist kein Fehler, sondern Stil. Den Unterschied erklärt der Beitrag <a href="#/ratgeber/arabica-robusta">Arabica und Robusta</a>. Auf jeder Produktseite findest du das Röstprofil mit Intensität, Säure und Bitterkeit. Der <a href="#/finder">Kaffee-Finder</a> schlägt dir eine passende Röstung vor.</p>'],
    ['Wenn es an der Maschine liegt', '<p>Bleibt der Espresso trotz allem bitter, prüfe die Sauberkeit: Duschsieb, Siebträger und Siebe sammeln Kaffeefett. Schwankt der Druck oder wird die Maschine nicht mehr richtig heiß, ist das ein Fall für die Werkstatt. Unser <a href="#/seite/maschinenservice">Maschinenservice</a> schaut sich das an.</p>']
  ]);

  add('erste-siebtraegermaschine', [
    ['Fünf Fragen vor dem Kauf', ol(['<b>Trinkst du vor allem Espresso oder oft Cappuccino?</b> Davon hängt ab, ob ein Einkreiser reicht oder ein Zweikreiser sinnvoll ist.', '<b>Wie viele Tassen hintereinander?</b> Für zwei Personen am Morgen reicht fast jede Maschine. Für Gäste und viel Milchschaum braucht es mehr Kesselleistung.', '<b>Wie viel Platz hast du?</b> Miss Breite, Tiefe und vor allem die Höhe unter dem Oberschrank. Die Mühle steht daneben.', '<b>Wie viel Zeit hast du am Morgen?</b> Klassische Maschinen mit schwerer Brühgruppe brauchen Zeit zum Aufheizen. Eine Zeitschaltuhr löst das.', '<b>Wie hoch ist das Budget für Maschine und Mühle zusammen?</b> Plane die Mühle von Anfang an mit ein.'])],
    ['Die Bauarten im Überblick', tbl(['Bauart', 'Passt, wenn du …', 'Bedenke'], [['Einkreiser', 'vor allem Espresso trinkst', 'Zwischen Bezug und Dampf musst du warten'], ['Zweikreiser', 'regelmäßig Milch schäumst', 'Größer und schwerer, vor dem Bezug kurz spülen'], ['Dualboiler', 'viel und genau arbeiten willst', 'Höherer Preis, mehr Technik'], ['Hebelmaschine', 'das Handwerk suchst', 'Braucht Übung und etwas Kraft']]) + '<p>Die Technik dahinter erklären wir im Beitrag <a href="#/ratgeber/einkreiser-zweikreiser-dualboiler-hebelmaschinen">Einkreiser, Zweikreiser, Dualboiler und Hebelmaschinen</a>.</p>[[p:quickmill-carola-evo]][[p:elba-quattro]]'],
    ['Die Mühle gehört dazu', '<p>Ein Siebträger verzeiht keinen ungleichmäßig gemahlenen Kaffee. Vorgemahlener Kaffee aus dem Supermarkt ist für Siebträger meist zu grob und nach dem Öffnen schnell schal. Rechne deshalb mit einer eigenen Espressomühle, die sich stufenlos oder in sehr feinen Schritten verstellen lässt. Mehr dazu im Beitrag <a href="#/ratgeber/kaffeemuehlen-im-vergleich">Kaffeemühlen im Vergleich</a>.</p>[[p:mazzer-mini-g]]'],
    ['Was du am ersten Tag brauchst', ul(['<b>Tamper</b> im passenden Durchmesser für dein Sieb', '<b>Abschlagbehälter</b> für den Kaffeepuck', '<b>Feinwaage</b> mit 0,1 g Auflösung', '<b>Milchkännchen</b>, wenn du Cappuccino trinkst', '<b>Blindsieb und Reiniger</b> für die Pflege der Brühgruppe', '<b>Frische Bohnen</b>, am besten zwei verschiedene zum Vergleichen'])],
    ['Typische Anfängerfehler', ul(['Zu früh beziehen: Die Maschine ist erst bereit, wenn auch Brühgruppe und Siebträger heiß sind.', 'Am Tamperdruck verzweifeln: Wichtiger als die Kraft ist, dass du gerade und jedes Mal gleich tampst.', 'Zu viel auf einmal ändern: erst der Mahlgrad, dann die Menge.', 'Die Reinigung aufschieben: Fünf Minuten in der Woche ersparen später die Reparatur.']) + '<p>Bei uns bekommst du zu jeder Maschine eine <a href="#/seite/einschulungen">Einschulung</a>. Danach sitzt der erste Espresso. Wenn du noch unsicher bist, welche Maschine passt, hilft der <a href="#/maschinen-finder">Maschinen-Finder</a>.</p>']
  ]);

  add('erste-siebtraegermaschine', [
    ['Siebträgermaschine vor dem Kauf testen', '<p>Eine Kaffeemaschine mit Siebträger kauft man am besten nicht nur nach Datenblatt. In unserem Geschäft in Wien kannst du alle Maschinen ausprobieren und uns alle Fragen stellen: Wie laut ist die Pumpe, wie liegt der Siebträger in der Hand, wie viel Dampf kommt aus der Lanze. Bring gern deine Lieblingsbohnen mit oder verkoste unsere Röstungen an der Bar. Wer nicht nach Wien kommen kann, ruft an. Wir beraten auch am Telefon.</p><p>Adresse und Öffnungszeiten stehen auf der Seite <a href="#/seite/kontakt">Kontakt</a>. Alle Modelle findest du unter <a href="#/maschinen">Siebträgermaschinen und Espressomaschinen</a>.</p>']
  ]);
  (function () { var x = g('erste-siebtraegermaschine'); x.title = 'Die erste Siebträgermaschine: Kaufberatung für Einsteiger'; x = g('roesterei-guglielmo'); if (x) x.title = 'Guglielmo Kaffee: die Rösterei aus Kalabrien'; })();
  add('milchschaum', [
    ['Warum Milch überhaupt schäumt', '<p>Der Dampf bringt Luft in die Milch. Die Eiweiße der Milch legen sich um die Luftbläschen und halten sie fest. Das Fett sorgt für Geschmack und das cremige Gefühl im Mund. Deshalb funktioniert kalte Vollmilch mit rund 3,5 Prozent Fett am zuverlässigsten. Wird die Milch zu heiß, verändern sich die Eiweiße, der Schaum fällt zusammen und schmeckt gekocht.</p>'],
    ['Schritt für Schritt', ol(['Fülle das Kännchen bis knapp unter den Ansatz der Tülle mit kalter Milch.', 'Lass kurz Dampf ab, damit kein Kondenswasser in die Milch kommt.', 'Tauche die Düse knapp unter die Oberfläche, leicht außerhalb der Mitte, und öffne den Dampf ganz.', '<b>Ziehphase:</b> Du hörst ein leises Zischen. Die Milch nimmt Luft auf und wird mehr. Das dauert nur wenige Sekunden, bis das Kännchen handwarm ist.', '<b>Rollphase:</b> Tauche die Düse etwas tiefer. Die Milch dreht sich im Kännchen und die Bläschen werden fein.', 'Schließe den Dampf, wenn du das Kännchen kaum noch halten kannst. Das sind etwa 60 bis 65 °C.', 'Wische die Lanze sofort ab und lass noch einmal kurz Dampf durch.', 'Klopfe das Kännchen einmal auf und schwenke es, bis die Milch glänzt. Dann gleich eingießen.'])],
    ['Welche Milch für welchen Schaum', tbl(['Milch', 'Schaum', 'Geschmack'], [['Vollmilch 3,5 %', 'fein und stabil', 'voll und süßlich'], ['Fettarme Milch 1,5 %', 'fest, etwas trockener', 'leichter'], ['Laktosefreie Milch', 'gut schäumbar', 'etwas süßer'], ['Haferdrink Barista', 'cremig', 'getreidig, mild'], ['Sojadrink Barista', 'stabil', 'nussig, kann bei viel Säure ausflocken']]) + '<p>Bei Pflanzendrinks lohnt sich die Barista-Variante. Sie ist auf das Schäumen abgestimmt.</p>'],
    ['Häufige Fehler', tbl(['Problem', 'Ursache', 'Lösung'], [['Große Blasen', 'Zu lange oder zu spät Luft gezogen', 'Nur am Anfang ziehen, dann rollen lassen'], ['Schaum trennt sich von der Milch', 'Zu lange stehen gelassen', 'Sofort schwenken und eingießen'], ['Schmeckt verbrannt', 'Über 70 °C erhitzt', 'Früher stoppen'], ['Lautes Kreischen', 'Düse zu tief, keine Luft', 'Am Anfang näher an die Oberfläche']])],
    ['Cappuccino, Latte Macchiato, Flat White', '<p>Der Unterschied liegt im Verhältnis. Ein Cappuccino ist ein Espresso mit etwa gleich viel Milch und Schaum in einer Tasse von rund 150 ml. Ein Latte Macchiato hat viel mehr Milch, der Espresso kommt zum Schluss ins Glas. Ein Flat White ist ein doppelter Espresso mit wenig, sehr feinem Schaum. Wie man das alles in Italien bestellt, steht im Beitrag <a href="#/ratgeber/bestellen-wie-in-italien">Bestellen wie in Italien</a>.</p><p>Für Milchgetränke passen kräftige Röstungen besonders gut, weil sie sich gegen die Milch durchsetzen. Der <a href="#/finder">Kaffee-Finder</a> berücksichtigt das.</p>']
  ]);

  add('mahlgrad-einstellen', [
    ['In sechs Schritten zum richtigen Mahlgrad', ol(['Lass Maschine, Brühgruppe und Siebträger vollständig aufheizen.', 'Lege die Kaffeemenge fest, zum Beispiel 16 g im Doppelsieb, und wiege sie jedes Mal.', 'Verteile den Kaffee gleichmäßig und tampe gerade.', 'Starte den Bezug und stoppe die Zeit ab dem Einschalten der Pumpe.', 'Wiege die Menge in der Tasse. Ziel: rund 32 g in 25 bis 30 Sekunden.', 'Zu schnell? Feiner mahlen. Zu langsam? Gröber mahlen. Dann wiederholen.']) + '<p>Verstelle die Mühle in kleinen Schritten. Viele Mühlen stellt man am besten bei laufendem Mahlwerk feiner, damit keine Bohnen zwischen den Scheiben klemmen. Nach jedem Verstellen kommt zuerst noch Kaffee mit der alten Einstellung aus der Mühle. Mahle deshalb ein paar Gramm durch, bevor du den nächsten Bezug bewertest.</p>'],
    ['Was die Bezugszeit dir sagt', tbl(['Bezugszeit für einen Doppelten', 'Geschmack', 'Änderung'], [['unter 20 Sekunden', 'sauer, wässrig', 'feiner mahlen'], ['25 bis 30 Sekunden', 'ausgewogen', 'so lassen'], ['über 35 Sekunden', 'bitter, herb', 'gröber mahlen']])],
    ['Was den Mahlgrad verschiebt', ul(['<b>Röstgrad:</b> Dunkle Röstungen sind spröder und brauchen meist einen etwas gröberen Mahlgrad als helle.', '<b>Alter der Bohnen:</b> Je länger der Beutel offen ist, desto schneller läuft der Espresso. Dann stellst du nach und nach feiner.', '<b>Luftfeuchtigkeit:</b> An feuchten Tagen läuft der Bezug oft langsamer.', '<b>Neue Sorte:</b> Jede Röstung braucht ihre eigene Einstellung. Rechne beim Wechsel mit zwei bis drei Probebezügen.', '<b>Kaffeemenge:</b> Ein Gramm mehr im Sieb bremst den Bezug spürbar.'])],
    ['Andere Zubereitungen', tbl(['Zubereitung', 'Mahlgrad'], [['Siebträger', 'sehr fein, wie Staubzucker mit leichtem Griff'], ['Moka-Kanne', 'fein bis mittel, etwas gröber als Espresso'], ['Filterkaffee', 'mittel, wie grober Sand'], ['French Press', 'grob']]) + '<p>Für die Moka-Kanne gibt es bei uns fertig gemahlenen Kaffee. Mehr dazu im Beitrag zur <a href="#/ratgeber/moka-kanne">Moka-Kanne</a>. Schmeckt der Espresso trotz passender Zeit nicht, hilft die Übersicht <a href="#/ratgeber/espresso-fehler">Espresso zu sauer oder zu bitter</a>. Und wenn die Mühle an ihre Grenzen kommt: <a href="#/ratgeber/kaffeemuehlen-im-vergleich">Kaffeemühlen im Vergleich</a>.</p>']
  ]);

  add('arabica-robusta', [
    ['Die zwei Arten im Vergleich', tbl(['', 'Arabica', 'Robusta'], [['Botanischer Name', 'Coffea arabica', 'Coffea canephora'], ['Anbau', 'höhere, kühlere Lagen', 'tiefere, wärmere Lagen'], ['Koffein', 'rund 1,2 %', 'rund 2,2 %, also fast doppelt so viel'], ['Geschmack', 'feiner, fruchtiger, mehr Säure', 'kräftig, nussig, schokoladig, wenig Säure'], ['Crema', 'heller und dünner', 'dichter und beständiger'], ['Körper', 'leichter', 'voller']])],
    ['Warum süditalienischer Espresso Robusta braucht', '<p>Der Espresso, den man aus Neapel, Kalabrien oder Sizilien kennt, ist dunkel geröstet, hat kaum Säure, eine dicke Crema und einen langen, schokoladigen Nachgeschmack. Das gelingt mit einem ordentlichen Anteil Robusta. Im Norden Italiens sind die Mischungen traditionell heller und haben mehr Arabica. Keine der beiden Richtungen ist besser. Es ist eine Frage des Geschmacks und der Zubereitung.</p><p>Unsere Röstereien kommen aus beiden Welten. Mehr dazu auf der Seite <a href="#/roestereien">Unsere Röstereien</a>.</p>'],
    ['Welche Mischung wofür', tbl(['Du trinkst …', 'Greif zu …'], [['Espresso pur, kräftig wie an der Bar in Neapel', 'Mischungen mit viel Robusta'], ['Cappuccino und Latte Macchiato', 'kräftigen Mischungen, die sich gegen Milch durchsetzen'], ['Espresso pur, mild und aromatisch', 'Mischungen mit hohem Arabica-Anteil oder 100 % Arabica'], ['Kaffee am Abend', 'entkoffeinierten Röstungen']]) + '<p>Auf jeder Produktseite steht der Arabica-Anteil neben Röstgrad, Intensität, Säure und Bitterkeit. So kannst du Röstungen direkt vergleichen.</p>'],
    ['Drei verbreitete Irrtümer', ul(['<b>„Robusta ist minderwertig.“</b> Guter Robusta ist sauber verarbeitet und gibt dem Espresso Körper und Crema. Schlechter Kaffee kann aus beiden Arten kommen.', '<b>„Dunkel geröstet heißt mehr Koffein.“</b> Der Koffeingehalt hängt vor allem von der Art ab, kaum vom Röstgrad.', '<b>„100 % Arabica ist immer die bessere Wahl.“</b> Für einen klassischen süditalienischen Espresso ist eine Mischung oft stimmiger.'])],
    ['Am besten selbst vergleichen', '<p>Den Unterschied schmeckst du am schnellsten nebeneinander. Im <a href="#/5plus1">5+1 Karton</a> stellst du dir sechs verschiedene Kilo zusammen, zum Beispiel von mild bis kräftig. Beim Wechsel der Sorte musst du den Mahlgrad anpassen. Wie das geht, steht im Beitrag <a href="#/ratgeber/mahlgrad-einstellen">Mahlgrad einstellen</a>.</p>']
  ]);

  add('bestellen-wie-in-italien', [
    ['Das kleine Wörterbuch für die Bar', tbl(['Du sagst', 'Du bekommst'], [['Un caffè', 'einen Espresso. Das Wort Espresso verwendet in Italien kaum jemand'], ['Un caffè ristretto', 'einen kürzeren, noch konzentrierteren Espresso'], ['Un caffè lungo', 'einen Espresso mit mehr Wasser durch den Kaffee'], ['Un caffè doppio', 'einen doppelten Espresso'], ['Un caffè macchiato', 'einen Espresso mit einem Löffel Milchschaum'], ['Un cappuccino', 'Espresso mit Milch und Schaum, in Italien ein Frühstücksgetränk'], ['Un latte macchiato', 'ein Glas heiße Milch mit einem Espresso'], ['Un caffè corretto', 'einen Espresso mit einem Schuss Grappa oder Sambuca'], ['Un caffè shakerato', 'Espresso mit Eis und Zucker geschüttelt, im Sommer'], ['Un caffè decaffeinato', 'einen entkoffeinierten Espresso']]) + '<p>Wichtig: Wer nur „un latte“ bestellt, bekommt ein Glas Milch.</p>'],
    ['So läuft es an der Bar', ul(['<b>Al banco:</b> Italiener trinken ihren Caffè im Stehen an der Theke. Das dauert zwei Minuten und kostet am wenigsten.', '<b>Al tavolo:</b> Am Tisch mit Bedienung zahlst du mehr, an bekannten Plätzen deutlich mehr.', '<b>Erst zahlen, dann bestellen:</b> In vielen Bars holst du zuerst an der Kassa den Bon und gibst ihn an der Theke ab.', '<b>Das Glas Wasser:</b> Im Süden bekommst du oft ein kleines Glas Wasser dazu. Man trinkt es vor dem Caffè.', '<b>Cappuccino nach dem Essen:</b> Bekommst du natürlich. Italiener trinken ihn aber nur am Vormittag.'])],
    ['Warum der Caffè im Süden anders schmeckt', '<p>Je weiter südlich, desto dunkler die Röstung und desto kürzer der Espresso. In Neapel kommt er heiß, dicht und fast sirupartig in einer vorgewärmten Tasse. Zucker gehört für viele dazu. Dort gibt es auch den Brauch des Caffè sospeso: Man bezahlt zwei Caffè, trinkt einen und lässt den zweiten für jemanden, der ihn sich nicht leisten kann.</p><p>Genau diesen Stil rösten unsere Partner in Süditalien. Welche Rösterei woher kommt, zeigt die Seite <a href="#/roestereien">Unsere Röstereien</a>.</p>'],
    ['Das Urlaubsgefühl zu Hause', ul(['Wärme die Tasse vor. Eine kalte Tasse nimmt dem Espresso sofort die Hitze.', 'Nimm eine dickwandige, kleine Tasse.', 'Wähle eine dunkle Röstung mit wenig Säure. Der Unterschied zwischen den Bohnen steht im Beitrag <a href="#/ratgeber/arabica-robusta">Arabica und Robusta</a>.', 'Für Milchgetränke: <a href="#/ratgeber/milchschaum">Der perfekte Milchschaum</a>.', 'Ohne Siebträger geht es mit der <a href="#/ratgeber/moka-kanne">Moka-Kanne</a>, wie in fast jedem italienischen Haushalt.'])]
  ]);

  add('reinigung-wartung', [
    ['Der Pflegeplan auf einen Blick', tbl(['Wann', 'Was'], [['Nach jedem Bezug', 'Siebträger ausklopfen und abspülen, Brühgruppe kurz durchspülen, Dampflanze abwischen und ausblasen'], ['Täglich', 'Abtropfschale leeren, Wassertank frisch füllen, Siebträger und Sieb mit heißem Wasser reinigen'], ['Wöchentlich', 'Brühgruppe mit Blindsieb und Reiniger rückspülen, Duschsieb abbürsten, Siebträger und Siebe in Reinigerlösung einlegen'], ['Monatlich', 'Mühle ausbürsten oder mit Mühlenreiniger durchmahlen, Wasserfilter prüfen'], ['Jährlich', 'Dichtung der Brühgruppe und Duschsieb prüfen und bei Bedarf tauschen, Service in der Werkstatt'] ]) + '<p>Rückspülen funktioniert nur bei Maschinen mit Magnetventil oder klassischer E61-Brühgruppe. Hebelmaschinen werden nicht rückgespült. Wenn du unsicher bist, frag uns.</p>'],
    ['Woran du merkst, dass es Zeit für die Werkstatt ist', ul(['Der Siebträger lässt sich immer weiter nach rechts drehen oder es tropft am Rand vorbei. Dann ist die Dichtung hart geworden.', 'Der Druck am Manometer schwankt oder erreicht den gewohnten Wert nicht.', 'Die Maschine verliert Wasser, zischt oder braucht viel länger zum Aufheizen.', 'Die Pumpe wird deutlich lauter.']) + '<p>Der häufigste Grund für Reparaturen ist Kalk. Wie du ihn vermeidest, steht im Beitrag <a href="#/ratgeber/wasser">Das richtige Wasser für deine Espressomaschine</a>. Unser <a href="#/seite/maschinenservice">Maschinenservice</a> wartet und repariert Maschinen in der eigenen Werkstatt in Wien.</p>']
  ]);

  add('moka-kanne', [
    ['Kurzanleitung für die Moka-Kanne', ol(['Fülle den unteren Teil bis knapp unter das Ventil mit Wasser. Heißes Wasser verkürzt die Zeit am Herd.', 'Fülle den Trichter locker mit Kaffee und streiche ihn glatt. Nicht andrücken.', 'Schraube die Kanne fest zu und stelle sie auf kleine bis mittlere Hitze.', 'Nimm sie vom Herd, sobald der Kaffee heller wird und die Kanne zu blubbern beginnt.', 'Rühre den Kaffee in der Kanne einmal um und gieße gleich ein.']) + '<p>Der passende Mahlgrad ist etwas gröber als für den Siebträger. Bei uns gibt es Kaffee, der fertig für die Moka gemahlen ist. Wer selbst mahlt, findet die Richtwerte im Beitrag <a href="#/ratgeber/mahlgrad-einstellen">Mahlgrad einstellen</a>.</p>']
  ]);

  add('kaffeemuehlen-im-vergleich', [
    ['Worauf du beim Kauf achtest', tbl(['Merkmal', 'Warum es zählt'], [['Stufenlose Verstellung', 'Beim Espresso entscheiden kleinste Schritte über die Bezugszeit'], ['Größe der Mahlscheiben', 'Größere Scheiben mahlen schneller und erwärmen den Kaffee weniger'], ['Mahlen auf Knopfdruck', 'Der Kaffee wird frisch direkt in den Siebträger gemahlen'], ['Totraum', 'Je weniger Kaffee in der Mühle zurückbleibt, desto frischer ist der nächste Bezug'], ['Lautstärke', 'Am frühen Morgen ein echtes Argument']]) + '[[p:mazzer-mini-g]]<p>Die passende Einstellung findest du mit dem Beitrag <a href="#/ratgeber/mahlgrad-einstellen">Mahlgrad einstellen</a>. Mehr zu den Marken: <a href="#/seite/eureka">Eureka</a> und <a href="#/seite/mazzer">Mazzer</a>.</p>']
  ]);

  add('einkreiser-zweikreiser-dualboiler-hebelmaschinen', [
    ['Die vier Bauarten im direkten Vergleich', tbl(['', 'Einkreiser', 'Zweikreiser', 'Dualboiler', 'Hebelmaschine'], [['Espresso und Dampf gleichzeitig', 'nein', 'ja', 'ja', 'je nach Modell'], ['Temperatur', 'ein Kessel für beides', 'Brühwasser über Wärmetauscher', 'eigener Kessel für Brühwasser', 'über die Brühgruppe'], ['Passt für', 'Espresso, gelegentlich Milch', 'täglich Cappuccino', 'viele Bezüge, genaue Kontrolle', 'Handwerk und Ruhe'], ['Platzbedarf', 'klein', 'mittel', 'mittel bis groß', 'mittel, nach oben Platz für den Hebel']]) + '[[p:969-coffee-elba-mini-lux]][[p:lamarzocco-linea-mini-r]][[p:la-san-marco-20-20-leva]]<p>Wenn du gerade deine erste Maschine suchst, lies weiter im Beitrag <a href="#/ratgeber/erste-siebtraegermaschine">Die erste Siebträgermaschine</a> oder starte den <a href="#/maschinen-finder">Maschinen-Finder</a>.</p>']
  ]);

  /* Röstereien: alle Röstungen als Vergleichstabelle */
  Object.keys(WU.REGIONS).forEach(function (v) {
    var x = g('roesterei-' + v.toLowerCase().replace(/\s+/g, '-')), cs = WU.coffees.filter(function (c) { return c.vendor === v; }); if (!x || !cs.length) return;
    x.more = [['Alle Röstungen von ' + v + ' im Vergleich', tbl(['Röstung', 'Röstgrad', 'Intensität', 'Arabica', 'Aromen'], cs.map(function (c) { return ['<a href="#/p/' + c.handle + '">' + c.title + '</a>', c.roast, c.intensity + ' von 10', c.arabica + ' %', c.aromas.join(', ')]; })) +
      '<p>Die Werte stammen aus dem Röstprofil jeder Sorte. Was Arabica-Anteil und Röstgrad für den Geschmack bedeuten, erklärt der Beitrag <a href="#/ratgeber/arabica-robusta">Arabica und Robusta</a>. Alle sechs Häuser findest du auf der Seite <a href="#/roestereien">Unsere Röstereien</a>.</p>' + cs.slice(0, 2).map(function (c) { return '[[p:' + c.handle + ']]'; }).join('')]];
  });
})();

/* ===== Aus dem Shop übernommene Zusatzseiten, Richtlinien und Beiträge (kommen aus dem Build) ===== */
Object.keys(WU.XP || {}).forEach(function (k) { if (!WU.PAGES[k]) WU.PAGES[k] = { title: WU.XP[k].title, shop: WU.XP[k].shop, intro: '', blocks: [], policy: WU.XP[k].policy }; });
(WU.XG || []).forEach(function (g) { if (!WU.GUIDES.some(function (x) { return x.slug === g.slug; })) WU.GUIDES.push({ slug: g.slug, cat: 'Aus dem Geschäft', title: g.title, teaser: g.teaser, min: 3, img: 'ScrollingBoxes1.png', sections: [], related: [], rel: ['bestellen-wie-in-italien', 'erste-siebtraegermaschine'], faq: [], iso: '2024-03-16', date: '16. März 2024' }); });
