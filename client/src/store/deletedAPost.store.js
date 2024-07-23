import { create } from "zustand";

const useDeletedAPostStore = create((set) => ({
  postDeleted: null,
  setPostDeleted: (passedBoolean) =>
    set({
      postDeleted: passedBoolean,
    }),
}));

export default useDeletedAPostStore;
