# Szene: So entsteht Geld

Sechs Sekunden Erklaerformat, hochkant 9:16, 1080 x 1920, 30 Bilder je Sekunde,
ohne Ton. Gebaut mit Remotion.

Das fertige Video liegt unter `out/video.mp4`.

## Was zu sehen ist

Auf dunklem Grund steht links ein Gebaeude aus Grundformen: Giebeldreieck,
waagerechter Balken, fuenf Saeulen, zwei Stufen. Rechts daneben eine Figur aus
Kopf, Hals, Rumpf, zwei Armen und zwei Beinen. Zwischen Sekunde 1 und 3 hebt die
Figur ihren rechten Arm, weich anfahrend und auslaufend. Ab Sekunde 3,5 steht
darunter die Zeile "So entsteht Geld.", ab Sekunde 4 zaehlt ueber dem Gebaeude
eine Zahl von 0 auf 100 und wird dabei langsamer.

## Masse

Einzige Grundgroesse ist die Kopfhoehe K = 150 Bildpunkte. Alle uebrigen Masse
leiten sich daraus ab und stehen in `src/mass.ts`:

- Gesamthoehe der Figur 6,5 K = Kopf 1,0 + Hals 0,3 + Rumpf 2,2 + Beine 3,0
- Oberarm 1,25 K, Unterarm 1,05 K
- Armwinkel: 0 Grad waagerecht, positive Werte nach unten, Drehpunkt Schulter;
  der gehobene Arm laeuft von 72 Grad auf minus 55 Grad

## Schrift

Inter, SIL Open Font License 1.1. Die Schriftdateien liegen unter
`public/fonts/` und werden in `src/schrift.ts` an genau einer Stelle
festgelegt. Beide Textelemente der Szene benutzen diese eine Festlegung.
Beim Rendern wird kein Netz gebraucht.

## Rendern

    npm install
    npm run render

Remotion laedt beim ersten Lauf eine eigene Chromium-Kopie herunter. Ist das
nicht moeglich, kann ein vorhandener Browser mitgegeben werden:

    npx remotion render src/index.ts Szene out/video.mp4 \
      --browser-executable=/pfad/zu/chromium

## Protokoll

`PROTOKOLL.md` haelt den Arbeitsverlauf fest: Schritte mit Uhrzeit, Fehler und
zweite Anlaeufe, eigene Entscheidungen, Dauern und Verbrauch.
