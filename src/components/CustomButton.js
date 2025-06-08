import { fonts } from "@/theme";
import { useTheme } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import React, { useMemo } from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
const CustomButton = ({
  onPress,
  title,
  loading,
  loadingText,
  disabled,
  style,
  textStyle,
  ...rest
}) => {
  const { colors } = useTheme();
  const styles = useMemo(() => getStyles(colors), [colors]);
  return (
    <TouchableOpacity
     style={{width:"100%"}}
      onPress={onPress}
      disabled={disabled || loading}
      {...rest}
    >
      <LinearGradient
        colors={["#ad5389", "#3c1053"]}
        style={[styles.button, style]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        {loading ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <Text style={[styles.text, textStyle]}>{title}</Text>
        )}
      </LinearGradient>
    </TouchableOpacity>
  );
};

export const getStyles = (colors) => {
  return StyleSheet.create({
    button: {
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 12,
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "row",
      height: 52,
      shadowColor: colors.primary,
      shadowOffset: { width: 1, height: 1 },
      shadowOpacity: 0.5,
      shadowRadius: 2,
      // elevation: 5,
      width: "100%",
    },
    text: {
      color: colors.white,
      fontSize: 18,
      fontFamily: fonts.Poppins.semiBold,
    },
    disabledButton: {
      backgroundColor: colors.text,
    },
  });
};

export default React.memo(CustomButton);
