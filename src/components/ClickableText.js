import { fonts } from "@/theme";
import { s } from "@/utils/scaling-utils";
import { useTheme } from "@react-navigation/native";
import React, { useMemo } from "react";
import { Text, TouchableOpacity } from "react-native";
import { StyleSheet } from "react-native";

const ClickableText = ({ onPress, text, style, textStyle }) => {
  const { colors } = useTheme();
  const styles = useMemo(() => getStyles(colors), [colors]);
  return (
    <TouchableOpacity onPress={onPress} style={[styles.container, style]}>
      <Text style={[styles.text, textStyle]}>{text}</Text>
    </TouchableOpacity>
  );
};

export const getStyles = (colors) => {
  return StyleSheet.create({
    container: {
      //   padding: 10,
    },
    text: {
      color: colors.primary,
      // color: "white",
      fontSize: s(12),
      fontFamily: fonts.Poppins.semiBold,
    },
  });
};

export default ClickableText;
