import { chatTypes } from "@/types/chatTypes";
import { atom } from "recoil";

export const chatAtom = atom<chatTypes[]>({
  key: "chatAtom",
  default: [],
});