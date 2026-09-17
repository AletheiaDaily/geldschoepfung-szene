import React from 'react';
import {
  BALKEN_OBEN,
  BODEN,
  FARBE,
  GIEBEL_SPITZE_Y,
  HAUS,
  SAEULEN_OBEN,
  STUFE1_OBEN,
  STUFE2_OBEN,
} from './mass';

// Gebaeude aus Grundformen, von oben nach unten:
// Giebeldreieck, waagerechter Balken, fuenf Saeulen, zwei Stufen.
// Alles statisch - die Aufgabe verlangt hier keine Bewegung.
export const Gebaeude: React.FC = () => {
  const m = HAUS.mitteX;

  // Fuenf Saeulen gleichmaessig ueber das Saeulenfeld verteilt.
  const zwischenraum =
    (HAUS.saeulenFeldBreite - HAUS.saeulenAnzahl * HAUS.saeuleBreite) /
    (HAUS.saeulenAnzahl - 1);
  const feldLinks = m - HAUS.saeulenFeldBreite / 2;
  const saeulen = Array.from({length: HAUS.saeulenAnzahl}, (_, i) => {
    return feldLinks + i * (HAUS.saeuleBreite + zwischenraum);
  });

  const giebelLinks = m - HAUS.giebelBreite / 2;
  const giebelRechts = m + HAUS.giebelBreite / 2;

  return (
    <g fill={FARBE.koerper}>
      <polygon
        points={`${m},${GIEBEL_SPITZE_Y} ${giebelRechts},${BALKEN_OBEN} ${giebelLinks},${BALKEN_OBEN}`}
      />
      <rect
        x={m - HAUS.balkenBreite / 2}
        y={BALKEN_OBEN}
        width={HAUS.balkenBreite}
        height={HAUS.balkenHoehe}
      />
      {saeulen.map((x, i) => (
        <rect
          key={i}
          x={x}
          y={SAEULEN_OBEN}
          width={HAUS.saeuleBreite}
          height={HAUS.saeulenHoehe}
        />
      ))}
      <rect
        x={m - HAUS.stufeObenBreite / 2}
        y={STUFE2_OBEN}
        width={HAUS.stufeObenBreite}
        height={HAUS.stufeHoehe}
      />
      <rect
        x={m - HAUS.stufeUntenBreite / 2}
        y={STUFE1_OBEN}
        width={HAUS.stufeUntenBreite}
        height={BODEN - STUFE1_OBEN}
      />
    </g>
  );
};
