import p5 from 'p5';
import { MutableRefObject } from 'react';


export const stopDrawing = (isStopedRef: MutableRefObject<boolean>) => {
  isStopedRef.current = true;
};


export const reStartDrawing = (
  isStopedRef: MutableRefObject<boolean>, 
  p5Instance: MutableRefObject<p5 | null>
) => {
  isStopedRef.current = false;
  p5Instance.current?.loop();
};