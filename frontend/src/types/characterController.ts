export interface CharacterControllerProps {
  position: [number, number, number]; // Player's initial position in 3D space
  id: string; // Unique player ID
  color: string; // Character color
  myVideo?: any;
  remoteVideo?: MediaStream;
  rotation: any
}
