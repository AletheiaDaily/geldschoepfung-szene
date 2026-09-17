import React from 'react';
import {
  BODEN,
  FARBE,
  FIGUR,
  HALS_OBEN,
  KOPF_MITTE_Y,
  RUMPF_OBEN,
  RUMPF_UNTEN,
  SCHULTER_X_LINKS,
  SCHULTER_X_RECHTS,
  SCHULTER_Y,
  ZEIT,
} from './mass';

// Oberarm und Unterarm ueberlappen sich um eine halbe Gliedbreite, damit die
// beiden runden Enden keine Kerbe in die Silhouette schneiden. Ellbogenpunkt
// und Handspitze liegen dadurch unveraendert bei 1,25 K und 2,30 K.
const UEBERLAPP = 0.5;

// Ein Arm: Oberarm und Unterarm auf einer Geraden, starr um die Schulter
// gedreht - die Aufgabe nennt keinen Ellbogen und verbietet jede weitere
// Bewegung, also knickt hier nichts.
// Winkelzaehlung: 0 Grad waagerecht, positive Werte nach unten, Drehpunkt
// Schulter. SVG dreht im Uhrzeigersinn, deshalb kehrt der im Bild nach links
// weisende Arm das Vorzeichen um.
const Arm: React.FC<{
  richtung: -1 | 1;
  schulterX: number;
  winkel: number;
  farbe: string;
}> = ({richtung, schulterX, winkel, farbe}) => {
  const b = FIGUR.gliedBreite;
  const drehung = richtung === -1 ? -winkel : winkel;

  const segment = (abstand: number, laenge: number, schluessel: string) => {
    const x =
      richtung === -1 ? schulterX - abstand - laenge : schulterX + abstand;
    return (
      <rect
        key={schluessel}
        x={x}
        y={SCHULTER_Y - b / 2}
        width={laenge}
        height={b}
        rx={b / 2}
        fill={farbe}
      />
    );
  };

  return (
    <g transform={`rotate(${drehung} ${schulterX} ${SCHULTER_Y})`}>
      {segment(0, FIGUR.oberarm, 'oberarm')}
      {segment(
        FIGUR.oberarm - UEBERLAPP * b,
        FIGUR.unterarm + UEBERLAPP * b,
        'unterarm',
      )}
    </g>
  );
};

export const Figur: React.FC<{armWinkel: number}> = ({armWinkel}) => {
  const b = FIGUR.gliedBreite;

  return (
    <g>
      {/* Zuerst die Arme, damit ihr Ansatz hinter dem Rumpf verschwindet */}
      <Arm
        richtung={1}
        schulterX={SCHULTER_X_LINKS}
        winkel={ZEIT.armRuheAndererArm}
        farbe={FARBE.koerper}
      />
      <Arm
        richtung={-1}
        schulterX={SCHULTER_X_RECHTS}
        winkel={armWinkel}
        farbe={FARBE.akzent}
      />

      {/* Beine: senkrecht und parallel, damit die vorgegebenen drei Kopfhoehen
          exakt der senkrechten Beinlaenge entsprechen */}
      {[-1, 1].map((seite) => (
        <rect
          key={seite}
          x={FIGUR.mitteX + seite * FIGUR.beinVersatz - b / 2}
          y={RUMPF_UNTEN - b}
          width={b}
          height={BODEN - RUMPF_UNTEN + b}
          rx={b / 2}
          fill={FARBE.koerper}
        />
      ))}

      <rect
        x={FIGUR.mitteX - FIGUR.rumpfBreite / 2}
        y={RUMPF_OBEN}
        width={FIGUR.rumpfBreite}
        height={RUMPF_UNTEN - RUMPF_OBEN}
        rx={FIGUR.eckenRadius}
        fill={FARBE.koerper}
      />

      <rect
        x={FIGUR.mitteX - FIGUR.halsBreite / 2}
        y={HALS_OBEN - 4}
        width={FIGUR.halsBreite}
        height={RUMPF_OBEN - HALS_OBEN + 8}
        fill={FARBE.koerper}
      />

      <circle
        cx={FIGUR.mitteX}
        cy={KOPF_MITTE_Y}
        r={FIGUR.kopfDurchmesser / 2}
        fill={FARBE.koerper}
      />
    </g>
  );
};
