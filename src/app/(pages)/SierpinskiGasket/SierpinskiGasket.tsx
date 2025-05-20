'use client';

import React, { useEffect, useRef, useState } from 'react';
import p5 from 'p5';

import useWindowSize from '@/utils/GetWindowSize';
import '@/styles/global.css';
import setup from './Setup';
import draw from './Draw';

const SierpinskiGasket = () => {
  const {height, width } = useWindowSize();
  const SHOULD_STOP = useRef(false); 
  const P5_INSTANCE = useRef<p5 | null>(null);

  // const [state, setState] = useState<number[]>([1]);
  const state2 = useRef<number[]>([1]);
  const gen = useRef<number>(0);
  const num = 300;
  const mod = 3;
  const WIDTH = 600;


  useEffect(() => {
    const sketch = (p: p5) => {
      p.setup = () => setup(p);
      p.draw = () => {
        draw(p, stopDrawing, updateState, state2.current, gen, num, WIDTH, mod);
        if (SHOULD_STOP.current){
          p.noLoop();
        }else{
          p.loop();
        }
      };
    };

    P5_INSTANCE.current= new p5(
      sketch,
      document.getElementById('p5-container')!
    );

    return () => {
      P5_INSTANCE.current?.remove();
    };
  }, []);



  const updateState = (newState: number[]) => {
    state2.current = newState;
  }

  const stopDrawing = () => {
    console.log('停止')
    SHOULD_STOP.current = true;
  };

  const reStartDrawing = () => {
    console.log('再開')
    // drawは停止状態だからdrawの中でloopを呼んでも意味ない、そのためここでloopを呼ぶ
    SHOULD_STOP.current = false;
    P5_INSTANCE.current?.loop();
  };


  return (
    <div>
      <button onClick={stopDrawing} style={{ marginTop: '10px', padding: '10px' }}>
        停止
      </button>
      <button onClick={reStartDrawing} style={{ marginTop: '10px', padding: '10px' }}>
        再開
      </button>
      <div id='p5-container'></div>
    </div>
  );

};

export default SierpinskiGasket;
