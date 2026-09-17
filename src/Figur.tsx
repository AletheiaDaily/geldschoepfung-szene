import React from 'react';
import {FARBEN} from './theme';
import {ARM_WINKEL, FIGUR, FIGUR_PUNKTE, FIGUR_X, BODEN_Y} from './geometrie';

/**
 * T5: Figur aus Grundformen — Kopf, Rumpf, zwei Arme, zwei Beine.
 * T6: der rechte Arm (aus Sicht der Figur, also links im Bild, zum Gebaeude hin)
 *     dreht um die Schulter. 0 Grad = waagerecht, positive Werte nach unten.
 * T10: dieser Arm ist durchgehend in der Akzentfarbe.
 */

type ArmPunkte = {ellbogen: {x: number; y: number}; hand: {x: number; y: number}};

/** seite = -1 : im Bild nach links (rechter Arm der Figur), +1 : nach rechts. */
const armPunkte = (winkelGrad: number, seite: -1 | 1): ArmPunkte => {
  const r = (winkelGrad * Math.PI) / 180;
  const dx = seite * Math.cos(r);
  const dy = Math.sin(r); // positiv = nach unten
  const sx = FIGUR_X + seite * FIGUR.schulterVersatzX;
  const sy = FIGUR_PUNKTE.armDrehpunktY;
  const ellbogen = {x: sx + dx * FIGUR.oberarm, y: sy + dy * FIGUR.oberarm};
  const hand = {
    x: ellbogen.x + dx * FIGUR.unterarm,
    y: ellbogen.y + dy * FIGUR.unterarm,
  };
  return {ellbogen, hand};
};

const Arm: React.FC<{winkel: number; seite: -1 | 1; farbe: string}> = ({
  winkel,
  seite,
  farbe,
}) => {
  const {ellbogen, hand} = armPunkte(winkel, seite);
  const schulterX = FIGUR_X + seite * FIGUR.schulterVersatzX;
  return (
    <g stroke={farbe} strokeLinecap="round" fill="none">
      {/* kurze Schulter von der Rumpfachse zum Drehpunkt */}
      <line
        x1={FIGUR_X}
        y1={FIGUR_PUNKTE.schulterY + FIGUR.schulterVersatzY * 0.45}
        x2={schulterX}
        y2={FIGUR_PUNKTE.armDrehpunktY}
        strokeWidth={FIGUR.strich}
      />
      <line
        x1={schulterX}
        y1={FIGUR_PUNKTE.armDrehpunktY}
        x2={ellbogen.x}
        y2={ellbogen.y}
        strokeWidth={FIGUR.strich}
      />
      <line
        x1={ellbogen.x}
        y1={ellbogen.y}
        x2={hand.x}
        y2={hand.y}
        strokeWidth={FIGUR.strich * 0.82}
      />
    </g>
  );
};

export const Figur: React.FC<{armWinkel: number}> = ({armWinkel}) => {
  const fussLinksX = FIGUR_X - FIGUR.beinSpreizung;
  const fussRechtsX = FIGUR_X + FIGUR.beinSpreizung;

  return (
    <g>
      {/* Kopf */}
      <circle
        cx={FIGUR_X}
        cy={FIGUR_PUNKTE.kopfMitteY}
        r={FIGUR.kopf / 2}
        fill={FARBEN.struktur}
      />

      <g stroke={FARBEN.struktur} strokeLinecap="round" fill="none">
        {/* Hals (Ausgleich auf 6,5 Kopfhoehen) */}
        <line
          x1={FIGUR_X}
          y1={FIGUR_PUNKTE.kopfUntenY}
          x2={FIGUR_X}
          y2={FIGUR_PUNKTE.schulterY}
          strokeWidth={FIGUR.strich * 0.8}
        />
        {/* Rumpf */}
        <line
          x1={FIGUR_X}
          y1={FIGUR_PUNKTE.schulterY}
          x2={FIGUR_X}
          y2={FIGUR_PUNKTE.huefteY}
          strokeWidth={FIGUR.strich * 1.15}
        />
        {/* zwei Beine */}
        <line
          x1={FIGUR_X}
          y1={FIGUR_PUNKTE.huefteY}
          x2={fussLinksX}
          y2={BODEN_Y}
          strokeWidth={FIGUR.strich}
        />
        <line
          x1={FIGUR_X}
          y1={FIGUR_PUNKTE.huefteY}
          x2={fussRechtsX}
          y2={BODEN_Y}
          strokeWidth={FIGUR.strich}
        />
      </g>

      {/* ruhender Arm (unveraendert, T6) */}
      <Arm winkel={ARM_WINKEL.ruhenderArm} seite={1} farbe={FARBEN.struktur} />
      {/* bewegter Arm in Akzentfarbe (T6, T10) */}
      <Arm winkel={armWinkel} seite={-1} farbe={FARBEN.akzent} />
    </g>
  );
};
