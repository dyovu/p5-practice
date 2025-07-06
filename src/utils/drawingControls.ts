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

export const toggleDrawing = (
  isStopedRef: MutableRefObject<boolean>, 
  p5Instance: MutableRefObject<p5 | null>,
  setIsStopedDisplay: (value: boolean) => void
) => {
  isStopedRef.current = !isStopedRef.current;
  if (isStopedRef.current) {
    p5Instance.current?.noLoop();
  }else{
    p5Instance.current?.loop();
  }
  setIsStopedDisplay(isStopedRef.current);
};
