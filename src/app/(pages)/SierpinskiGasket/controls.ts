
import p5 from 'p5';
import { MutableRefObject } from 'react';

export const updateState = (newState: number[], state: MutableRefObject<number[]>, ) => {
  state.current = newState;
}

export const resetDrawing = (
  state: MutableRefObject<number[]>, 
  generation: MutableRefObject<number>, 
  isStoped: MutableRefObject<boolean>,
  p5Instance: MutableRefObject<p5 | null>,
) => {
  state.current = [1];
  generation.current = 0;
  isStoped.current = false;
  
  if (p5Instance.current) {
      // キャンバスをクリア（背景色で塗りつぶし）
      p5Instance.current.background(255); // 白で塗りつぶし、または適切な背景色
      // または P5_INSTANCE.current.clear(); でも可
      
      // 描画を再開
      p5Instance.current.loop();
  }
};