import { StyleSheet } from "react-native";
import { fonts, ShadowStyles } from "@/theme";
import { useTheme } from "@react-navigation/native";
import { s, ms } from "@/utils/scaling-utils";

export const style = () => {
  const { colors } = useTheme();
  return StyleSheet.create({
    screenWrapper: {
      flex: 1,
      // padding: 16,
    },
    userSplashIcon: {
      height: 66,
      width: 75.92,
    },
    loginText: {
      fontSize: ms(40),
      fontFamily: fonts.Poppins.medium,
       color: colors.primary,
      textAlign: "center",
    },
    labelText: {
      fontSize: 12,
      fontFamily: fonts.Poppins.medium,
      color: colors.primary,
    },
    forgotPasswordText: {
      alignSelf: "flex-end",
      textAlign: "right",
      fontFamily: fonts.Poppins.medium,
      fontSize: s(16),
      color: "black",
    },
    separatorContainer: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
    },
    separator: {
      height: 0.3,
      width: "95%",
      backgroundColor: "#B3B3B3",
    },
    orLoginText: {
      marginHorizontal: 10,
      fontFamily: fonts.Poppins.regular,
      color: "#B3B3B3",
    },
    socialIconsContainer: {
      flexDirection: "row",
      alignSelf: "center",
    },
    socialIcon: {
      height: 62,
      width: 62,
    },
    signupContainer: {
      flexDirection: "row",
      alignSelf: "center",
    },
    dontHaveAccountText: {
      color: "#4F4F4F",
      fontFamily: fonts.Poppins.medium,
      fontSize: s(12),
    },
    signupText: {
      alignSelf: "flex-end",
      textAlign: "center",
      fontFamily: fonts.Poppins.medium,
      fontSize: s(12),
      marginLeft: 4,
    },
   loginBox: {
    // borderRadius: ms(20),
    // marginHorizontal: ms(12),
    // padding: ms(20),
    backgroundColor: "white",  // Semi-transparent purple
    // overflow: "hidden",
    //  borderWidth:0.5,
    borderColor:"white",
    flex:1,
   
  },
  });
};
