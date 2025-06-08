import React from "react";
import { fonts } from "@/theme";
import { arrow_back, CloseTicketIcon } from "@/assets";
import { ms } from "@/utils/scaling-utils";
import { goBack, navigate } from "@/navigation/RootNavigation";
import { View, Text, Image, TouchableOpacity, Platform } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { NAVIGATION } from "@/constants";
import { LinearGradient } from "expo-linear-gradient";

const Header = ({
  title,
  showRightIcon,
  rightIcon,
  rightIconPress,
  goBackScreen,
}) => {
  const insets = useSafeAreaInsets();
  return (
    <LinearGradient 
     colors={["#ad5389", "#3c1053"]}

        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[styles.container, { paddingTop:Platform.OS=="ios"? insets.top:insets.top+30 }]}>
      <TouchableOpacity
        onPress={() => {
          goBackScreen ? navigate(goBackScreen) : goBack();
        }}
      >
        <Image source={arrow_back} style={styles.icon} />
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.placeholder} />
      {showRightIcon && (
        <TouchableOpacity onPress={rightIconPress}>
          <Image source={rightIcon} style={styles.rightIcon} />
        </TouchableOpacity>
      )}
    </LinearGradient>
  );
};

export default Header;

const styles = {
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: ms(20),
    paddingHorizontal: ms(16),
    justifyContent: "space-between",
    paddingTop:Platform.OS=='ios' ?50:80,
  },
  icon: {
    width: ms(24),
    height: ms(24),
    resizeMode: "contain",
    tintColor: "white",
    
  },
  title: {
    color: "white",
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
