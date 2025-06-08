import { WarningIcon } from "@/assets";
import { fonts, ShadowStyles } from "@/theme";
import { ms, s } from "@/utils/scaling-utils";
import { useTheme } from "@react-navigation/native";
import React, { useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
  Text,
} from "react-native";

const CommonTextInput = ({
  value,
  onChangeText,
  placeholder,
  leftIcon,
  leftIconPress,
  rightIcon,
  rightIconOnPress,
  borderStyle,
  isScure,
  focus,
  keyBoardType,
  errorMessage,
  disable,
  maxLength,
  warning,
  rightIconStyle,
  title,
  multiline,
  textInputStyle,
  placeholderTextColor,
  ...rest
}) => {
  const { colors } = useTheme();
  const [isFocused, setIsFocused] = useState(false);
  const styles = getStyles(colors, errorMessage, warning, isFocused);

  return (
    <View>
      {title && <Text style={styles.label}>{title}</Text>}
      <View style={[styles.container, borderStyle]}>
        {leftIcon && (
          <TouchableOpacity onPress={leftIconPress}>
            <Image source={leftIcon} style={styles.iconLeft} />
          </TouchableOpacity>
        )}
        <TextInput
          autoCapitalize="none"
          style={[styles.textInput, textInputStyle]}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={
            placeholderTextColor
              ? placeholderTextColor
              : errorMessage
              ? colors.error
              : colors.placeholderText
          }
          secureTextEntry={isScure}
          keyboardType={keyBoardType}
          focusable={focus}
          autoFocus={focus}
          editable={disable}
          maxLength={maxLength}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...rest}
          multiline={multiline}
        />
        {rightIcon && (
          <TouchableOpacity onPress={rightIconOnPress}>
            <Image
              source={rightIcon}
              style={[styles.iconRight, rightIconStyle]}
            />
          </TouchableOpacity>
        )}
      </View>
      {errorMessage && (
        <View style={styles.errorView}>
          <Image source={WarningIcon} style={styles.errorIcon} />
          <Text numberOfLines={3} style={styles.errorText}>
            {errorMessage}
          </Text>
        </View>
      )}
    </View>
  );
};

export const getStyles = (colors, errorMessage, warning, isFocused) => {
  return StyleSheet.create({
    errorView: {
      flexDirection: "row",
      marginVertical: ms(10),
      marginLeft: 5,
    },
    container: {
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: ms(14),
      paddingVertical: 5,
      borderWidth: 1,
      borderRadius: 10,
      borderColor: isFocused
        ? errorMessage
          ? colors.error
          : colors.activeInput
        : colors.inactiveInput,
      height: ms(50),
      backgroundColor: errorMessage ? colors.warning_faded : null,
    },
    textInput: {
      flex: 1,
      fontSize: s(12),
      fontFamily: fonts.Poppins.regular,
      color: colors.darkBlue,
      // marginHorizontal: ms(8),
    },
    iconLeft: {
      height: ms(24),
      width: ms(24),
      tintColor: errorMessage
        ? warning
          ? "rgba(233, 179, 0, 0.8)"
          : colors.error
        : null,
    },
    iconRight: {
      height: ms(24),
      width: ms(24),
      resizeMode: "contain",
    },
    errorText: {
      color: warning ? "rgba(233, 179, 0, 0.8)" : colors.error,
      fontSize: s(14),
      fontFamily: fonts.openSan.regular,
      marginHorizontal: 10,
      marginTop: -5,
    },
    errorIcon: {
      height: ms(14),
      width: ms(14),
      resizeMode: "contain",
      tintColor: warning ? "rgba(233, 179, 0, 0.8)" : "none",
    },
    label: {
      fontSize: ms(12),
      color: colors.primary,
      marginBottom: ms(6),
      fontFamily: fonts.Poppins.medium,

    },
  });
};

export default React.memo(CommonTextInput);
