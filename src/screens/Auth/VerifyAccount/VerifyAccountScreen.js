import { EmailSplashIcon } from "@/assets";
import ClickableText from "@/components/ClickableText";
import ScreenWrapper from "@/components/ScreenWrapper";
import { Spacer } from "@/components/Spacer";
import { NAVIGATION } from "@/constants";
import i18n from "@/localization/i18n";
import { navigate } from "@/navigation/RootNavigation";
import React, { useState } from "react";
import { Text, View, Image } from "react-native";
import { OtpInput } from "react-native-otp-entry";
import { FullScreenLoader } from "@/components/FullScreenLoader";
import { CustomErrorToast, CustomSuccessToast } from "@/components/Toast";
import CongratulationsModal from "@/components/CongratulationModal";
import { style } from "./style";
import { useDispatch, useSelector } from "react-redux";
import {
  useResendOtpMutation,
  useUpdateProfileVerificationMutation,
  useVerifyAccountMutation,
} from "@/redux/services/authApi";
import { setUser } from "@/redux/slices/userSlicer";
const VerifyAccountScreen = ({ navigation, route }) => {
  const disptach = useDispatch();
  const styles = style();
  const user = useSelector((state) => state?.auth?.user);

  const [
    verifyAccount,
    {
      isLoading: verifyLoading,
      isSuccess: verifySuccess,
      data: verifyData,
      isError: verifyError,
    },
  ] = useVerifyAccountMutation();

  const [
    updateProfileVerification,
    {
      isLoading: updateVerifyLoading,
      data: updateVerificationData,
      isError: updateError,
      isSuccess: updateSuccess,
    },
  ] = useUpdateProfileVerificationMutation();

  const [resendOtp, { isLoading: resendLoading }] = useResendOtpMutation();
  const { data } = route?.params;
  const [otp, setOtp] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const verifyHandler = async (OTP) => {
    if (data?.screen == NAVIGATION.profile) {
      updateVerification(OTP);
    } else {
      let requestData = new FormData();
      requestData.append("user_id", data?.user_id);
      requestData.append("otp", OTP);
      verifyAccount(requestData)
        .unwrap()
        .then((res) => {
          if (res?.statusCode == 200) {
            CustomSuccessToast({ message: res?.message });
            if (data?.screen == NAVIGATION.login) {
              navigate(NAVIGATION.login);
            } else if (data?.screen == NAVIGATION.profile) {
              navigate(NAVIGATION.profile);
            } else if (data?.screen == NAVIGATION.forgot) {
              navigate(NAVIGATION.resetPassword, {
                DATA: { user_id: res?.data?.id },
              });
            } else {
              setModalVisible(true);
            }
          } else {
            CustomErrorToast({ message: res?.message });
          }
        })
        .catch((error) => {
          CustomErrorToast({ message: error?.data?.message });
        });
    }
  };
  const updateVerification = async (OTP) => {
    let requestData = new FormData();
    requestData.append("otp", OTP);
    try {
      const user = await updateProfileVerification(requestData).unwrap();
      if (user?.statusCode == 200) {
        if (data?.screen == NAVIGATION.login) {
          navigate(NAVIGATION.login);
        } else if (data?.screen == NAVIGATION.profile) {
          navigate(NAVIGATION.profile);
        } else {
          setModalVisible(true);
        }
      }
    } catch (error) {
      CustomErrorToast({ message: error?.message });
    }
  };

  const onResendOtp = async () => {
    let formData = new FormData();
    formData.append("user_id", data?.user_id);
    const user = await resendOtp(formData).unwrap();
    if (user?.statusCode == 200) {
      CustomSuccessToast({ message: user?.message });
    } else {
      CustomErrorToast({ message: user?.message || "An error occurred" });
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
        pointerEvents={
          verifyLoading || updateVerifyLoading || resendLoading
            ? "none"
            : "auto"
        }
        style={styles.container}
      >
        <Spacer space={60} />
        <Image source={EmailSplashIcon} style={styles.emailIcon} />
        <Spacer space={25} />
        <Text style={styles.title}>{i18n.t("verify_account")}</Text>
        <Spacer space={6} />
        <Text style={styles.description}>
          {i18n.t("verify_description") + " " + data?.email}
        </Text>
        <Spacer space={25} />

        <OtpInput
          numberOfDigits={4}
          focusColor="green"
          focusStickBlinkingDuration={500}
          onTextChange={(text) => setOtp(text)}
          onFilled={(text) => verifyHandler(text)}
          theme={{
            containerStyle: styles.otpContainer,
            pinCodeContainerStyle: styles.otpBox,
            pinCodeTextStyle: styles.otpText,
          }}
        />
        <Spacer space={60} />
        <Spacer space={30} />
        <View style={styles.flexGrow} />
        <View style={styles.resendContainer}>
          <Text style={styles.resendText}>Didn’t receive code?</Text>
          <ClickableText
            style={styles.clickableText}
            text={i18n.t("resend_code")}
            onPress={onResendOtp}
          />
        </View>
        {(verifyLoading || updateVerifyLoading || resendLoading) && (
          <FullScreenLoader />
        )}
        <CongratulationsModal
          visible={modalVisible}
          onContinue={() => {
            setModalVisible(false);
            if (data?.screen === NAVIGATION.login) {
              navigate(NAVIGATION.login);
            } else if (data?.screen === NAVIGATION.profile) {
              navigate(NAVIGATION.profile);
            } else {
              disptach(setUser(verifyData?.data));
              // setTimeout(() => {
              //   navigate(NAVIGATION.login);
              // }, 100);
            }
          }}
        />
      </View>
    </ScreenWrapper>
  );
};

export default VerifyAccountScreen;
