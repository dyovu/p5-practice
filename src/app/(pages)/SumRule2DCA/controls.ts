
import p5 from 'p5';
import { MutableRefObject } from 'react';


export const updateCells = (newCells: number[][], cells: MutableRefObject<number[][] >) => {
  cells.current = newCells;
}

export const resetDrawing = (
  isStoped: MutableRefObject<boolean>,
  p5Instance: MutableRefObject<p5 | null>,
) => {
  isStoped.current = false;
  
  if (p5Instance.current) {
      // キャンバスをクリア（背景色で塗りつぶし）
      p5Instance.current.background(255); // 白で塗りつぶし、または適切な背景色
      // または p5Instance.current.clear(); でも可
      
      // 描画を再開
      p5Instance.current.loop();
  }
};