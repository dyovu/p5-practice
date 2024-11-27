import p5 from 'p5';

const draw = (p: p5) => {
  p.background(200);
  p.ellipse(p.mouseX, p.mouseY, 50, 50);
};

export default draw;
