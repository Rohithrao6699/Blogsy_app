import { create } from "zustand";

export const usePaginationStore = create((set) => ({
  totalPages: null,
  currentPage: 1,
  limit: 6,
  setTotalPages: (data) => set({ totalPages: data }),
  setcurrentPage: (data) => set({ currentPage: data }),
}));
