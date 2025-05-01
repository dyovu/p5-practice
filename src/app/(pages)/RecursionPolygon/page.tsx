'use client';

import dynamic from 'next/dynamic';
import React from 'react';

const RecursionPolygon = dynamic(() => import('./RecursionPolygon'), {
  ssr: false,
});

const DrawRecursionPolygon = () => {
  return (
    <div>
      <h1> 正多角形の再帰的な描画 </h1>
      <RecursionPolygon />
    </div>
  );
}

export default DrawRecursionPolygon;
