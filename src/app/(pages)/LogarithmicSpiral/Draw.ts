import p5 from 'p5';

const draw = (p: p5, theta:number, step:number) => {
  drawLogarithmicSpiral(p, theta, step);
};

const drawLogarithmicSpiral = (p: p5, theta:number, STEP:number) => {
  p.translate(p.width / 2, p.height / 2);
  p.line(rad(theta)*Math.cos(theta), rad(theta)*Math.sin(theta), rad(theta+STEP)*Math.cos(theta+STEP), rad(theta+STEP)*Math.sin(theta+STEP));
  console.log("theta", theta);
}

const rad = (t:number) => {
  console.log("t", t);
  let r:number;
  r = 5*t;
  // r = (5*t+Math.sin(t)*5)/3;
  // r = 20*Math.sqrt(t);
  // r = t^5;
  // console.log("r", r);
  // r = Math.pow(1.1, t);
  return r;
}

export default draw;