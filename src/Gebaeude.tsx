import React from 'react';
import {FARBEN} from './theme';
import {BODEN_Y, GEBAEUDE, GEBAEUDE_OBEN_Y} from './geometrie';

/**
 * T4: Gebaeude aus Grundformen — Dreieck (Giebel), waagerechter Balken,
 * fuenf senkrechte Saeulen, zwei Stufen. Linke Bildhaelfte.
 */
export const Gebaeude: React.FC = () => {
  const m = GEBAEUDE.mitteX;

  // Stufen (unterste zuerst)
  const stufeUntenY = BODEN_Y - GEBAEUDE.stufeHoehe;
  const stufeObenY = stufeUntenY - GEBAEUDE.stufeHoehe;

  // Saeulen stehen auf der oberen Stufe
  const saeuleFussY = stufeObenY;
  const saeuleKopfY = saeuleFussY - GEBAEUDE.saeuleHoehe;
  const luecke =
    (GEBAEUDE.saeulenFeldBreite - GEBAEUDE.saeuleAnzahl * GEBAEUDE.saeuleBreite) /
    (GEBAEUDE.saeuleAnzahl - 1);
  const saeulenLinks = m - GEBAEUDE.saeulenFeldBreite / 2;

  // Balken ueber den Saeulen
  const balkenY = saeuleKopfY - GEBAEUDE.balkenHoehe;

  // Giebel ueber dem Balken
  const giebelFussY = balkenY;
  const giebelSpitzeY = GEBAEUDE_OBEN_Y;

  return (
    <g>
      {/* zwei Stufen */}
      <rect
        x={m - GEBAEUDE.stufeUntenBreite / 2}
        y={stufeUntenY}
        width={GEBAEUDE.stufeUntenBreite}
        height={GEBAEUDE.stufeHoehe}
        fill={FARBEN.struktur}
      />
      <rect
        x={m - GEBAEUDE.stufeObenBreite / 2}
        y={stufeObenY}
        width={GEBAEUDE.stufeObenBreite}
        height={GEBAEUDE.stufeHoehe}
        fill={FARBEN.struktur}
      />

      {/* fuenf senkrechte Saeulen */}
      {Array.from({length: GEBAEUDE.saeuleAnzahl}).map((_, i) => (
        <rect
          key={i}
          x={saeulenLinks + i * (GEBAEUDE.saeuleBreite + luecke)}
          y={saeuleKopfY}
          width={GEBAEUDE.saeuleBreite}
          height={GEBAEUDE.saeuleHoehe}
          fill={FARBEN.struktur}
        />
      ))}

      {/* waagerechter Balken */}
      <rect
        x={m - GEBAEUDE.balkenBreite / 2}
        y={balkenY}
        width={GEBAEUDE.balkenBreite}
        height={GEBAEUDE.balkenHoehe}
        fill={FARBEN.struktur}
      />

      {/* Dreieck als Giebel */}
      <polygon
        points={[
          `${m - GEBAEUDE.giebelBreite / 2},${giebelFussY}`,
          `${m + GEBAEUDE.giebelBreite / 2},${giebelFussY}`,
          `${m},${giebelSpitzeY}`,
        ].join(' ')}
        fill={FARBEN.struktur}
      />
    </g>
  );
};
