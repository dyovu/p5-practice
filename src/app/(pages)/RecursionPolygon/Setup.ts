import p5 from 'p5';

const setup = (p: p5, position:any) => {
  p.createCanvas(600, 600);
  p.frameRate(20)
  p.background(255);
  p.stroke(0);
  p.strokeWeight(0.1);
  
};

export default setup;