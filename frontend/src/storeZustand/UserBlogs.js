import { create } from "zustand";

export const useUserBlogs = create((set) => ({
  myBlogs: [],
  editState: null,
  setMyBlogs: (data) => set({ myBlogs: data }),
  setEditState: (data) => set({ editState: data }),
}));
