'use client';

import React, { useEffect } from 'react';
import p5 from 'p5';

import useWindowSize from '@/utils/GetWindowSize';
import '@/styles/global.css';
import setup from './Setup';
import draw from './Draw';

const Graffiti = () => {
  const { height, width } = useWindowSize();
  useEffect(() => {
    
    const sketch = (p: p5) => {
      p.setup = () => setup(p);
      p.draw = () => draw(p);
    };

    const p5Instance: p5 = new p5(
      sketch,
      document.getElementById('p5-container')!
    );

    return () => {
      p5Instance.remove();
    };
  }, []);

  return (
    <div>
      <div id='p5-container'></div>
    </div>
  );
};

export default Graffiti;
