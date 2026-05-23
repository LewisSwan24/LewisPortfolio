export const tokens = {
  bg: { parchment: "#efe8da", ivory: "#f7f4ec", sand: "#e7dfd1" },
  text: { primary: "#161412", secondary: "#756d61", tertiary: "#8e8578" },
  border: { cream: "#d6cdbc", warm: "#b8ad9d" },
  accent: { moss: "#c9523a", mossHover: "#a63f2a" },
  semantic: { success: "#166534", error: "#b53333", focus: "#3898ec" },
  dark: { surface: "#30302e", bg: "#161412" },
} as const;

export type Tokens = typeof tokens;
