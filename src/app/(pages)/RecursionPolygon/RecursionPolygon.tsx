'use client';

import React, { useEffect, useRef, useState} from 'react';
import p5 from 'p5';

import useWindowSize from '@/utils/GetWindowSize';
import setup from './Setup';
import draw from './Draw';

const RecursionPolygon = () => {
  const { height, width } = useWindowSize();
  const SHOULD_STOP = useRef(false); 
  const P5_INSTANCE = useRef<p5 | null>(null);

  const gap:number = 0.01;
  const nGon:number = 4;
  let position:any = [];
  // position = [[p.width/2, 0], [p.width, p.height/2], [p.width/2, p.height], [0, p.height/2]]
  position = [[600/2, 0], [600, 600/2], [600/2, 600], [0, 600/2]]
  

  let side_length = Math.sqrt((position[0][0]-position[1][0])**2 + (position[0][1]-position[1][1])**2);

  const initial_position = (p:p5, nGon:number) => {

  }


  const update = (p:p5, nGon:number, position:any, length:number) => {
    let new_position = []

    for (let i = 0; i < position.length; i++){
      // 2点間の座標からgap値を比率として新しい座標を求める
      let new_x = position[i][0]*(1-gap) + position[(i+1)%nGon][0]*gap;
      let new_y = position[i][1]*(1-gap) + position[(i+1)%nGon][1]*gap;
      new_position[i] = [new_x, new_y]
    }
    return new_position;
  }

  useEffect(() => {
    const sketch = (p: p5) => {
      p.setup = () => setup(p, position);
      p.draw = () => {
        console.log(SHOULD_STOP.current)
        draw(p, nGon, position);
        position = update(p, nGon, position, side_length);
        
        if (SHOULD_STOP.current){
          p.noLoop();
        }else{
          p.loop();
        }
      };
    };

    P5_INSTANCE.current = new p5(
      sketch,
      document.getElementById('p5-container')!
    );

    return () => {
      P5_INSTANCE.current?.remove();
    };
  }, []);



  const stopDrawing = () => {
    console.log('停止')
    SHOULD_STOP.current = true;
  };

  const reStartDrawing = () => {
    console.log('再開')
    // drawは停止状態だからdrawの中でloopを呼んでも意味ない、そのためここでloopを呼ぶ
    SHOULD_STOP.current = false;
    P5_INSTANCE.current?.loop();
  };


  return (
    <div>
      <button onClick={stopDrawing} style={{ marginTop: '10px', padding: '10px' }}>
        停止
      </button>
      <button onClick={reStartDrawing} style={{ marginTop: '10px', padding: '10px' }}>
        再開
      </button>
      <div id='p5-container'></div>
    </div>
  );
};

export default RecursionPolygon;
