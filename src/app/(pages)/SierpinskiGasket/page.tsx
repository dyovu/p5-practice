'use client';

import dynamic from 'next/dynamic';
import React from 'react';

const SierpinskiGasket = dynamic(() => import('./SierpinskiGasket'), {
  ssr: false,
});

const DrawSierpinskiGasket = () => {
  return (
    <div> 
      <h1> SierpinskiGasketのページです </h1>
      <SierpinskiGasket />
    </div>
  );
}

export default DrawSierpinskiGasket;
