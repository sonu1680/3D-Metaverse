import { atom } from "recoil";

export const peerIdAtom = atom<string|null>({
  key: "peerIdAtom",
  default: null,
});

