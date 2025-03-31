import { atom } from "recoil";

export const roomAtom = atom({
  key: "roomAtom",
  default: null,
});




export const videRoomAtom = atom<string|null>({
  key: "videRoomAtom",
  default: null,
});


