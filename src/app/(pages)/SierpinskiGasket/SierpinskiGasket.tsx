'use client';

import React, { useEffect, useRef, useState } from 'react';
import p5 from 'p5';

import { stopDrawing, reStartDrawing } from '@/utils/drawingControls';
import {resetDrawing, updateState} from './controls';
import '@/styles/global.css';
import setup from './Setup';
import draw from './Draw';

const SierpinskiGasket = () => {
  const isStoped = useRef(false); 
  const p5Instance = useRef<p5 | null>(null);

  const state = useRef<number[]>([1]);
  const generation = useRef<number>(0);
  const maxGenerations = 150;
  const mod = 2;
  const WIDTH = 500;


  useEffect(() => {
    const sketch = (p: p5) => {
      p.setup = () => setup(p);
      p.draw = () => {
        draw(p, state, generation, maxGenerations, WIDTH, mod, isStoped);
        if (isStoped.current){
          p.noLoop();
        }else{
          p.loop();
        }
      };
    };

    p5Instance.current= new p5(
      sketch,
      document.getElementById('p5-container')!
    );

    return () => {
      p5Instance.current?.remove();
    };
  }, []);


  return (
    <div>
      <button onClick={() => stopDrawing(isStoped)} style={{ marginTop: '10px', padding: '10px' }}>
        Stop
      </button>
      <button onClick={() => reStartDrawing(isStoped, p5Instance)} style={{ marginTop: '10px', padding: '10px' }}>
        Restart
      </button>
      <button onClick={() => resetDrawing(state, generation, isStoped, p5Instance)} style={{ marginTop: '10px', padding: '10px' }}>
        Reset
      </button>
      <div id='p5-container'></div>
    </div>
  );

};

export default SierpinskiGasket;
