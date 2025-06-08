import { AuthBg, EyeHideIcon, EyeShowIcon } from "@/assets";
import ClickableText from "@/components/ClickableText";
import CommonTextInput from "@/components/CommonTextInput";
import CustomButton from "@/components/CustomButton";
import ScreenWrapper from "@/components/ScreenWrapper";
import { Spacer } from "@/components/Spacer";
import { NAVIGATION } from "@/constants";
import i18n from "@/localization/i18n";
import { navigate } from "@/navigation/RootNavigation";

import React, { useState } from "react";
import { Text, View, Image } from "react-native";
import { style } from "./style";
import { emailRegex } from "@/utils/validators";

import { CustomErrorToast, CustomSuccessToast } from "@/components/Toast";
import { useLoginMutation } from "@/redux/services/authApi";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/slices/userSlicer";


import { ms } from "@/utils/scaling-utils";

const LoginScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const styles = style();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [emailError, setEmailError] = useState();
  const [passwordError, setPasswordError] = useState();
  const [showPassword, setShowPassword] = useState(true);
  const [login, { isLoading: mutationLoading, data }] = useLoginMutation();
  const onChangeEmail = (email) => {
    if (emailError) {
      setEmailError(null);
    }
    setEmail(email?.trim());
  };

  const onChangePassword = (pass) => {
    if (passwordError) {
      setPasswordError(null);
    }
    setPassword(pass?.trim());
  };

  const handleRightIconPress = () => {
    setShowPassword(!showPassword);
  };
  const clearStates = () => {
    setEmail(null);
    setPassword(null);
  };

  const loginHandler = async () => {
    // const data = {
    //   auth_token: "2094824b214kj1b2kj4b21kj4b1",
    // };

    // dispatch(setUser(data));

    // return;
    // let fcmToken = await AsyncStorage.getItem("fcmToken");

    if (!emailRegex.test(email)) {
      setEmailError("Please enter valid email");
    } else if (!password) {
      setEmailError(null);
      setPasswordError("Please enter password");
    }
    // else if (!passwordRegex.test(password)) {
    //   setEmailError(null);
    //   setPasswordError(i18n.t("password_validate"));
    // }
    else {
      let param = {
        email: email,
        password: password,
      };
      try {
        console.log("PRAM", param);
        const user = await login(param).unwrap();
        console.log("MEsSAGE", user?.data?.remember_token);
        CustomSuccessToast({ message: user?.message });
        if (user?.data?.user?.password_reset > 0) {
          dispatch(setUser(user?.data));
          clearStates();
        } else {
          navigate(NAVIGATION.resetPassword, {
            data: {
              email: user?.data?.user?.email?.trim(),
              id: user?.data?.user?.id,
              remember_token: user?.data?.remember_token,
              screen: NAVIGATION.login,
            },
          });
        }
      } catch (error) {
        console.log("ererere", error);
        CustomErrorToast({ message: error?.data?.message });
      }
    }
  };

  return (
    <ScreenWrapper
      scrollEnabled={true}
      useKeyboardAwareScrollView={true}
      useSafeArea={false}
      routeName={NAVIGATION.loginScreen}
      style={styles.screenWrapper}
    >
      <View style={styles.loginBox}>
        <Image
          source={AuthBg}
          // pointerEvents={mutationLoading ? "none" : "auto"}
          style={{
            justifyContent: "center",
            height: ms(300),
            width: "100%",
            resizeMode: "cover",
          }}
        />
        <View style={{ paddingHorizontal: 20, marginTop: 10 }}>
          <Text style={styles.loginText}>{i18n.t("Login")}</Text>
          <Spacer space={25} />
          <Text style={styles.labelText}>{i18n.t("emailAddress")}</Text>
          <Spacer space={6} />
          <CommonTextInput
            // title={i18n.t("emailAddress")}
            value={email}
            borderStyle={{ borderColor: "#ad5389" }}
            isScure={false}
            onChangeText={(email) => onChangeEmail(email)}
            placeholder={i18n.t("enterEmail")}
            placeholderTextColor={"grey"}
            errorMessage={emailError}
            // textInputStyle={{color:"white"}}
          />
          <Spacer space={20} />
          <Text style={styles.labelText}>{i18n.t("Password")}</Text>
          <Spacer space={6} />
          <CommonTextInput
            value={password}
            isScure={showPassword}
            borderStyle={{ borderColor: "#ad5389" }}
            onChangeText={(pass) => onChangePassword(pass)}
            placeholder={i18n.t("Password")}
            rightIcon={showPassword ? EyeHideIcon : EyeShowIcon}
            rightIconOnPress={handleRightIconPress}
            textInputStyle={{ color: "black" }}
            errorMessage={passwordError}
            placeholderTextColor={"grey"}
            // rightIconStyle={{tintColor:"white"}}
          />
          <Spacer space={20} />
          <ClickableText
            style={styles.forgotPasswordText}
            text={i18n.t("forgotPassword")}
            onPress={() => {
              navigate(NAVIGATION.forgot);
            }}
          />
          <Spacer space={20} />
          <CustomButton
            loading={mutationLoading}
            title={i18n.t("Login")}
            onPress={() => loginHandler()}
          />
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default LoginScreen;
