import { create } from "zustand";

const useRefferedUserStore = create((set) => ({
  refferedUser: "",
  setRefferedUser: (passedUser) =>
    set({
      user: passedUser,
    }),
}));

export default useRefferedUserStore;
