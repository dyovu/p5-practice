import p5 from 'p5';

const setup = (p: p5) => {
  p.createCanvas(600, 600);
  p.frameRate(30);
  p.colorMode(p.HSB);
  // p.colorMode(p.RGB);
};

export default setup;