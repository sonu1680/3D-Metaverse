import { Billboard, Text } from '@react-three/drei';
import React, { memo } from 'react'

export const CharacterNameOnHead = memo(({id}:{id:string}) => {
  return (
    <Billboard >
      <Text
        position={[0, 1.5, 0]}
        fontSize={0.25}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        {id}
      </Text>
    </Billboard>
  );
})

