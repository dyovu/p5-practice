
import p5 from 'p5';

const draw = (p: p5, img:p5.Image) => {
  // Get the color of a random pixel.
  
  const drawPixel = () => {
    img.loadPixels();
    const pixelX = p.random(p.width);
    const pixelY = p.random(p.height);
    const pixelColor = img.get(pixelX, pixelY);

    // Paint that pixel with a circle.
    p.fill(pixelColor);
    p.triangle(pixelX, pixelY, pixelX+10+p.random()*10, pixelY, pixelX+5+p.random()*10, pixelY+10+p.random()*10);
  }

  for (let i = 0; i < 100; i++) {
    drawPixel();
  }
  
}
  
export default draw;
