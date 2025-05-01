
import p5 from 'p5';
import { divideSquare, divideRectangle } from './Divide';
import {recurDivideRectangle, recurDivideSquare} from './Recursion';

const setup = (p: p5) => {
  p.createCanvas(600, 600);
  p.frameRate(1);

  const WIDTH: number = p.width;
  const horizontal:number = 9;
  const vertical:number = 10;
  const thr:number = 10;
  // ratioは横/縦, ration > 1は横長, ratio < 1は縦長
  const ratio =  horizontal/vertical;

  let wd = WIDTH;
  let xPos = 0;
  let yPos = 0;

  p.colorMode(p.HSB, 1);
  p.noStroke();

  // divSquareのremには長方形の横, horizontalを引数に渡す
  // divideSquare(p, wd, ratio, xPos, yPos);
  // divideRectangle(p, wd, ratio, xPos, yPos);
  recurDivideSquare(p, thr, wd, ratio, xPos, yPos);

}
  

export default setup;








