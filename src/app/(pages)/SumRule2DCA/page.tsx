'use client';

import dynamic from 'next/dynamic';
import React from 'react';

const SumRule2DCA = dynamic(() => import('./SumRule2DCA'), {
  ssr: false,
});

const DrawSumRule2DCA = () => {
  return (
    <div> 
      <h1> SumRule2DCAのページです </h1>
      <SumRule2DCA />
    </div>
  );
}

export default DrawSumRule2DCA;
