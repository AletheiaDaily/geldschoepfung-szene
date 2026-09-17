import React from 'react';
import {Composition} from 'remotion';
import {BREITE, DAUER_BILDER, FPS, HOEHE} from './mass';
import {Szene} from './Szene';

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="Szene"
      component={Szene}
      durationInFrames={DAUER_BILDER}
      fps={FPS}
      width={BREITE}
      height={HOEHE}
    />
  );
};
