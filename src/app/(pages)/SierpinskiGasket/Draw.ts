
import { Dispatch, SetStateAction, MutableRefObject } from 'react';
import p5 from 'p5';

import { stopDrawing } from '@/utils/drawingControls';
import { updateState } from './controls';


const drawCell = (p: p5, generation: number, width:number, maxGenerations:number, state: number[], mod:number) => {
  let scalar = width/maxGenerations;
  let x = (width - state.length*scalar)*0.5;
  let y = generation*scalar;


  p.noStroke();
  const baseHue = 0; 
  const hueRange = 80; // modに応じて最大80まで広がる
  for (let i=0; i < state.length; i++) {
    const value = state[i];

    if (value === 0) {
      // 透明に近い白っぽいセル（alphaを落とす）
      p.fill(0, 0, 100, 20);
    } else {
      const hue = (baseHue + hueRange*Math.sin(Math.PI*(2*value)/2)/value ) % 360;
      const alpha = 60 + 40 * (Math.log(value + 1) / Math.log(mod)); 

      p.fill(hue, 80, 70, alpha); // 彩度・明度は固定
    }

    // p.fill((state[i]*1.0/mod)*360, (state[i]*1.0/mod)*360, 360); // 彩度・明度は固定

    p.rect(x, y, scalar, scalar);
    x += scalar;
  }
};

// パスカルの三角形の計算をする
// 前の行を受け取り次の行を返す
const updateCells = (state: MutableRefObject<number[]>, mod: number) => {
  let newState: number[] = [];
  newState.push(1);
  for (let i = 0; i < state.current.length-1; i++) {
    // 足し算の段階で剰余計算を行う
    newState.push((state.current[i] + state.current[i+1]) % mod);
  }
  newState.push(1);
  updateState(newState, state);
}

const draw = (
  p:p5, 
  state: MutableRefObject<number[]>,
  generation: MutableRefObject<number>,
  maxGenerations: number,
  width: number,
  mod: number,
  isStopedRef: MutableRefObject<boolean>
) => {
  if (generation.current < maxGenerations) {
    drawCell(p, generation.current, width, maxGenerations, state.current, mod);
    updateCells(state, mod);
  }else{
    stopDrawing(isStopedRef);
  }
  generation.current++;
};

export default draw;



