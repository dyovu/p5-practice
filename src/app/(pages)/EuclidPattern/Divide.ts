import p5 from 'p5';

// 長方形による正方形の分割
// 引数には正方形の一片の長さ、縦横比、左上のx座標、左上のy座標を持つ
export const divideSquare = (p: p5, wd:number, ratio:number, xPos:number, yPos:number) => {
  let ittr = 0;
  let xEndPos = wd + xPos;
  let yEndPos = wd + yPos;
  // remは再帰のために分割される正方形の一辺の長さを持つ
  let rem = wd;

  // 引数wdは何センチの正方形を分割するかの値を持つ
  // 縦長 (ratio < 1)のときは縦に分割 xPosを増やす
  // 縦に分割するためittrを0から始める
  // 横長 (ratio > 1)のときは横に分割 yPosを増やす
  // 横に分割するためittrを1から始める

  if (ratio < 1) {
    ittr = 0;
  }else{
    ittr = 1;
  }

  while (rem > 0.1) {
    ittr++;
    if(ittr % 2 == 1) {
      while (xPos + rem*ratio < xEndPos+0.1) {
        p.fill(p.color(p.random(1), 1, 1));
        p.rect(xPos, yPos, rem*ratio, rem);
        // ratio > 1 ? divideRectangle(p, rem*ratio, ratio, xPos, yPos) : divideRectangle(p, rem, ratio, xPos, yPos);
        // console.log("y", rem, ratio, xPos, yPos);
        xPos += rem*ratio;
      }
      rem = xEndPos - xPos;
    } else {
      while (yPos + rem/ratio < yEndPos+0.1) {
        p.fill(p.color(p.random(1), 1, 1));
        p.rect(xPos, yPos, rem, rem/ratio);
        // ratio > 1 ? divideRectangle(p, rem, ratio, xPos, yPos) : divideRectangle(p, rem/ratio, ratio, xPos, yPos);
        // console.log("y", rem, ratio, xPos, yPos);
        yPos += rem/ratio;
      }
      rem = yEndPos - yPos;
    }
  }
}


// 正方形による長方形の分割
// 引数には長方形の長辺の長さ、縦横比、左上のx座標、左上のy座標を持つ
export const divideRectangle = (p: p5, wd:number, ratio:number, xPos:number, yPos:number) => {
  let ittr = 0;
  let rem;
  let xEndPos;
  let yEndPos;

  // 引数wdの値は長方形の長辺の長さにする
  // そこからrationを考慮して短編の長さを計算する
  // remは必ず短辺の長さにする
  if (ratio < 1) {
    xEndPos = wd*ratio + xPos;
    yEndPos = wd + yPos;
    rem = wd*ratio;
    ittr = 0;
  }else{
    xEndPos = wd + xPos;
    yEndPos = wd/ratio + yPos;
    rem = wd/ratio;
    ittr = 1;
  }

  while (rem > 0.1) {
    ittr++;
    if(ittr % 2 == 0) {
      while (xPos + rem <= xEndPos+ 0.1) { 
        p.fill(p.color(p.random(1), 1, 1));
        p.rect(xPos, yPos, rem, rem);
        xPos += rem;
      }
      rem = xEndPos - xPos;
    } else {
      while (yPos + rem <= yEndPos + 0.1) {
        p.fill(p.color(p.random(1), 1, 1));
        p.rect(xPos, yPos, rem, rem);
        yPos += rem;
      }
      rem = yEndPos - yPos;
    }
  }
}
