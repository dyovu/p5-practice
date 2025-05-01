'use client';

import React, { useEffect } from 'react';
import p5 from 'p5';

import '@/styles/global.css';
import setup from './Setup';
import draw from './Draw';

const PixelPainter = () => {
  useEffect(() => {
    
    const sketch = (p: p5) => {
      let img: p5.Image;
      
      p.preload = () => {img = p.loadImage('/butterfly.jpeg')};
      p.setup = () => setup(p, img);
      p.draw = () => draw(p, img);
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

export default PixelPainter;
