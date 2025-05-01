'use client';

import dynamic from 'next/dynamic';
import React from 'react';

const LogarithmicSpiral = dynamic(() => import('./DrawLogarithmicSpiral'), {
  ssr: false,
});

const LogarithmicSpiralPage = () => {
  return (
    <div>
      <h1> 対数螺旋 </h1>
      <LogarithmicSpiral />
    </div>
  );
}

export default LogarithmicSpiralPage;
