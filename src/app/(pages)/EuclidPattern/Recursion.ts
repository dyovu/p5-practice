import p5 from 'p5';

// 長方形による正方形の分割
// 引数には分割に使う長方形の横の長さ、縦横比、左上のx座標、左上のy座標を持つ
export const recurDivideSquare = (p: p5, thr:number, wd:number, ratio:number, xPos:number, yPos:number) => {
  let ittr = 0;
  let xEndPos = wd + xPos;
  let yEndPos = wd + yPos;
  let rem = wd;

  // wdは長方形の横の長さ, horizontalを引数に渡す
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
  p.fill(p.color(p.random(1), 0.5, 1));
  p.rect(xPos, yPos, rem, rem);

  while (rem > thr) {
    ittr++;
    if(ittr % 2 == 1) {
      while (xPos + rem*ratio < xEndPos+0.1) {
        console.log("y", rem, ratio, xPos, yPos);

        // p.fill(p.color(p.random(1), 1, 1));
        // p.rect(xPos, yPos, rem*ratio, rem);
        ratio > 1 ? recurDivideRectangle(p, thr, rem*ratio, ratio, xPos, yPos) : recurDivideRectangle(p, thr, rem, ratio, xPos, yPos);
        xPos += rem*ratio;
      }
      rem = xEndPos - xPos;
    } else {
      while (yPos + rem/ratio < yEndPos+0.1) {
        console.log("y", rem, ratio, xPos, yPos);

        // p.fill(p.color(p.random(1), 1, 1));
        // p.rect(xPos, yPos, rem, rem/ratio);
        ratio > 1 ? recurDivideRectangle(p, thr, rem, ratio, xPos, yPos) : recurDivideRectangle(p, thr, rem/ratio, ratio, xPos, yPos);
        yPos += rem/ratio;
      }
      rem = yEndPos - yPos;
    }
  }
}


// 正方形による長方形の分割
// 引数には長方形の長辺の長さ、縦横比、左上のx座標、左上のy座標を持つ
export const recurDivideRectangle = (p: p5, thr:number, wd:number, ratio:number, xPos:number, yPos:number) => {
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
    p.fill(p.color(p.random(1), 0.5, 1));
    p.rect(xPos, yPos, wd*ratio, wd);
  }else{
    xEndPos = wd + xPos;
    yEndPos = wd/ratio + yPos;
    rem = wd/ratio;
    ittr = 1;
    p.fill(p.color(p.random(1), 0.5, 1));
    p.rect(xPos, yPos, wd, wd/ratio);
  }

  while (rem > thr) {
    ittr++;
    if(ittr % 2 == 0) {
      while (xPos + rem <= xEndPos+ 0.1) { 
        recurDivideSquare(p, thr, rem, ratio, xPos, yPos);
        xPos += rem;
      }
      rem = xEndPos - xPos;
    } else {
      while (yPos + rem <= yEndPos + 0.1) {
        recurDivideSquare(p, thr, rem, ratio, xPos, yPos);
        yPos += rem;
      }
      rem = yEndPos - yPos;
    }
  }
}