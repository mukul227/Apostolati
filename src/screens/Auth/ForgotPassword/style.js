import { StyleSheet } from "react-native";
import { fonts, ShadowStyles } from "@/theme";
import { useTheme } from "@react-navigation/native";
import { ms } from "@/utils/scaling-utils";
export const style = () => {
  const { colors } = useTheme();
  return StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
    },
    userSplashIcon: {
      height: 66,
      width: 75.92,
    },
    title: {
      fontSize: 32,
      fontFamily: fonts.Poppins.medium,
      textAlign: "center",
      color: colors.primary,
    },
    description: {
      fontSize: 12,
      fontFamily: fonts.Poppins.medium,
      color: "grey",
      textAlign: "center",
    },
    emailLabel: {
      fontSize: 12,
      fontFamily: fonts.Poppins.medium,
      color: colors.primary,
    },
    forgotBox: {
      flex: 1,
    },
  });
};
