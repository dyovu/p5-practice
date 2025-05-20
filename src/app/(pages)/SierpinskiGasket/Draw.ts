
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
  // console.log('drawCell, generation: ', gen)
  // console.log('mod: ', mod, 'num: ', num, 'width: ', width)
  let scalar = width/num;
  let x = (width - state.length*scalar)*0.5;
  let y = gen*scalar;
  p.noStroke();
  for (let i=0; i < state.length; i++) {
    let colorValue = (state[i] % mod) || mod; // 0になる場合はmodの値を使用
    p.fill(120*colorValue, 100*colorValue, 100);
    // RGBモード
    p.fill(100*(state[i]%mod), 200*(state[i]%mod), 200*(state[i]%mod));
    // p.fill(255, 0, 0);

    // HSBモード
    // HSBモードの改良版
    p.fill(((120*(state[i]%mod)) + 30)%360, 80 + 20*(state[i]%mod)/mod, 80 + 20*(state[i]%3)/3);

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



