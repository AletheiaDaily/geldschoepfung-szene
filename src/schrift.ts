import {loadFont} from '@remotion/fonts';
import {cancelRender, continueRender, delayRender, staticFile} from 'remotion';

// T12: eine Schrift, zentral festgelegt, von allen Textelementen benutzt.
// Inter, SIL Open Font License 1.1, als Datei im Projekt - kein Netzzugriff
// beim Rendern.
export const SCHRIFT_FAMILIE = 'Inter';

const warte = delayRender('Schrift Inter laden');

Promise.all([
  loadFont({
    family: SCHRIFT_FAMILIE,
    url: staticFile('fonts/Inter-500.woff2'),
    weight: '500',
    format: 'woff2',
  }),
  loadFont({
    family: SCHRIFT_FAMILIE,
    url: staticFile('fonts/Inter-700.woff2'),
    weight: '700',
    format: 'woff2',
  }),
])
  .then(() => continueRender(warte))
  .catch((fehler) => cancelRender(fehler));
