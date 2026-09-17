import React from 'react';
import {AbsoluteFill, Easing, interpolate, useCurrentFrame} from 'remotion';
import {Figur} from './Figur';
import {Gebaeude} from './Gebaeude';
import {
  BODEN,
  BREITE,
  FARBE,
  FIGUR,
  HAUS,
  HOEHE,
  K,
  ZEIT,
} from './mass';
import {SCHRIFT_FAMILIE} from './schrift';

export const Szene: React.FC = () => {
  const bild = useCurrentFrame();

  // T6: Armhub zwischen Sekunde 1 und 3, weich anfahrend und auslaufend.
  const armWinkel = interpolate(
    bild,
    [ZEIT.armStart, ZEIT.armEnde],
    [ZEIT.armWinkelStart, ZEIT.armWinkelEnde],
    {
      easing: Easing.inOut(Easing.cubic),
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    },
  );

  // T7/T8: Zeile ab Sekunde 3,5, bleibt bis zum Ende stehen.
  const zeileDeckkraft = interpolate(
    bild,
    [ZEIT.zeileStart, ZEIT.zeileStart + ZEIT.zeileBlende],
    [0, 1],
    {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'},
  );
  const zeileVersatz = interpolate(
    bild,
    [ZEIT.zeileStart, ZEIT.zeileStart + ZEIT.zeileBlende],
    [0.13 * K, 0],
    {
      easing: Easing.out(Easing.cubic),
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    },
  );

  // T9: Zahl ab Sekunde 4, von 0 auf 100, weich langsamer werdend,
  // erreicht die 100 bei Sekunde 5,5 und steht dann ruhig.
  const zahl = interpolate(bild, [ZEIT.zahlStart, ZEIT.zahlEnde], [0, 100], {
    easing: Easing.out(Easing.cubic),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const zahlDeckkraft = interpolate(
    bild,
    [ZEIT.zahlStart, ZEIT.zahlStart + ZEIT.zahlBlende],
    [0, 1],
    {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'},
  );

  return (
    <AbsoluteFill style={{backgroundColor: FARBE.hintergrund}}>
      <svg
        width={BREITE}
        height={HOEHE}
        viewBox={`0 0 ${BREITE} ${HOEHE}`}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <filter id="weich" x="-60%" y="-300%" width="220%" height="700%">
            <feGaussianBlur stdDeviation={0.11 * K} />
          </filter>
        </defs>

        {/* T11: weicher Bodenschatten, nur unter der Figur */}
        <ellipse
          cx={FIGUR.mitteX}
          cy={BODEN + 0.04 * K}
          rx={0.95 * K}
          ry={0.12 * K}
          fill={FARBE.schatten}
          opacity={0.7}
          filter="url(#weich)"
        />

        <Gebaeude />
        <Figur armWinkel={armWinkel} />

        <g opacity={zahlDeckkraft}>
          <text
            x={HAUS.mitteX}
            y={2.2 * K}
            textAnchor="middle"
            fontFamily={SCHRIFT_FAMILIE}
            fontWeight={700}
            fontSize={0.85 * K}
            fill={FARBE.koerper}
          >
            {Math.round(zahl)}
          </text>
        </g>

        <g opacity={zeileDeckkraft} transform={`translate(0 ${zeileVersatz})`}>
          <text
            x={BREITE / 2}
            y={10 * K}
            textAnchor="middle"
            fontFamily={SCHRIFT_FAMILIE}
            fontWeight={500}
            fontSize={0.6 * K}
            fill={FARBE.koerper}
          >
            So entsteht Geld.
          </text>
        </g>
      </svg>
    </AbsoluteFill>
  );
};
