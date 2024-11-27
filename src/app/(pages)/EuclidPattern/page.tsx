'use client';

import dynamic from 'next/dynamic';
import React, { useEffect } from 'react';

const EuclidPattern = dynamic(() => import('./DrawEuclidPattern'), {
  ssr: false,
});

const DrawEuclidPatternPage = () => {
  return (
    <div>
      <h1> ユークリッドパターン</h1> 
      <EuclidPattern />
    </div>
  );
};

export default DrawEuclidPatternPage;
