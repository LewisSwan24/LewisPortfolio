export const tokens = {
  bg: { parchment: "#f5f4ed", ivory: "#faf9f5", sand: "#e8e6dc" },
  text: { primary: "#141413", secondary: "#5e5d59", tertiary: "#87867f" },
  border: { cream: "#f0eee6", warm: "#e8e6dc" },
  accent: { moss: "#4a5d3a", mossHover: "#3d4d2f" },
  semantic: { success: "#166534", error: "#b53333", focus: "#3898ec" },
  dark: { surface: "#30302e", bg: "#141413" },
} as const;

export type Tokens = typeof tokens;
