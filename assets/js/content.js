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
