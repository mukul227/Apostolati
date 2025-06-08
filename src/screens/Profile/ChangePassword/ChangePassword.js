import { styles } from "./style";
import i18n from "@/localization/i18n";
import React, { useEffect, useState } from "react";
import Header from "@/components/Header";
import { Spacer } from "@/components/Spacer";
import { View, Keyboard } from "react-native";
import CustomButton from "@/components/CustomButton";
import ScreenWrapper from "@/components/ScreenWrapper";
import CommonTextInput from "@/components/CommonTextInput";
import { EyeHideIcon, EyeShowIcon } from "@/assets";
import { useChangePasswordMutation } from "@/redux/services/authApi";
import { passwordRegex } from "@/utils/validators";
import { goBack } from "@/navigation/RootNavigation";
import { CustomErrorToast, CustomSuccessToast } from "@/components/Toast";

const ChangePassword = () => {
  const [oldPass, setOldPass] = useState("");
  const [password, setPassword] = useState("");
  const [oldPasswordError, setOldPasswordError] = useState(null);

  const [passwordError, setPasswordError] = useState(null);
  const [showOldPassword, setShowOldPassword] = useState(true);
  const [showPassword, setShowPassword] = useState(true);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showConfirmPassword, setShowConfirmPassword] = useState(true);
  const [confirmPasswordError, setConfirmPasswordError] = useState(null);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  const [changePassord, { isLoading, data, isSuccess }] =
    useChangePasswordMutation();
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setKeyboardVisible(true);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardVisible(false);
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  const handleOldPasswordChange = (pass) => {
    if (oldPasswordError) setOldPasswordError(null);
    setOldPass(pass.trim());
  };
  const handlePasswordChange = (pass) => {
    if (passwordError) setPasswordError(null);
    setPassword(pass.trim());
  };

  const handleConfirmPasswordChange = (pass) => {
    if (confirmPasswordError) setConfirmPasswordError(null);
    setConfirmPassword(pass.trim());
  };

  const togglePasswordVisibility = (type) => {
    if (type === 0) {
      setShowOldPassword((prev) => !prev);
    } else if (type === 1) {
      setShowPassword((prev) => !prev);
    } else {
      setShowConfirmPassword((prev) => !prev);
    }
  };
  const changeHandler = async () => {
    if (oldPass == "") {
      setOldPasswordError("Please enter old password");
    } else if (!passwordRegex.test(password)) {
      setPasswordError(i18n.t("password_validate"));
    } else if (!confirmPassword) {
      setPasswordError(null);
      setConfirmPasswordError("Please enter confirm password");
    } else if (!passwordRegex.test(confirmPassword)) {
      setPasswordError(null);
      setConfirmPasswordError(i18n.t("password_validate"));
    } else if (password?.trim() !== confirmPassword?.trim()) {
      setConfirmPasswordError(null);
      setConfirmPasswordError("password not matched");
    } else {
      let params = {
        old_password: oldPass?.trim(),
        password: password?.trim(),
      };
      try {
        const user = await changePassord(params).unwrap();
        CustomSuccessToast({ message: user?.message });
        goBack();
      } catch (error) {
        CustomErrorToast({ message: error?.data?.message });
      }
    }
  };

  return (
    <ScreenWrapper
      scrollEnabled
      useSafeArea={false}
      useKeyboardAwareScrollView={true}
    >
      <Header title={i18n.t("changePassword")} />

      <View style={styles.container}>
        <Spacer space={35} />
        <CommonTextInput
          value={oldPass}
          isScure={showOldPassword}
          onChangeText={handleOldPasswordChange}
          placeholder={i18n.t("old_pass")}
          rightIcon={showOldPassword ? EyeHideIcon : EyeShowIcon}
          rightIconOnPress={() => togglePasswordVisibility(0)}
          errorMessage={oldPasswordError}
          title={i18n.t("old_pass")}
          borderStyle={{ borderColor: "#ad5389" }}
        />
        <Spacer space={20} />
        <CommonTextInput
          value={password}
          isScure={showPassword}
          onChangeText={handlePasswordChange}
          placeholder={i18n.t("new_pass")}
          rightIcon={showPassword ? EyeHideIcon : EyeShowIcon}
          rightIconOnPress={() => togglePasswordVisibility(1)}
          errorMessage={passwordError}
          title={i18n.t("new_pass")}
          borderStyle={{ borderColor: "#ad5389" }}
        />

        <Spacer space={20} />
        <CommonTextInput
          title={i18n.t("confirm_password")}
          value={confirmPassword}
          isScure={showConfirmPassword}
          onChangeText={handleConfirmPasswordChange}
          placeholder={i18n.t("confirm_password")}
          rightIcon={showConfirmPassword ? EyeHideIcon : EyeShowIcon}
          rightIconOnPress={() => togglePasswordVisibility(2)}
          errorMessage={confirmPasswordError}
          borderStyle={{ borderColor: "#ad5389" }}
        />
        <Spacer space={30} />
        <CustomButton
          loading={isLoading}
          title={i18n.t("save_password")}
          onPress={() => changeHandler()}
        />
      </View>
    </ScreenWrapper>
  );
};

export default ChangePassword;
