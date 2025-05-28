
import { Dispatch, SetStateAction, MutableRefObject } from 'react';

import p5 from 'p5';

type stopDrawingFn = () => void;
type updateStateFn = (list : number[]) => void;

const draw = (
  p:p5, 
  stopDrawing: stopDrawingFn,
  updateState: updateStateFn,
  state: number[],
  gen: MutableRefObject<number>,
  num: number,
  width: number,
  mod: number
) => {
  if (gen.current < num) {
    drawCell(p, gen.current, width, num, state, mod);
    update(updateState, state, mod);
  }else{
    stopDrawing();
  }
  gen.current++;
};

export default draw;


const drawCell = (p: p5, gen: number, width:number, num:number, state: number[], mod:number) => {
  let scalar = width/num;
  let x = (width - state.length*scalar)*0.5;
  let y = gen*scalar;


  p.noStroke();
  const baseHue = 280; 
  const hueRange = 80; // modに応じて最大80まで広がる
  for (let i=0; i < state.length; i++) {
    const value = state[i];

    if (value === 0) {
      // 透明に近い白っぽいセル（alphaを落とす）
      p.fill(0, 0, 100, 20);
    } else {
      const hue = (baseHue + hueRange*Math.sin(Math.PI*(2*value-1)/2)/value ) % 360;
      const alpha = 60 + 40 * (Math.log(value + 1) / Math.log(mod)); 

      p.fill(hue, 80, 70, alpha); // 彩度・明度は固定
    }

    p.rect(x, y, scalar, scalar);
    x += scalar;
  }
};


// パスカルの三角形の計算をする
// 前の行を受け取り次の行を返す
const update = (updateState: updateStateFn, state: number[], mod: number) => {
  let newState: number[] = [];
  newState.push(1);
  for (let i = 0; i < state.length-1; i++) {
    // 足し算の段階で剰余計算を行う
    newState.push((state[i] + state[i+1]) % mod);
  }
  newState.push(1);
  updateState(newState);
}



