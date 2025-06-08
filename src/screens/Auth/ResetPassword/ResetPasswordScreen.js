import { EyeHideIcon, EyeShowIcon } from "@/assets";
import CommonTextInput from "@/components/CommonTextInput";
import CustomButton from "@/components/CustomButton";
import ScreenWrapper from "@/components/ScreenWrapper";
import { Spacer } from "@/components/Spacer";
import { CustomErrorToast, CustomSuccessToast } from "@/components/Toast";
import { NAVIGATION } from "@/constants";
import i18n from "@/localization/i18n";
import { navigate } from "@/navigation/RootNavigation";
import { passwordRegex } from "@/utils/validators";
import axios from "axios";
import React, { useState } from "react";
import { Text, View } from "react-native";
import { style } from "./style";
import CustomBackButton from "@/components/CustomBackButton";
import { ApiUserInventory, BASE_URL } from "@/utils/APIinventory";

const ResetPasswordScreen = ({ navigation, route }) => {
  const styles = style();
  const { data } = route?.params;
  const [isLoading, setIsLoading] = useState(false);
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [passwordError, setPasswordError] = useState();
  const [showPassword, setShowPassword] = useState(true);
  const [showConfirmPassword, setShowConfirmPassword] = useState(true);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);

  const onChangePassword = (pass) => {
    if (passwordError) setPasswordError(null);
    setPassword(pass?.trim());
  };

  const onChangeConfirmPassword = (pass) => {
    if (confirmPasswordError) setConfirmPasswordError(null);
    setConfirmPassword(pass?.trim());
  };

  const handleRightIconPress = (type) => {
    if (type == 1) setShowPassword(!showPassword);
    else setShowConfirmPassword(!showConfirmPassword);
  };

  const verifyHandler = () => {
    if (!passwordRegex.test(password)) {
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
      setIsLoading(true);
      let param = {
        id: data?.id,
        remember_token: data?.remember_token,
        password: password?.trim(),
      };
      console.log("ppppopop", param);
      let config = {
        method: "post",
        url: BASE_URL + ApiUserInventory.changeFirstPassword,
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
        },
        data: param,
      };

      axios
        .request(config)
        .then((response) => {
          setIsLoading(false);
          CustomSuccessToast({ message: response?.data?.message });
          navigate(NAVIGATION.login);
        })
        .catch((error) => {
          console.log("ERROROR", error);
          setIsLoading(false);
          const message =
            error.response?.data?.message ||
            error.message ||
            "An error occurred";
          CustomErrorToast({ message });
        });
    }
  };

  return (
    <ScreenWrapper
      scrollEnabled={true}
      useKeyboardAwareScrollView={true}
      useSafeArea={false}
      routeName={NAVIGATION.forgot}
    >
      <View
        pointerEvents={isLoading ? "none" : "auto"}
        style={styles.container}
      >
        {/* <Spacer space={25} /> */}
        <CustomBackButton />
        {/* <Image source={UserSplashIcon} style={styles.icon} /> */}
        <Spacer space={25} />
        <Text style={styles.title}>{i18n.t("reset_password")}</Text>
        <Text style={styles.description}>{i18n.t("createNewPassword")}</Text>
        <Spacer space={25} />

        <CommonTextInput
          title={"Password"}
          value={password}
          isScure={showPassword}
          onChangeText={onChangePassword}
          placeholder={i18n.t("Password")}
          rightIcon={showPassword ? EyeHideIcon : EyeShowIcon}
          rightIconOnPress={() => handleRightIconPress(1)}
          errorMessage={passwordError}
        />
        <Spacer space={20} />

        <CommonTextInput
          title={i18n.t("confirm_password")}
          value={confirmPassword}
          isScure={showConfirmPassword}
          onChangeText={onChangeConfirmPassword}
          placeholder={i18n.t("confirm_password")}
          rightIcon={showConfirmPassword ? EyeHideIcon : EyeShowIcon}
          rightIconOnPress={() => handleRightIconPress(2)}
          errorMessage={confirmPasswordError}
        />
        <Spacer space={30} />
        <CustomButton
          title={i18n.t("save")}
          loading={isLoading}
          onPress={verifyHandler}
        />
        <Spacer space={30} />
      </View>
    </ScreenWrapper>
  );
};

export default ResetPasswordScreen;
