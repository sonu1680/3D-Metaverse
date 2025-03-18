export interface CharacterControllerProps {
  host: boolean; // Whether the player is the host
  position: [number, number, number]; // Player's initial position in 3D space
  id: string; // Unique player ID
  color: string; // Character color
  remoteAnimation?: string; // Animation state received from the server
  myVideo?: any;
  remoteVideo?: MediaStream;
  rotation: any
}
