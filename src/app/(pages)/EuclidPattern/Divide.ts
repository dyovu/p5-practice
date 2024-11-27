import p5 from 'p5';

// 長方形による正方形の分割
export const divideSquare = (p: p5, wd:number, ratio:number, xPos:number, yPos:number) => {
  const WIDTH: number = p.width;
  let ittr = 0;
  
  /*
    正方形の終わりを設定
    使わないかも
  */
  let xEndPos = wd + xPos;
  let yEndPos = wd + yPos;
  // remは再帰のために正方形の一辺の長さを持つ
  let rem = wd;

  let numA;
  let numB;
  // wdは何センチの正方形を分割するかの値を持つ
  // 縦長 (ratio < 1)のときは縦に分割 xPosを増やす
  // 縦に分割するためittrを0から始める
  // 横長 (ratio > 1)のときは横に分割 yPosを増やす
  // 横に分割するためittrを1から始める


  if (ratio < 1) {
    numB = wd;
    numA = wd*ratio;
    ittr = 0;
  }else{
    numA = wd;
    numB = wd/ratio;
    ittr = 1;
  }

  while (rem > 0.1) {
    ittr++;
    if(ittr % 2 == 1) {
      while (xPos + rem*ratio < xEndPos+0.1) {
        p.fill(p.color(p.random(1), 1, 1));
        p.rect(xPos, yPos, rem*ratio, rem);
        // divideRectangle(p, rem, ratio, xPos, yPos, 1);
        xPos += rem*ratio;
      }
      rem = xEndPos - xPos;
    } else {
      while (yPos + rem/ratio < yEndPos+0.1) {
        p.fill(p.color(p.random(1), 1, 1));
        p.rect(xPos, yPos, rem, rem/ratio);
        // divideRectangle(p, rem, ratio, xPos, yPos, 0);
        yPos += rem/ratio;
      }
      rem = yEndPos - yPos;
    }
  }
}


// 正方形による長方形の分割
export const divideRectangle = (p: p5, wd:number, ratio:number, xPos:number, yPos:number, flag:number) => {
  let ittr = 0;
  let rem = wd*ratio;

  while (rem > 0.1) {
    ittr++;
    if(ittr % 2 == 0) {
      while (xPos + rem <= wd*ratio) { 
        p.fill(p.color(p.random(1), 1, 1));
        p.rect(xPos, yPos, rem, rem);
        xPos += rem;
      }
      rem = wd*ratio - xPos;
    } else {
      while (yPos + rem < wd) {
        p.fill(p.color(p.random(1), 1, 1));
        p.rect(xPos, yPos, rem, rem);
        yPos += rem;
      }
      rem = wd - yPos;
    }
    if (rem <= 0) break;
  }
}
