import { createAsyncThunk } from "@reduxjs/toolkit";
import { updateTheme } from "../features/themeSlice";

export const ThemeOptions = [
    {
        id:1,
        primary: "--energy-blue",
        mid: "--energy-mid-blue",
        secondary: "--energy-purple",
    },
    {
        id:2,
        primary: "--theme-1-primary",
        mid: "--theme-1-mid",
        secondary: "--theme-1-secondary",
    },
    {
        id:3,
        primary: "--theme-2-primary",
        mid:"--theme-2-mid",
        secondary: "--theme-2-secondary",
    },
    {
        id:4,
        primary: "--theme-3-primary",
        mid: "--theme-3-mid",
        secondary: "--theme-3-secondary",
    }
]   

export const updateRoot = (themeId) => (dispatch) => {
  const root = document.documentElement;
  const theme = ThemeOptions[themeId - 1]; 
  if (!theme) return;

  root.style.setProperty("--primary-colour", `var(${theme.primary})`);
  root.style.setProperty("--primary-second-colour", `var(${theme.secondary})`);
  root.style.setProperty("--primary-third-colour", `var(${theme.mid})`);
  root.style.setProperty("--gradient-start-colour", `var(${theme.primary})`);
  root.style.setProperty("--gradient-end-colour", `var(${theme.secondary})`);

  dispatch(updateTheme(themeId));
};