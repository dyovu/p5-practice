import p5 from 'p5';
import { MutableRefObject } from 'react';

import { updateCells } from './controls';

const initialize_matrix = (width: number, cells: MutableRefObject<number[][]>, cellPerSide:number) => {
  const newCells: number[][] = [];
  const center = Math.floor((cellPerSide-1)/2);
  
  for (let i=0; i < cellPerSide; i++) {
    const row: number[] = [];
    for (let j=0; j < cellPerSide; j++) {
      if (i === center && j === center) {
        row.push(1);
      } else {
        row.push(0);
      }
    }
    newCells.push(row);
  }
  updateCells(newCells, cells);
}


const setup = (p: p5, cells: MutableRefObject<number[][]>, cellPerSide: number) => {
  p.createCanvas(600, 600);
  p.frameRate(15);
  p.colorMode(p.HSB);
  p.rectMode(p.CENTER);

  p.line(0, 0, 0, p.height);
  p.line(0, 0, p.width, 0);
  p.line(p.width, 0, p.width, p.height);
  p.line(0, p.height, p.width, p.height);
  p.noStroke();

  initialize_matrix(p.width, cells, cellPerSide);
};

export default setup;