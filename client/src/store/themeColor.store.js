import { create } from 'zustand';

const themeColorStore = create((set) => ({
    theme: localStorage.getItem("color-theme") || "light",
    setTheme: () => set((state) => {
        let newTheme = state.theme === "light" ? "dark" : "light";
        localStorage.setItem("color-theme", newTheme);

        return {theme: newTheme}
    })
}))

export default themeColorStore;