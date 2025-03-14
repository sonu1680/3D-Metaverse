export const isPlayerClose = (
  myPos: number[],
  otherPos: number[],
  threshold: number = 5
) => {
  const [myX, , myZ] = myPos;
  const [otherX, , otherZ] = otherPos;
  const distanceX = Math.abs(myX - otherX);
  const distanceZ = Math.abs(myZ - otherZ);
  return distanceX <= threshold && distanceZ <= threshold;
};


