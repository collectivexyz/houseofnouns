const defaultPalette: any = {
  lightPrimary: "#202020",
  lightSecondary: "#e1e1e1",
  darkPrimary: "#d4d4d4",
  darkSecondary: "#303030",
  lightContrast: "#fff",
  darkContrast: "#000",
} as const;

export function getPaletteStyle(palette: any) {
  return Object.fromEntries(
    Object.entries(palette).map(([name, value]) => [
      `--${name}`,
      value || defaultPalette[name],
    ])
  );
}
