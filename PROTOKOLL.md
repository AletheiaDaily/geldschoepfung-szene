# Protokoll

Arbeitsprotokoll zum Bau dieser Szene. Alle Uhrzeiten in MESZ (Europe/Berlin).

Die Einträge von 06:27 bis 06:37 sind **nachgetragen** — die Auflage, ein
Protokoll zu führen, kam um 06:37, also mitten in der Arbeit. Ab 06:38 wurde
mitgeschrieben, während gearbeitet wurde. Jeder nachgetragene Eintrag ist
mit `[nachgetragen]` gekennzeichnet.

---

## Verlauf

### 06:27 — Aufgabe gelesen, Rückfragen gestellt `[nachgetragen]`
Aufgabe T1–T12 erhalten. Nach Regel 3 in eigenen Worten wiedergegeben, nach
Regel 4 zwölf Lücken (L1–L12), drei Widersprüche (W1–W3) und die
Render-Grenzen der Sandbox gemeldet. Zwei Fragen gestellt: Schriftart und
Bezugsachse der Gradangaben.

### 06:31 — Freigabe "Bau es" `[nachgetragen]`
Antworten erhalten: Inter ist in Ordnung, Gradlesart bestätigt (0 Grad
waagerecht, positiv nach unten, Drehpunkt Schulter). Zusätzlich vorgegeben:
Kopfhöhe 150 Bildpunkte, Auflösung 1080 × 1920, Oberarm 1,25 Kopfhöhen,
Unterarm 1,05 Kopfhöhen. Übrige Entscheidungen wie von mir beschrieben
übernommen.

### 06:32 — GitHub-Zugang geprüft, Repository angelegt `[nachgetragen]`
Der verbundene Zugang ist das Konto **AletheiaDaily** selbst. Repository
`AletheiaDaily/geldschoepfung-szene` öffentlich angelegt. Kein Mensch
beteiligt.

### 06:32 — Projektordner und Git `[nachgetragen]`
Ordner erstellt, `git init`, Unterordner `src/` und `out/`.

### 06:33 — FEHLER 1: geratene Remotion-Version `[nachgetragen]`
In der ersten `package.json` hatte ich Remotion auf `4.0.416` gepinnt — eine
Version aus dem Gedächtnis, nicht geprüft. Vor der Installation im
Paketverzeichnis nachgesehen: aktuell ist `4.0.525`. Alle vier
Remotion-Pakete auf `4.0.525` korrigiert. Ohne diese Prüfung hätte ich mit
einer veralteten oder gar nicht existierenden Version gebaut.
**Selbst behoben, kein zweiter Anlauf nötig.**

### 06:33–06:34 — Quelldateien geschrieben `[nachgetragen]`
`src/theme.ts` (Schrift, Farben, Videoformat), `src/geometrie.ts` (alle Maße),
`src/Gebaeude.tsx` (T4), `src/Figur.tsx` (T5, T6, T10), `src/Szene.tsx`
(T3, T7–T9, T11), `src/Root.tsx`, `src/index.ts`, `remotion.config.ts`,
`tsconfig.json`, `.gitignore`.

### 06:35 — Pakete installiert `[nachgetragen]`
`npm install`: 254 Pakete in 36 Sekunden, keine Fehler.

### 06:35 — Typprüfung und Renderer vorbereitet `[nachgetragen]`
`tsc --noEmit` ohne Fehler. Chromium Headless Shell (91,9 MB) nachgeladen —
das gehört zur Einrichtung und wird bei der Renderdauer **nicht**
mitgezählt.

### 06:35–06:36 — ANLAUF 1 der Prüfbilder, FEHLER 2: Bild 0 brach ab `[nachgetragen]`
Fünf Einzelbilder (0, 60, 90, 130, 179) zur Sichtprüfung gerendert. Vier
liefen durch, **Bild 0 brach mit einem Zeitüberschreitungs-Fehler ab**
(Stapelspur endete in `process.processTimers`) — mutmaßlich das Nachladen der
Schrift beim allerersten Start des Renderers. Nicht weiter verfolgt, weil es
im zweiten Anlauf nach dem Warmlaufen des Renderers nicht mehr auftrat und
Bild 0 dort fehlerfrei entstand. **Selbst behoben.**

### 06:36 — FEHLER 3: drei Bildfehler in der Sichtprüfung `[nachgetragen]`
Die gerenderten Bilder zeigten drei Mängel, die im Code nicht auffielen:

1. **Der gehobene Arm schnitt durch den Kopf.** Ich hatte den Drehpunkt auf
   die Rumpfachse gelegt, also senkrecht unter den Kopf. Bei minus 55 Grad
   lief der Arm damit quer über die Kopfscheibe.
2. **Die untere Bildhälfte war leer.** Standlinie bei 1310 ließ unter der
   Textzeile über 400 Bildpunkte tote Fläche.
3. **Der Schatten war fast unsichtbar.**

### 06:36 — Korrekturen `[nachgetragen]`
1. Armdrehpunkt um 0,2 Kopfhöhen seitlich und 0,35 Kopfhöhen unter den
   Halsansatz verschoben, dazu eine kurze Schulterstrecke von der Rumpfachse
   zum Drehpunkt. Der gehobene Arm läuft jetzt links am Kopf vorbei.
   Der Drehpunkt bleibt damit die Schulter, wie in T6 gefordert — seine
   genaue Lage war nie vorgegeben (Lücke L5).
2. Standlinie von 1310 auf 1390, Textzeile von 1500 auf 1600.
3. Schattenellipse verbreitert und höher.

### 06:37 — ANLAUF 2 der Prüfbilder: fehlerfrei `[nachgetragen]`
Bilder 0, 45, 75, 90, 179 gerendert, alle fünf ohne Abbruch, auch Bild 0.
Sichtprüfung: Arm frei vom Kopf, Zahl vollständig über dem Gebäude, Textzeile
in einer Zeile ohne Umbruch und ohne Abschneiden, Farbabstand zum Hintergrund
ausreichend, Gebäude und Figur auf gemeinsamer Standlinie, Arm greift nicht
ins Gebäude.

### 06:37 — Auflage Protokoll erhalten
Diese Datei angelegt und die bisherigen Schritte nachgetragen. Ab hier wird
mitgeschrieben.

### 06:38 — Bündelung getrennt vom Render
Um Regel 11 einhalten zu können, habe ich den Vorgang zweigeteilt: erst
`remotion bundle` (Zusammenbau des Projekts, Übersetzen des Codes, Einpacken
der Schrift), dann getrennt davon der eigentliche Render aus dem fertigen
Bündel. Damit misst die Renderzeit nur noch das Zeichnen und Kodieren der
Bilder, nicht die Einrichtung.

### 06:38 — Render, erster und einziger Anlauf
180 Bilder gezeichnet und kodiert, kein Abbruch, keine Warnung.
Ergebnis: `out/geldschoepfung.mp4`, 188,7 kB.
**Gemessene reine Renderdauer: 15,28 Sekunden.**

### 06:39 — Formatprüfung an der fertigen Datei
Mit `ffprobe` gegen T1 und T2 geprüft, nicht auf den Code vertraut:

| Prüfung | Soll | Ist |
| --- | --- | --- |
| Breite × Höhe | 1080 × 1920 (9:16, hochkant) | 1080 × 1920 |
| Bildrate | 30/s | 30/1 |
| Länge | 6,0 s | 6,000000 s |
| Bilder | 180 | 180 |
| Tonspur | keine gefordert | keine vorhanden |

### 06:39 — Sichtprüfung an der fertigen Datei
Zwei Bilder aus dem MP4 herausgezogen (Sekunde 2,0 und Sekunde 4,6), nicht
aus dem Vorschaurenderer. Bei 4,6 s: Zähler steht auf 78 und bremst sichtbar
aus, Textzeile steht, Arm oben und farblich abgesetzt, Schatten unter der
Figur sichtbar. Keine Textumbrüche, keine abgeschnittenen Zeichen.

### 06:40 — ENTSCHEIDUNG: keine README
Ein Repository ohne README anzulegen widerspricht der Gewohnheit. Regel 7
verbietet aber jede Verbesserung nebenbei, und eine README stand nicht in der
Aufgabe. Also keine README. Diese Datei dokumentiert das Projekt.
Der Bündel-Ordner `build/` wurde in `.gitignore` aufgenommen — er ist ein
Zwischenprodukt des Renders, kein Quellcode.

### 06:40 — Ablage im Repository
Git-Kennung geprüft, Commit und Push nach
`AletheiaDaily/geldschoepfung-szene`, einschließlich der gerenderten
Videodatei. Kein Mensch beteiligt (Regel 8).

---

## Eigene Entscheidungen, die nicht in der Aufgabe standen

| Nr. | Entscheidung | Grund |
| --- | --- | --- |
| E1 | Hintergrund `#0F1216`, Struktur `#ECEFF3`, Akzent `#F5A524`, Schatten `#04060A` | T3 sagt nur "dunkel", sonst keine Farbe genannt |
| E2 | Hals als Ausgleich von 0,3 Kopfhöhen; Rumpf 2,2 | die vier Maße in T5 summieren sich nicht auf 6,5 (Widerspruch W3) |
| E3 | Armdrehpunkt 0,2 Kopfhöhen seitlich, 0,35 unter dem Halsansatz | sonst schneidet der gehobene Arm den Kopf (Fehler 3.1) |
| E4 | Ober- und Unterarm gestreckt, ohne Ellbogenknick | T6 verlangt, dass sich außer der Armhebung nichts ändert; ein Knick wäre erfunden |
| E5 | Gehobener Arm durchgehend in der Akzentfarbe, kein Farbwechsel während der Bewegung | T10 nennt keinen Zeitpunkt, T6 verbietet weitere Veränderungen |
| E6 | Bewegter Arm ist der im Bild linke, zum Gebäude zeigende | Figur schaut den Betrachter an, ihr rechter Arm liegt damit links im Bild |
| E7 | Weicher An- und Auslauf als Bezierkurve (0.42, 0, 0.58, 1) | T6 sagt "weich", nennt keine Kurve |
| E8 | Zähler von Sekunde 4,0 bis 5,5, danach steht 100 eine halbe Sekunde | T9 nennt kein Ende |
| E9 | Zähler in ganzen Zahlen, ohne Einheit und ohne Prozentzeichen | nichts dergleichen gefordert |
| E10 | Text und Zahl blenden über 0,3 s ein, Text mit leichtem Aufwärtsversatz | T7 und T9 sagen "erscheint", nicht wie |
| E11 | Gebäudemaße: 5 Säulen à 34 Punkte Breite, Gesamthöhe 820 Punkte, Mitte bei x = 270 | T4 nennt keine Maße; Gebäude etwa so hoch wie die Figur, gleiche Standlinie |
| E12 | Gemeinsame Standlinie bei y = 1390, Figurmitte bei x = 855 | Bildaufteilung war nicht vorgegeben; Abstand so gewählt, dass der Arm in keiner Stellung ins Gebäude greift |
| E13 | Schatten als weich verlaufende Ellipse unter den Füßen, kein Schatten am Gebäude | T11 ist doppeldeutig formuliert (Widerspruch W2) |
| E14 | Schrift Inter, geladen über das Google-Fonts-Paket von Remotion, zentral in `theme.ts` festgelegt | freigegeben; T12 war ohne bestehendes Projekt nicht erfüllbar (Widerspruch W1) |
| E15 | MP4 mit H.264, Datei unter `out/geldschoepfung.mp4` | Format und Name waren nicht genannt |
| E16 | Remotion auf `4.0.525` festgenagelt | reproduzierbarer Bau statt offener Versionsbereich |
| E17 | Keine README | Regel 7 |

---

## Stellen, an denen ein Mensch eingreifen musste

1. **Vor dem Bau, auf meine zwei Fragen:** Bestätigung der Schrift (Inter) und
   der Gradlesart, dazu drei Zahlenwerte (Kopfhöhe 150, Auflösung 1080 × 1920,
   Oberarm 1,25 / Unterarm 1,05 Kopfhöhen). Ohne diese Antworten hätte ich die
   Armlänge und die Bezugsachse der Winkel raten müssen.
2. **Die Freigabe selbst** ("Bau es") nach Regel 6.
3. **Die Auflage, dieses Protokoll zu führen**, um 06:37 mitten in der Arbeit.

Beim Bau selbst musste niemand eingreifen: Repository, Einrichtung,
Korrekturen, Render und Ablage liefen ohne menschliche Hand.

---

## Abschluss in Zahlen

**Anläufe**

| Vorgang | Anläufe | Ergebnis |
| --- | --- | --- |
| Repository anlegen | 1 | erfolgreich |
| Paketinstallation | 1 | erfolgreich, nach Versionskorrektur (Fehler 1) |
| Typprüfung | 1 | fehlerfrei |
| Prüfbilder | 2 | Anlauf 1 mit einem Abbruch (Fehler 2) und drei Bildfehlern (Fehler 3), Anlauf 2 sauber |
| Videorender | 1 | erfolgreich |
| Ablage im Repository | 1 | erfolgreich |

Gemeldete Fehler: **3** (geratene Paketversion, abgebrochenes Einzelbild,
drei Bildfehler in der Sichtprüfung). Alle drei von mir selbst behoben.

**Dauer**

| Abschnitt | Dauer |
| --- | --- |
| Gesamt ab Freigabe "Bau es" (06:31) bis Ablage | rund 10 Minuten |
| davon Einrichtung (Repository, Dateien, Paketinstallation 36 s, Chromium-Nachladen 91,9 MB, Bündelung) | rund 4 Minuten |
| davon Prüfbilder und Korrekturen | rund 3 Minuten |
| **davon REINE RENDERDAUER — nur das Zeichnen und Kodieren der 180 Bilder** | **15,28 Sekunden** |
| davon Formatprüfung, Sichtprüfung, Protokoll, Ablage | rund 2 Minuten |

Die reine Renderdauer enthält **nicht**: Paketinstallation, Nachladen des
Headless-Chromium, Bündelung des Projekts, Prüfbilder, Formatprüfung, Protokoll
und Ablage. Sie wurde gemessen, indem die Bündelung als eigener Schritt
vorgezogen und nur der Render aus dem fertigen Bündel gestoppt wurde.
Rechnerisch sind das rund 11,8 Bilder je Sekunde auf zwei Kernen.

**Credit-Verbrauch**

Eine Zahl kann ich nicht nennen — ich habe keinen Zugriff auf den Zählerstand
meines eigenen Verbrauchs. Qualitativ: der Aufwand lag gering. Es wurde keine
Websuche, kein Bildmodell, kein Sprachmodell für Inhalte und kein Hilfsagent
benutzt. Der Verbrauch besteht fast nur aus meinen eigenen Denk- und
Schreibschritten in dieser Sitzung, davon der größte Anteil in der Wiedergabe
und Lückenliste vor dem Bau sowie in der Sichtprüfung der gerenderten Bilder.
Der Render selbst lief in der Sandbox und kostet Rechenzeit, keine
Modellaufrufe. Rund 30 Werkzeugaufrufe, kein Fehlschlag mit
Wiederholungsschleife.
