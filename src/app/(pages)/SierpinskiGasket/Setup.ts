import p5 from 'p5';

const setup = (p: p5) => {
  p.createCanvas(600, 600);
  p.frameRate(10);
  p.colorMode(p.HSB);
};

export default setup;