
import p5 from 'p5';

const setup = (p: p5, img:p5.Image) => {
  p.createCanvas(600, 600);
  p.frameRate(120);
  img.resize(p.width, p.height);
  p.noStroke();
}
  
export default setup;








