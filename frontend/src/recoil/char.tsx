'use client'


import { atom } from "recoil";

export const characterAtom = atom({
  key: "characterAtom",
  default:[]
});

export const mapAtom = atom({
  key: "mapAtom",
  default: null,
});

export const userAtom = atom({
  key: "userAtom",
  default: null,
});

export const userNameAtom = atom<any>({
  key: "userNameAtom",
  default: null,
});
