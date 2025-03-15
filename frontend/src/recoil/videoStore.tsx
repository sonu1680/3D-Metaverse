import { atom } from "recoil";

export const myVideoState = atom<MediaStream | null>({
  key: "myVideoState",
  default: null,
});

export const remoteVideoState = atom<MediaStream | null>({
  key: "remoteVideoState",
  default: null,
});
