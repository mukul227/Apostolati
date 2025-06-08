import { StyleSheet } from "react-native";
import { fonts } from "@/theme";
import { useTheme } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
export const style = () => {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  return StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
      paddingTop: insets.top,
    },
    icon: {
      height: 66,
      width: 75.92,
    },
    title: {
      fontSize: 32,
      fontFamily: fonts.Poppins.medium,
    },
    description: {
      fontSize: 12,
      fontFamily: fonts.Poppins.medium,
      color: "#7E7E7E",
    },
    label: {
      fontSize: 12,
      fontFamily: fonts.Poppins.medium,
      color: "#4F4F4F",
    },
  });
};
