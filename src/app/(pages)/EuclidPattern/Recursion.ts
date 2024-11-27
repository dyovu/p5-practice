import p5 from 'p5';

export const ans_divideRectangle = (p: p5, wd:number, ratio:number, xPos:number, yPos:number) => {
  const WIDTH: number = p.width;
  let ittr = 0;
  let numA;
  let numB;
  let rem = WIDTH*ratio;
  while (rem > 0.1) {
    ittr++;
    if(ittr % 2 == 1) {
      while (xPos + rem < WIDTH+0.1) { 
        ans_divideSquare(p, rem, ratio, xPos, yPos);
        xPos += rem;
      }
      rem = WIDTH - xPos;
    } else {
      while (yPos + rem < WIDTH*ratio +0.1) {
        ans_divideSquare(p, rem, ratio, xPos, yPos);
        yPos += rem;
      }
      rem = WIDTH*ratio - yPos;
    }
    if (rem <= 0) break;
  }
}

export const ans_divideSquare = (p: p5, wd:number, ratio:number, xPos:number, yPos:number) => {
  const WIDTH: number = p.width;
  let ittr = 0;
  let rem = wd
  let xEndPos = wd + xPos;
  let yEndPos = wd + yPos;
  
  while (rem > 0.1) {
    ittr++;
    if(ittr % 2 == 1) {
      while (xPos + rem*ratio < xEndPos+0.1) { // ratioが1より大きいと1回目は rem*ratio = WIDTH*ratio > WIDTHとなる
        p.fill(p.color(p.random(1), 1, 1));
        p.rect(xPos, yPos, rem*ratio, rem);
        // ここで再帰呼び出し、長方形を正方形で分割
        console.log("x", rem, ratio, xPos, yPos);
        xPos += rem*ratio;
      }
      rem = xEndPos - xPos;
    } else {
      while (yPos + rem/ratio < yEndPos+0.1) { // remは
        p.fill(p.color(p.random(1), 1, 1));
        p.rect(xPos, yPos, rem, rem/ratio);
        console.log("y", rem, ratio, xPos, yPos);
        yPos += rem/ratio;
      }
      rem = yEndPos - yPos;
    }
  }
}