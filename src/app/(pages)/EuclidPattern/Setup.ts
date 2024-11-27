
import p5 from 'p5';
import { divideSquare, divideRectangle } from './Divide';
import {ans_divideRectangle } from './Recursion';

const setup = (p: p5) => {
  p.createCanvas(600, 600);
  p.frameRate(1);

  const WIDTH: number = p.width;
  const horizontal:number = 13;
  const vertical:number = 5;
  const thr:number = 3;
  // ratioは横/縦, ration > 1は横長, ratio < 1は縦長
  const ratio =  horizontal/vertical;

  let rem = WIDTH;
  let ittr = 0;
  let xPos = 0;
  let yPos = 0;

  p.colorMode(p.HSB, 1);
  // p.noStroke();

  divideSquare(p, rem, ratio, xPos, yPos);
  // ans_divideRectangle(p, rem, ratio, xPos, yPos);
  // divideRectangle(p);
};

export default setup;








