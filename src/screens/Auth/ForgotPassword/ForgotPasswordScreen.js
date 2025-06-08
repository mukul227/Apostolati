import { Text, View, ImageBackground, Platform } from "react-native";
import { AuthBg } from "@/assets";
import CommonTextInput from "@/components/CommonTextInput";
import CustomButton from "@/components/CustomButton";
import ScreenWrapper from "@/components/ScreenWrapper";
import { Spacer } from "@/components/Spacer";
import { CustomErrorToast, CustomSuccessToast } from "@/components/Toast";
import { NAVIGATION } from "@/constants";
import i18n from "@/localization/i18n";
import { goBack } from "@/navigation/RootNavigation";
import { emailRegex } from "@/utils/validators";
import axios from "axios";
import React, { useState } from "react";
import { style } from "./style";
import CustomBackButton from "@/components/CustomBackButton";
import { ms } from "@/utils/scaling-utils";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ApiUserInventory, BASE_URL } from "@/utils/APIinventory";

const ForgotPasswordScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const styles = style();
  const [email, setEmail] = useState();
  const [emailError, setEmailError] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const onChangeEmail = (email) => {
    if (emailError) {
      setEmailError(null);
    }
    setEmail(email?.trim());
  };

  const verifyHandler = () => {
    if (!emailRegex.test(email)) {
      setEmailError("Please enter valid email");
    } else {
      setIsLoading(true);
      let param = {
        email: email,
      };
      let config = {
        method: "post",
        url: BASE_URL + ApiUserInventory.forgotPassword,
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
          goBack();
          // navigate(NAVIGATION.verifyAccount, {
          //   data: {
          //     email: email,
          //     user_id: response.data.data.id,
          //     screen: NAVIGATION.forgot,
          //   },
          // });
        })
        .catch((error) => {
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
      <View style={styles.forgotBox}>
        <ImageBackground
          source={AuthBg}
          // pointerEvents={mutationLoading ? "none" : "auto"}
          style={{
            justifyContent: "center",
            height: ms(300),
            width: "100%",
            resizeMode: "cover",
          }}
        >
          <View
            style={{
              position: "absolute",
              top: Platform.OS == "ios" ? insets?.top : insets?.top + 12,
              left: 20,
            }}
          >
            <CustomBackButton />
          </View>
        </ImageBackground>
        {/* <CustomBackButton /> */}
        <View style={{ paddingHorizontal: 20, marginTop: 20 }}>
          <Text style={styles.title}>{i18n.t("forgot_account")}</Text>
          <Text style={styles.description}>{i18n.t("forgot_description")}</Text>
          <Spacer space={25} />
          <Text style={styles.emailLabel}>{i18n.t("email")}</Text>
          <Spacer space={10} />
          <CommonTextInput
            value={email}
            isScure={false}
            onChangeText={onChangeEmail}
            placeholder={i18n.t("emailAddress")}
            errorMessage={emailError}
            borderStyle={{ borderColor: "#ad5389" }}
            textInputStyle={{ color: "black" }}
            placeholderTextColor={"grey"}
          />
          <Spacer space={40} />
          <CustomButton
            title={i18n.t("verify")}
            loading={isLoading}
            onPress={verifyHandler}
          />
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default ForgotPasswordScreen;
