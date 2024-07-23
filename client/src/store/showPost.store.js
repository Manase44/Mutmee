import { create } from "zustand";

const useShowPost = create((set) => ({
  showPost: null,
  setShowPost: (passedBoolean) =>
    set({
      showPost: passedBoolean,
    }),
}));

export default useShowPost;
