import { styles } from "./style";
import i18n from "@/localization/i18n";
import React, { useEffect, useState } from "react";
import Header from "@/components/Header";
import { Spacer } from "@/components/Spacer";
import { View, Text, Image, Keyboard, Platform } from "react-native";
import CustomButton from "@/components/CustomButton";
import ScreenWrapper from "@/components/ScreenWrapper";
import CommonTextInput from "@/components/CommonTextInput";
import { change_Password_Icon, EyeHideIcon, EyeShowIcon } from "@/assets";
import { useChangePasswordMutation, useDeletAccountMutation } from "@/redux/services/authApi";
import { passwordRegex } from "@/utils/validators";
import { goBack } from "@/navigation/RootNavigation";
import { CustomErrorToast, CustomSuccessToast } from "@/components/Toast";
import { logout } from "@/redux/slices/userSlicer";

const DeleteAccountPassword = () => {
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

   const [deletAccount, { isLoading: deleteLoading, isSuccess: deleteSuccess }] =
     useDeletAccountMutation();
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
    }
    else if (type === 1) {
      setShowPassword((prev) => !prev);
      
    } else {
      setShowConfirmPassword((prev) => !prev);
    }
  };
   const onLogout = () => {
      dispatch(logout());
    };
  const changeHandler = async () => {
     if (password=="") {
      setPasswordError("Please enter password");
    }
     else {
      let params ={
          "password": password?.trim()
      }
      try {
        const user = await deletAccount(params).unwrap();
        if (deleteSuccess) {
          onLogout();
        }
        CustomSuccessToast({ message: user?.message });
      } catch (error) {
        console.log("ASdasdasdsa",error)
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
      <Header title={i18n.t("account_password")} />

      <View style={styles.container}>
    
      
        <Spacer space={35} />
        <CommonTextInput
          value={password}
          isScure={showPassword}
          onChangeText={handlePasswordChange}
          placeholder={i18n.t("password")}
          rightIcon={showPassword ? EyeHideIcon : EyeShowIcon}
          rightIconOnPress={() => togglePasswordVisibility(1)}
          errorMessage={passwordError}
          title={i18n.t("password")}
          borderStyle={{borderColor:"#ad5389"}}
        />
       
         <Spacer space={30} />
          <CustomButton
            loading={deleteLoading}
            title={i18n.t("confirm_delete")}
            // style={{ bottom: Platform.OS == "ios" ? 22 : 15 }}
            onPress={() => changeHandler()}
          />
      </View>
    </ScreenWrapper>
  );
};

export default DeleteAccountPassword;
