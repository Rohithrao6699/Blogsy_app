import { create } from "zustand";

export const useAuthorBlogs = create((set) => ({
  authorBlogs: [],
  setAuthorBlogs: (data) => set({ authorBlogs: data }),
}));
