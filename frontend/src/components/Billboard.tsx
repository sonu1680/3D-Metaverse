import { Billboard, Plane } from '@react-three/drei';
import React, { memo, Suspense, useEffect } from 'react'
import { VideoMaterial } from './videoMaterial';

export const MemoizedVideoBillboard = memo(({ videoSrc,refs ,args,type}: { videoSrc: any |null,refs:any,args:any,type:string}) => {

  return (
    <Billboard ref={refs}>
      <Plane position-y={type==='remote'?6:3} args={args}>
        <Suspense fallback={<meshStandardMaterial wireframe />}>
          <VideoMaterial src={videoSrc} />
        </Suspense>
      </Plane>
    </Billboard>
  );
});


export default Billboard