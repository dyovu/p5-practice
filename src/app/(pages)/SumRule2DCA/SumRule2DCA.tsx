'use client';

import React, { useEffect, useRef } from 'react';
import p5 from 'p5';


import '@/styles/global.css';

import { stopDrawing, reStartDrawing } from '@/utils/drawingControls';
import {resetDrawing, updateCells} from './controls';
import setup from './Setup';
import draw from './Draw';

const SumRule2DCA = () => {
  const isStoped = useRef(false); 
  const p5Instance = useRef<p5 | null>(null);

  const cells = useRef<number[][]>([]); // 2Dセルの状態を保持するための配列
  const generation = useRef<number>(0); 
  const cellPerSide = useRef<number>(301); 
  const mod = useRef<number>(10);
  const cellSize = 600 / cellPerSide.current;
  const firstCordinate = (600 / (cellPerSide.current+1));

  useEffect(() => {
    
    const sketch = (p: p5) => {
      p.setup = () => setup(p, cells, cellPerSide.current);
      p.draw = () => {
        draw(p, isStoped, cells, cellPerSide.current, generation, mod.current, cellSize, firstCordinate);
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
      <button onClick={() => resetDrawing(isStoped, p5Instance)} style={{ marginTop: '10px', padding: '10px' }}>
        Reset
      </button>
      <div id='p5-container'></div>
    </div>
  );

};

export default SumRule2DCA;
