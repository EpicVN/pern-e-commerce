import { create } from "zustand";

export const useThemeStore = create((set) => ({
  theme: localStorage.getItem("preferredTheme") || "pastel",
  setTheme: (theme) => {
    localStorage.setItem("preferredTheme", theme);
    set({ theme });
  },
}));
