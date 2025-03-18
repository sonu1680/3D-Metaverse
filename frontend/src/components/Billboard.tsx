import { Billboard, Plane } from '@react-three/drei';
import React, { memo, Suspense, useEffect } from 'react'
import { VideoMaterial } from './videoMaterial';

export const MemoizedVideoBillboard = memo(({ videoSrc,refs ,args}: { videoSrc: any |null,refs:any,args:any}) => {

  return (
    <Billboard ref={refs}>
      <Plane position-y={3} args={args}>
        <Suspense fallback={<meshStandardMaterial wireframe />}>
          <VideoMaterial src={videoSrc} />
        </Suspense>
      </Plane>
    </Billboard>
  );
});


export default Billboard