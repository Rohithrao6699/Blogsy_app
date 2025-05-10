import { create } from "zustand";
export const useBlogStore = create((set) => ({
  blogs: [],
  setBlogs: (data) => set({ blogs: data }),
}));
