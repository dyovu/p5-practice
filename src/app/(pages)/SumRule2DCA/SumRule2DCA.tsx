'use client';

import React, { useEffect, useRef, useState } from 'react';
import p5 from 'p5';

import '@/styles/global.css';

import setup from './Setup';
import draw from './Draw';
import CustomSlider from 'src/components/CustomSlider';

import { toggleDrawing } from '@/utils/drawingControls';
import {resetDrawing} from './controls';

const SumRule2DCA = () => {
  const p5Instance = useRef<p5 | null>(null);
  const isStoped = useRef(false); 
  const [isStopedDisplay, setIsStopedDisplay] = useState(false);

  const frameRate = useRef(5);
  const [frameRateDisplay, setFrameRateDisplay] = useState(frameRate.current);

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
        draw(p, cells, cellPerSide.current, generation, mod.current, cellSize, firstCordinate, frameRate.current, isStoped.current);
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

  const handleFrameRate = (value: number) => {
    frameRate.current = value;
    setFrameRateDisplay(value);
    p5Instance.current?.frameRate(value);
  };


  return (
    <div>
      <button onClick={() => toggleDrawing(isStoped, p5Instance, setIsStopedDisplay)} style={{ marginTop: '10px', padding: '10px' }}>
        {isStoped.current ? 'Start' : 'Stop'}
      </button>
      <button onClick={() => resetDrawing(isStoped, p5Instance)} style={{ marginTop: '10px', padding: '10px' }}>
        Reset
      </button>
      <CustomSlider
        value={frameRate.current}
        onChange={handleFrameRate}
        label='frame rate'
        min={1}
        max={50}
      />
      <div id='p5-container'></div>
    </div>
  );

};

export default SumRule2DCA;
