import React from 'react';
import {
  AbsoluteFill,
  Easing,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import {FARBEN, PROJEKT_SCHRIFT} from './theme';
import {
  ARM_WINKEL,
  BODEN_Y,
  FIGUR,
  FIGUR_X,
  GEBAEUDE,
  GEBAEUDE_OBEN_Y,
  ZEIT,
} from './geometrie';
import {Gebaeude} from './Gebaeude';
import {Figur} from './Figur';

export const Szene: React.FC = () => {
  const frame = useCurrentFrame();
  const {width, height} = useVideoConfig();

  // T6: Arm von 72 auf -55 Grad, Sekunde 1 bis 3, weicher An- und Auslauf.
  const armWinkel = interpolate(
    frame,
    [ZEIT.armStart, ZEIT.armEnde],
    [ARM_WINKEL.start, ARM_WINKEL.ziel],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: Easing.bezier(0.42, 0, 0.58, 1),
    },
  );

  // T7/T8: Textzeile ab Sekunde 3,5, bleibt bis zum Ende.
  const textFortschritt = interpolate(
    frame,
    [ZEIT.textStart, ZEIT.textStart + ZEIT.textEinblende],
    [0, 1],
    {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.quad)},
  );

  // T9: Zahl von 0 auf 100 ab Sekunde 4,0, weich ausbremsend.
  const zahlSichtbar = frame >= ZEIT.zahlStart;
  const zahlWert = interpolate(frame, [ZEIT.zahlStart, ZEIT.zahlEnde], [0, 100], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });
  const zahlEinblende = interpolate(
    frame,
    [ZEIT.zahlStart, ZEIT.zahlStart + 9],
    [0, 1],
    {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'},
  );

  return (
    <AbsoluteFill style={{backgroundColor: FARBEN.hintergrund}}>
      <svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        style={{position: 'absolute', inset: 0}}
      >
        <defs>
          <filter id="weicherSchatten" x="-60%" y="-200%" width="220%" height="500%">
            <feGaussianBlur stdDeviation="26" />
          </filter>
        </defs>

        {/* T11: weicher Schatten unter der Figur (unten rechts im Bild) */}
        <ellipse
          cx={FIGUR_X}
          cy={BODEN_Y + FIGUR.strich * 0.6}
          rx={FIGUR.beinSpreizung * 3.1}
          ry={FIGUR.strich * 1.9}
          fill={FARBEN.schatten}
          filter="url(#weicherSchatten)"
        />

        <Gebaeude />
        <Figur armWinkel={armWinkel} />

        {/* T9: Zahl ueber dem Gebaeude */}
        {zahlSichtbar ? (
          <text
            x={GEBAEUDE.mitteX}
            y={GEBAEUDE_OBEN_Y - 70}
            textAnchor="middle"
            fill={FARBEN.text}
            opacity={zahlEinblende}
            style={{
              fontFamily: PROJEKT_SCHRIFT,
              fontSize: 132,
              fontWeight: 600,
              fontVariantNumeric: 'tabular-nums',
            }}
          >
            {Math.round(zahlWert)}
          </text>
        ) : null}

        {/* T7/T8: Textzeile unter beiden */}
        <text
          x={width / 2}
          y={1600}
          textAnchor="middle"
          fill={FARBEN.text}
          opacity={textFortschritt}
          transform={`translate(0 ${(1 - textFortschritt) * 22})`}
          style={{fontFamily: PROJEKT_SCHRIFT, fontSize: 78, fontWeight: 500}}
        >
          So entsteht Geld.
        </text>
      </svg>
    </AbsoluteFill>
  );
};
