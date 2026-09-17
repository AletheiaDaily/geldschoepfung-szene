/**
 * Alle Masse der Szene.
 *
 * Die Figur (T5) leitet SAEMTLICHE Masse aus der Kopfhoehe ab.
 * Kopfhoehe = 150 Bildpunkte.
 *
 *   Kopf   1,00 Kopfhoehen = 150
 *   Hals   0,30 Kopfhoehen =  45  (Ausgleich, damit 6,5 aufgeht)
 *   Rumpf  2,20 Kopfhoehen = 330  ("gut zwei")
 *   Beine  3,00 Kopfhoehen = 450
 *   ---------------------------------
 *   Summe  6,50 Kopfhoehen = 975  (T5: Gesamthoehe)
 *
 *   Oberarm  1,25 Kopfhoehen = 187,5
 *   Unterarm 1,05 Kopfhoehen = 157,5
 */

export const KOPF = 150;

export const FIGUR = {
  kopf: KOPF * 1.0,
  hals: KOPF * 0.3,
  rumpf: KOPF * 2.2,
  beine: KOPF * 3.0,
  oberarm: KOPF * 1.25,
  unterarm: KOPF * 1.05,
  gesamt: KOPF * 6.5,
  strich: KOPF * 0.09, // Strichstaerke der Glieder
  beinSpreizung: KOPF * 0.37, // waagerechter Versatz je Fuss
  schulterVersatzX: KOPF * 0.2, // Lage des Drehpunkts seitlich der Rumpfachse
  schulterVersatzY: KOPF * 0.35, // Lage des Drehpunkts unter dem Halsansatz
} as const;

/** Gemeinsame Standlinie von Gebaeude und Figur. */
export const BODEN_Y = 1390;

/** Figur in der rechten Bildhaelfte (T5). */
export const FIGUR_X = 855;

const figurOben = BODEN_Y - FIGUR.gesamt; // 335
export const FIGUR_PUNKTE = {
  oben: figurOben,
  kopfMitteY: figurOben + FIGUR.kopf / 2, // 410
  kopfUntenY: figurOben + FIGUR.kopf, // 485
  schulterY: figurOben + FIGUR.kopf + FIGUR.hals, // Halsansatz / Rumpfbeginn
  // Drehpunkt der Arme: seitlich und leicht unterhalb des Halsansatzes,
  // damit der gehobene Arm den Kopf nicht schneidet.
  armDrehpunktY: figurOben + FIGUR.kopf + FIGUR.hals + FIGUR.schulterVersatzY,
  huefteY: figurOben + FIGUR.kopf + FIGUR.hals + FIGUR.rumpf, // 860
} as const;

/** Gebaeude in der linken Bildhaelfte (T4). */
export const GEBAEUDE = {
  mitteX: 270,
  // von unten nach oben
  stufeHoehe: 30, // zwei Stufen
  stufeUntenBreite: 410,
  stufeObenBreite: 372,
  saeuleAnzahl: 5,
  saeuleBreite: 34,
  saeuleHoehe: 560,
  saeulenFeldBreite: 320, // Spannweite aller fuenf Saeulen
  balkenHoehe: 50, // waagerechter Balken
  balkenBreite: 360,
  giebelBreite: 400, // Dreieck als Giebel
  giebelHoehe: 150,
} as const;

export const GEBAEUDE_HOEHE =
  GEBAEUDE.stufeHoehe * 2 +
  GEBAEUDE.saeuleHoehe +
  GEBAEUDE.balkenHoehe +
  GEBAEUDE.giebelHoehe; // 820

/** Oberkante des Giebels. */
export const GEBAEUDE_OBEN_Y = BODEN_Y - GEBAEUDE_HOEHE; // 490

/** Zeitmarken in Bildern (30 fps). */
export const ZEIT = {
  armStart: 30, // Sekunde 1,0 (T6)
  armEnde: 90, // Sekunde 3,0 (T6)
  textStart: 105, // Sekunde 3,5 (T7)
  textEinblende: 9, // 0,3 Sekunden
  zahlStart: 120, // Sekunde 4,0 (T9)
  zahlEnde: 165, // Sekunde 5,5 (Entscheidung L10)
} as const;

/** Armwinkel in Grad: 0 = waagerecht, positiv = nach unten (T6). */
export const ARM_WINKEL = {
  start: 72,
  ziel: -55,
  ruhenderArm: 72, // der andere Arm bleibt unveraendert
} as const;
