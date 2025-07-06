
import { Dispatch, SetStateAction, MutableRefObject } from 'react';
import p5 from 'p5';

import { updateCells } from './controls';


const drawCell = (
  p: p5, 
  cells: MutableRefObject<number[][]>, 
  mod: number,
  cellSize: number,
  firstCordinate: number
) => {
  let x = firstCordinate;
  let y = firstCordinate;

  for (let i = 0; i < cells.current.length; i++) { // 行
    for (let j = 0; j < cells.current[i].length; j++) { // 列
      const value = cells.current[i][j];
      if (value === 0) {
        p.fill(0, 0, 100, 20); // 透明に近い白っぽいセル
      } else {
        const hue = (150 + 150 * Math.sin(Math.PI * (2 * value - 1) / 2) / value) % 360;
        const alpha = 80 + 20 * (Math.log(value + 1) / Math.log(mod)); // ログスケールで透明度を調整
        p.fill(hue, 80, 70, alpha); // 彩度・明度は固定
      }

      p.rect(x, y, cellSize, cellSize);
      x += cellSize;
    }
    y += cellSize;
    x = firstCordinate;
  }
}

const fourNeigbors = (i: number, j: number, mod: number, cells: number[][], cellPerSide: number): number => {
  let sum = 0;
  sum += cells[i][j]
    + cells[(i-1+cellPerSide) % cellPerSide][j]
    + cells[(i+1) % cellPerSide][j]
    + cells[i][(j-1+cellPerSide) % cellPerSide]
    + cells[i][(j+1) % cellPerSide];
  return sum % mod;
}

const update = (cells: MutableRefObject<number[][]>, mod: number, cellPerSide: number) => {
  const newCells: number[][] = [];
  for (let i = 0; i < cells.current.length; i++) {
    newCells[i] = [];
    for (let j = 0; j < cells.current[i].length; j++) {
      
      newCells[i][j] = fourNeigbors(i, j, mod, cells.current, cellPerSide);
    }
  }
  updateCells(newCells, cells);
}


const draw = (
  p:p5,
  cells: MutableRefObject<number[][]>,
  cellPerSide: number,
  generation: MutableRefObject<number>,
  mod: number,
  cellSize: number,
  firstCordinate: number,
  frameRate: number,
  isStoped: boolean,
) => {
  console.log("cellSize", cellSize);
  console.log("firstCordinate", firstCordinate);

  if (isStoped) {
    return; // 停止状態なら何もしない
  }

  p.frameRate(frameRate);

  drawCell(p, cells, mod, cellSize, firstCordinate);
  update(cells, mod, cellPerSide);
  generation.current++;
};

export default draw;