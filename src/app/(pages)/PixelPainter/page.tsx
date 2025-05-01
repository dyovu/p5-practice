'use client';

import dynamic from 'next/dynamic';
import React from 'react';

const PixelPainter = dynamic(() => import('./PixelPainter'), {
  ssr: false,
});

const DrawPixelPainter = () => {
  return (
    <div>
      <h1> ピクセルぺいんと</h1> 
      <PixelPainter />
    </div>
  );
};

export default DrawPixelPainter;
