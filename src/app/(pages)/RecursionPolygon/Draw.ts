import p5 from 'p5';

const draw = (p:p5, n_gon:number, position:any) => {
  for (let i = 0; i < position.length; i++){
    p.line(position[i][0], position[i][1], position[(i+1)%n_gon][0], position[(i+1)%n_gon][1])
  }

};


export default draw;