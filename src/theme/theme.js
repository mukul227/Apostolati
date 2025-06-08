import { DarkTheme, DefaultTheme } from "@react-navigation/native";

export const theme = {
  light: {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: "#3c1053",
      secondary: "#ad5389",
      dotActive: "#13AE5C",
      activeInput: "#ad5389",
      inactiveInput: "#D8D8D8",
      warning_faded: "rgba(193, 11, 14, 0.15)",
      dotInactive: "#A1E0BF",
      error: "#C10B0E",
      text: "#212121",
      border: "#212121",

      white: "#FFFF",
      activeTab: "#FFFF",
      inActiveTab: "rgba(255, 255, 255, 0.6)",
      activeTabLabel: "#FFFFFF",
      inActiveTabLabel: "rgba(255, 255, 255, 0.6)",
      placeholderText: "#c2c2c2",
    },
  },
  dark: {
    ...DarkTheme,
    colors: {
      ...DarkTheme.colors,
      primary: "#3c1053",
      secondary: "#ad5389",
      dotActive: "#13AE5C",
      dotInactive: "#A1E0BF",
      activeInput: "#ad5389",
      inactiveInput: "#D8D8D8",
      error: "#C10B0E",
      warning_faded: "rgba(193, 11, 14, 0.1)",
      text: "#FFFFFF",
      border: "#FFFFFF",
      activeTab: "#FFFF",
      inActiveTab: "rgba(255, 255, 255, 0.6)",
      activeTabLabel: "#FFFFFF",
      inActiveTabLabel: "rgba(255, 255, 255, 0.6)",
      white: "#FFFF",
      placeholderText: "#c2c2c2",
    },
  },
};
