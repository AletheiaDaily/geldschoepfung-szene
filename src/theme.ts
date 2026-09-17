/**
 * Zentrale Projekt-Definitionen.
 * Die Schrift ist hier EINMAL festgelegt (T12): alles im Projekt benutzt PROJEKT_SCHRIFT.
 */
import {loadFont} from '@remotion/google-fonts/Inter';

const {fontFamily} = loadFont();

/** Die eine Schriftart des Projekts (Inter, freie SIL Open Font License). */
export const PROJEKT_SCHRIFT = fontFamily;

export const FARBEN = {
  hintergrund: '#0F1216', // T3: dunkel
  struktur: '#ECEFF3', // Gebaeude und Figur
  akzent: '#F5A524', // T10: gehobener Arm
  text: '#ECEFF3',
  schatten: '#04060A', // T11
} as const;

export const VIDEO = {
  breite: 1080,
  hoehe: 1920,
  fps: 30,
  dauerInBildern: 180, // T2: 6 Sekunden * 30 fps
} as const;
