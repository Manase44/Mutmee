import { create } from "zustand";

const useShoPostMenu = create((set) => ({
  showPostMenu: null,
  setShowPostMenu: (passedBoolean) =>
    set({
      showPostMenu: passedBoolean,
    }),
}));

export default useShoPostMenu;
