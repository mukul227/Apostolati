import { fonts, ShadowStyles } from "@/theme";
import { ms } from "@/utils/scaling-utils";
import { useTheme } from "@react-navigation/native";
import { StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export const style = () => {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  return StyleSheet.create({
    screenWrapper: {
      backgroundColor: "#FFF",
    },
    container: {
      flex: 1,
      backgroundColor:colors.white,
      paddingTop: insets.top > 20 ? insets.top - insets.bottom : 0,
    },
    profileHeader: {
      // flexDirection: "row",
      alignItems: "center",
      padding: ms(31),
      justifyContent:"center",
         ...ShadowStyles.shadow,
         marginTop:ms(20)
    },
    profileImageContainer: {
      height: ms(100),
      width: ms(100),
      borderRadius: ms(50),
      borderWidth: ms(1),
      alignItems: "center",
      justifyContent: "center",
      borderColor:colors.primary,
      alignSelf:"center",
        //  ...ShadowStyles.shadow,
    },
    profileImage: {
      height: ms(63),
      width: ms(63),
      borderRadius: ms(35),
      resizeMode: "contain",
      tintColor:colors.primary,
 
    },
    profileInfo: {
     paddingVertical:10
    },
    firtsName:{
     fontSize: ms(40),
      fontFamily: fonts.Poppins.bold,
      color:"white",
      textAlign:"center"
    },
    profileName: {
      fontSize: ms(20),
      fontFamily: fonts.Poppins.bold,
      color:colors.primary,
      textAlign:"center"
    },
    profileEmail: {
      fontSize: ms(12),
      fontFamily: fonts.Poppins.regular,
      color:colors.primary,
      textAlign:"center"
    },
    optionsContainer: {
      // backgroundColor: "#FFF",
      flex: 1,
      borderTopEndRadius: ms(30),
      borderTopStartRadius: ms(30),
    },
    optionsWrapper: {
      backgroundColor: "#FFF",
      borderRadius: ms(20),
      marginHorizontal: ms(12),
      marginTop: ms(10),
      padding: ms(20),
      elevation: 5,
      shadowColor: "#3c1053",
      shadowRadius: 6,
      shadowOpacity: 0.5,
      shadowOffset: {
        width: 1,
        height: 1,
      },
    },
    option: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    optionContent: {
      flexDirection: "row",
      alignItems: "center",
    },
    optionImage: {
      height: ms(22),
      width: ms(22),
      resizeMode: "contain",
      tintColor:colors.primary
    },
    optionTitle: {
      fontSize: ms(14),
      color: "#313131",
      paddingLeft: ms(10),
      fontFamily: fonts.Poppins.semiBold,
    },
    deleteAccount: {
      fontSize: ms(14),
      color: "rgba(255, 11, 11, 1)",
      paddingLeft: ms(10),
      textAlign: "center",
      fontFamily: fonts.Poppins.semiBold,
    },
    arrowIcon: {
      height: ms(16),
      width: ms(16),
      resizeMode: "contain",
      tintColor:colors.primary
    },
    separator: {
      marginVertical: ms(20),
      borderBottomWidth: ms(0.2),
      borderColor:colors.secondary,
    },
    deleteView:{
      justifyContent:"center",alignItems:"center",marginTop:ms(30)
    }
  });
};
