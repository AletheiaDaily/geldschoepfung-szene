import React from 'react';
import {Composition} from 'remotion';
import {VIDEO} from './theme';
import {Szene} from './Szene';

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="Szene"
      component={Szene}
      durationInFrames={VIDEO.dauerInBildern}
      fps={VIDEO.fps}
      width={VIDEO.breite}
      height={VIDEO.hoehe}
    />
  );
};
