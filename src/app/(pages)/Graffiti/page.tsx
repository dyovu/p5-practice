'use client';

import dynamic from 'next/dynamic';
import React from 'react';

const Graffiti = dynamic(() => import('./Graffiti'), {
  ssr: false,
});

const DrawGraffiti = () => {
  return (
    <div>
      <h1> 落書き的になんでも描いていいスペース</h1> 
      <Graffiti />
    </div>
  );
};

export default DrawGraffiti;
