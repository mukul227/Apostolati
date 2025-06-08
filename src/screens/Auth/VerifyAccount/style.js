import { StyleSheet } from "react-native";
import { fonts } from "@/theme";
import { useTheme } from "@react-navigation/native";
import { s, ms } from "@/utils/scaling-utils";
export const style = () => {
  const { colors } = useTheme();
  return StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
    },
    emailIcon: {
      height: 66,
      width: 75.92,
      alignSelf: "center",
    },
    title: {
      fontSize: 32,
      fontFamily: fonts.Poppins.medium,
      textAlign: "center",
    },
    description: {
      fontSize: 10,
      fontFamily: fonts.Poppins.medium,
      color: "#7E7E7E",
      textAlign: "center",
    },
    otpContainer: {
      width: "100%",
      alignItems: "center",
      justifyContent: "center",
    },
    otpBox: {
      backgroundColor: "white",
      marginHorizontal: 6,
      height: 50,
      width: 50,
      alignSelf: "center",
    },
    otpText: {
      fontSize: 20,
      fontWeight: "bold",
    },
    flexGrow: {
      flex: 0.95,
    },
    resendContainer: {
      flexDirection: "row",
      alignSelf: "center",
    },
    resendText: {
      color: "#4F4F4F",
      fontFamily: fonts.Poppins.medium,
      fontSize: s(12),
    },
    clickableText: {
      alignSelf: "flex-end",
      textAlign: "center",
      fontFamily: fonts.Poppins.medium,
      fontSize: s(12),
      marginLeft: 4,
    },
  });
};
