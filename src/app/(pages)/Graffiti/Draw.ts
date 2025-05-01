
import p5 from 'p5';

const draw = (p: p5) => {
  p.background(p.noise(p.frameCount) * 255);
}
  
export default draw;