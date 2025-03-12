import { useVideoTexture } from "@react-three/drei";
import { DoubleSide } from "three";

export const VideoMaterial = ({ src }:any) => {
  const texture = useVideoTexture(src);
  return (
    <meshStandardMaterial side={DoubleSide} map={texture} toneMapped={false} />
  );
};

