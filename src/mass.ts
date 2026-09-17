// Alle Masse der Szene. Einzige Grundgroesse ist die Kopfhoehe K.
// Aendert man K, skaliert die gesamte Figur mit.

export const BREITE = 1080;
export const HOEHE = 1920;
export const FPS = 30;
export const DAUER_BILDER = 180; // 6 Sekunden

export const K = 150; // Kopfhoehe in Bildpunkten
export const BODEN = 1290; // Standlinie, auf der Figur und Gebaeude stehen

export const FARBE = {
  hintergrund: '#0F1218', // sehr dunkles Blaugrau, nicht Reinschwarz:
  // auf Reinschwarz waere der Bodenschatten unsichtbar
  koerper: '#ECE7DE', // gebrochenes Weiss fuer Gebaeude und Figur
  akzent: '#E8A33D', // warmer Akzent, nur fuer den gehobenen Arm
  schatten: '#000000',
};

// --- Figur -----------------------------------------------------------------
// Gesamthoehe 6,5 K: Kopf 1,0 + Hals 0,3 + Rumpf 2,2 + Beine 3,0.
// Der Hals traegt die 0,3 K, die zwischen den drei vorgegebenen Zahlen
// (1 + 2,2 + 3 = 6,2) und der vorgegebenen Gesamthoehe 6,5 fehlen.
export const FIGUR = {
  mitteX: 720,
  kopfDurchmesser: 1.0 * K,
  halsHoehe: 0.3 * K,
  rumpfHoehe: 2.2 * K,
  beinHoehe: 3.0 * K,
  oberarm: 1.25 * K,
  unterarm: 1.05 * K,
  gliedBreite: 0.15 * K,
  halsBreite: 0.2 * K,
  rumpfBreite: 0.8 * K,
  beinVersatz: 0.16 * K,
  // Kleiner Eckenradius: bei halber Rumpfbreite waere der Rumpfkopf eine
  // Kuppel, unter der die Schultergelenke hervorschauen.
  eckenRadius: 0.2 * K,
};

export const FIGUR_GESAMT =
  FIGUR.kopfDurchmesser + FIGUR.halsHoehe + FIGUR.rumpfHoehe + FIGUR.beinHoehe;

export const KOPF_OBEN = BODEN - FIGUR_GESAMT;
export const KOPF_MITTE_Y = KOPF_OBEN + FIGUR.kopfDurchmesser / 2;
export const HALS_OBEN = KOPF_OBEN + FIGUR.kopfDurchmesser;
export const RUMPF_OBEN = HALS_OBEN + FIGUR.halsHoehe;
export const RUMPF_UNTEN = RUMPF_OBEN + FIGUR.rumpfHoehe;
export const SCHULTER_Y = RUMPF_OBEN + 0.12 * K;
// Das Schultergelenk liegt innerhalb der Rumpfkontur, damit der Armansatz
// verdeckt ist und keine Stummelkante zeigt.
const SCHULTER_EINRUECKUNG = FIGUR.rumpfBreite / 2 - FIGUR.gliedBreite / 2;
export const SCHULTER_X_RECHTS = FIGUR.mitteX - SCHULTER_EINRUECKUNG; // im Bild links
export const SCHULTER_X_LINKS = FIGUR.mitteX + SCHULTER_EINRUECKUNG; // im Bild rechts

// --- Gebaeude --------------------------------------------------------------
// Von unten nach oben: zwei Stufen, fuenf Saeulen, ein waagerechter Balken,
// ein Giebeldreieck. Gesamthoehe 6,0 K, damit die Giebelspitze auf Kopfhoehe
// der Figur liegt.
export const HAUS = {
  mitteX: 290,
  stufeUntenBreite: 3.2 * K,
  stufeObenBreite: 2.7 * K,
  stufeHoehe: 0.2 * K,
  saeulenHoehe: 3.6 * K,
  saeulenAnzahl: 5,
  saeuleBreite: 0.24 * K,
  saeulenFeldBreite: 2.4 * K,
  balkenBreite: 2.8 * K,
  balkenHoehe: 0.4 * K,
  giebelBreite: 3.2 * K,
  giebelHoehe: 1.6 * K,
};

export const STUFE1_OBEN = BODEN - HAUS.stufeHoehe;
export const STUFE2_OBEN = STUFE1_OBEN - HAUS.stufeHoehe;
export const SAEULEN_OBEN = STUFE2_OBEN - HAUS.saeulenHoehe;
export const BALKEN_OBEN = SAEULEN_OBEN - HAUS.balkenHoehe;
export const GIEBEL_SPITZE_Y = BALKEN_OBEN - HAUS.giebelHoehe;

// --- Zeitpunkte, in Bildern ------------------------------------------------
export const ZEIT = {
  armStart: 1.0 * FPS, // 30
  armEnde: 3.0 * FPS, // 90
  armWinkelStart: 72, // Grad, 0 = waagerecht, positiv nach unten
  armWinkelEnde: -55,
  armRuheAndererArm: 72, // der nicht bewegte Arm haengt im selben Winkel
  zeileStart: 3.5 * FPS, // 105
  zeileBlende: 0.3 * FPS, // 9
  zahlStart: 4.0 * FPS, // 120
  zahlEnde: 5.5 * FPS, // 165
  zahlBlende: 0.2 * FPS, // 6
};
