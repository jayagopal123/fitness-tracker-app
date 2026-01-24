const tintColorLight = "#2f95dc";
const tintColorDark = "#00F0FF"; // Neon Cyan

// Force Dark Mode aesthetics even for light theme variable names if needed,
// or just rely on 'dark' key.
// User requested "Dark one preffered always".
// We will set the 'light' theme to be a slightly lighter dark theme or just identical to dark.

const commonColors = {
  tint: tintColorDark,
  background: "#0F172A", // Deep Slate Blue/Black
  card: "rgba(30, 41, 59, 0.7)", // Glassy Card
  text: "#F8FAFC", // Off-white
  border: "rgba(148, 163, 184, 0.2)",
  success: "#4ADE80", // Neon Green
  warning: "#FACC15",
  danger: "#F87171",
  tabIconDefault: "#64748B",
  tabIconSelected: tintColorDark,
};

export default {
  light: {
    ...commonColors,
    // Overriding light to still look dark/modern as requested
    background: "#0F172A",
    text: "#F8FAFC",
    tint: tintColorDark,
    tabIconDefault: "#64748B",
    tabIconSelected: tintColorDark,
  },
  dark: {
    ...commonColors,
  },
};
