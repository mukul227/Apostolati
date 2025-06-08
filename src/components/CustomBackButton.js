import React from "react";
import { fonts } from "@/theme";
import { arrow_back, CloseTicketIcon } from "@/assets";
import { ms } from "@/utils/scaling-utils";
import { goBack, navigate } from "@/navigation/RootNavigation";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { NAVIGATION } from "@/constants";
import { LinearGradient } from "expo-linear-gradient";

const CustomBackButton = ({ backScreen }) => {
  const insets = useSafeAreaInsets();
  return (
    <TouchableOpacity
    onPress={()=>backScreen?backScreen:goBack()}
    >

   
    <LinearGradient
      colors={["#ad5389", "#3c1053"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={{
        height: ms(40),
        width: ms(40),
        borderRadius: 100,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Image source={arrow_back} style={styles.icon} />
    </LinearGradient>
     </TouchableOpacity>
  );
};

export default CustomBackButton;

const styles = {
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: ms(15),
    paddingHorizontal: ms(20),
    justifyContent: "space-between",
    paddingTop: 50,
  },
  icon: {
    width: ms(30),
    height: ms(30),
    resizeMode: "contain",
    tintColor: "white",
  },
  title: {
    color: "#000000",
    fontSize: ms(20),
    fontFamily: fonts.Poppins.semiBold,
  },
  placeholder: {
    width: ms(24),
    height: ms(24),
  },
  rightIcon: {
    width: ms(24),
    height: ms(24),
    resizeMode: "contain",
  },
};
