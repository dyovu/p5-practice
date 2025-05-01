'use client';

import dynamic from 'next/dynamic';
import React from 'react';

const EuclidPattern = dynamic(() => import('./DrawEuclidPattern'), {
  ssr: false,
});

const EuclidPatternPage = () => {
  return (
    <div>
      <h1> ユークリッドパターンの描画</h1> 
      <EuclidPattern />
    </div>
  );
};

export default EuclidPatternPage;
