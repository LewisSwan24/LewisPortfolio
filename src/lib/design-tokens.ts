export const tokens = {
  bg: { parchment: "#f6f4ef", ivory: "#fcfbf8", sand: "#ece8df" },
  text: { primary: "#151412", secondary: "#4a453d", tertiary: "#5c564d" },
  border: { cream: "#dbd5c9", warm: "#9e9689" },
  accent: { moss: "#a63f2a", mossHover: "#7a2d1c" },
  semantic: { success: "#3b5e42", error: "#a63f2a", focus: "#2b4d6f" },
  dark: { surface: "#181816", bg: "#111110", surfaceElevated: "#222220" },
} as const;

export type Tokens = typeof tokens;
