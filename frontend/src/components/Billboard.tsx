import { Billboard, Plane } from '@react-three/drei';
import React, { memo, Suspense } from 'react'
import { VideoMaterial } from './videoMaterial';

export const MemoizedVideoBillboard = React.memo(({ videoSrc,ref ,args}: { videoSrc: MediaStream |null,ref:any,args:any}) => {
  return (
    <Billboard>
      <Plane position-y={3} args={args}>
        <Suspense fallback={<meshStandardMaterial wireframe />}>
          <VideoMaterial src={videoSrc} />
        </Suspense>
      </Plane>
    </Billboard>
  );
});


export default Billboard