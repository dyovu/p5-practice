'use client';

import React, { useEffect, useRef } from 'react';
import p5 from 'p5';

import useWindowSize from '@/utils/GetWindowSize';
import setup from './Setup';
import draw from './Draw';

const LogarithmicSpiral = () => {
  const { height, width } = useWindowSize();
  let theta = useRef(0);
  const STEP:number  = 2*3.14*0.01;

  useEffect(() => {
    const sketch = (p: p5) => {
      p.setup = () => setup(p);
      p.draw = () => {
        draw(p, theta.current, STEP);
        theta.current += STEP;
      }
    };

    const p5Instance: p5 = new p5(
      sketch,
      document.getElementById('p5-container')!
    );

    return () => {
      p5Instance.remove();
      theta.current = 0;
    };
  }, []);

  return (
    <div>
      <div id='p5-container'></div>
    </div>
  );
};

export default LogarithmicSpiral;
