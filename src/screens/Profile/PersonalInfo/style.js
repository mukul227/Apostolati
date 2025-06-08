import { fonts } from "@/theme";
import { StyleSheet } from "react-native";
import { ms } from "@/utils/scaling-utils";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme } from "@react-navigation/native";

export const style = () => {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  return StyleSheet.create({
    container: {
      flex: 0.9,
      paddingHorizontal: ms(20),
    },
    profileImageContainer: {
      height: ms(141),
      width: ms(141),
      borderRadius: ms(80),
      borderWidth: ms(1.5),
      borderColor: "#ad5389",
      alignItems: "center",
      justifyContent: "center",
      alignSelf: "center",
      marginTop: ms(16),
    },
    profileImage: {
      height: ms(131),
      width: ms(131),
      borderRadius: ms(80),
      resizeMode: "contain",
    },
    cameraButton: {
      position: "absolute",
      bottom: 0,
      right: ms(1),
      height:ms(35),width:ms(35)
    },
    cameraIcon: {
      height: ms(18),
      width: ms(18),
      resizeMode: "contain",
      tintColor:"white"
  
    },
    nameContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      paddingTop: ms(35),
    },
    label: {
      fontSize: ms(12),
      fontFamily: fonts.Poppins.medium,
      color: "#4F4F4F",
    },
    buttonContainer: {
      flex: 0.1,
      justifyContent: "flex-end",
      paddingHorizontal: ms(20),
    },
    btnStyle: {  },
     fabGradient: {
    height: "100%",
    width: "100%",
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  });
};
