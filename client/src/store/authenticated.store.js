import { create } from "zustand";

const authenticatedStore = create((set) => ({
  isAuthenticated: JSON.parse(localStorage.getItem("isAuthenticated")),
  setIsAuthenticated: (passedArgument) => {
    localStorage.setItem("isAuthenticated", JSON.stringify(passedArgument));
    set({
      isAuthenticated: passedArgument,
    });
  },
}));

export default authenticatedStore;
