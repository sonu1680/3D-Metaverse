import { atom } from "recoil";

export const authAtom = atom<{name:string|null,session:string|null,email:string|null}>({
  key: "authAtom",
  default: {name:null,session:null,email:null},
});