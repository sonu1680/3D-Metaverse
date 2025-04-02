import { atom } from "recoil";

export const myPostiotionAtom = atom<[number,number,number]|null>({
  key: "myPostiotionAtom",
  default: [0,0,0],
});


export const videoUserAtom = atom<string[]>({
  key: "videoUserAtom",
  default: [],
});


export const isPlayerCloseAtom = atom<any>({
  key: "isPlayerCloseAtom",
  default: false,
});

