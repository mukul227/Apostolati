import i18n from "@/localization/i18n";
import Header from "@/components/Header";
import { Spacer } from "@/components/Spacer";
import React, { useState, useEffect } from "react";
import CustomButton from "@/components/CustomButton";
import ScreenWrapper from "@/components/ScreenWrapper";
import CommonTextInput from "@/components/CommonTextInput";
import { View, Keyboard } from "react-native";
import { CustomErrorToast, CustomSuccessToast } from "@/components/Toast";
import { useSelector } from "react-redux";
import { goBack, navigate } from "@/navigation/RootNavigation";
import { style } from "./style";
import { NAVIGATION } from "@/constants";
import { useUpdateProfileMutation } from "@/redux/services/authApi";

const PersonalInfo = () => {
  const styles = style();
  const user = useSelector((state) => state?.auth?.user);
  const [firstName, setFirstName] = useState(user?.user?.first_name ?? "");
  const [lastName, setLastName] = useState(user?.user?.last_name ?? "");
  const [email, setEmail] = useState(user?.user?.email ?? "");
  const [emailError, setEmailError] = useState(null);
  const [firstNameError, setFirstNameError] = useState(null);
  const [lastNameError, setLastNameError] = useState(null);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [updateProfile, { isLoading: mutationLoading, data }] =
    useUpdateProfileMutation();

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => setKeyboardVisible(true)
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => setKeyboardVisible(false)
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  const handleInputChange = (setter, errorSetter) => (value) => {
    if (errorSetter) errorSetter(null);
    setter(value?.trim());
  };

  const handleUpdateProfile = async () => {
    if (!firstName) {
      setFirstNameError("Please enter your first name");
    } else if (!lastName) {
      setFirstNameError(null);
      setLastNameError("Please enter your last name ");
    } else {
      let params = {
        first_name: firstName,
        last_name: lastName,
      };
      try {
        const user = await updateProfile(params).unwrap();
        let updatedData;
        if (Object(user?.data?.updated_data ?? {})?.length > 0) {
          updatedData = user?.data?.updated_data
            ? JSON.parse(user?.data?.updated_data)
            : null;
        }
        CustomSuccessToast({ message: user?.message });
        if (user?.data?.update_progress == 1) {
          navigate(NAVIGATION.verifyUpdateAccountScreen, {
            data: {
              user_id: user?.data?.id,
              email: updatedData?.email,
              screen: NAVIGATION.profile,
            },
          });
        } else {
          goBack();
        }
      } catch (error) {
        CustomErrorToast({ message: error?.message });
      }
    }
  };

  return (
    <ScreenWrapper
      scrollEnabled={true}
      useKeyboardAwareScrollView={true}
      useSafeArea={false}
    >
      <Header title={i18n.t("personal_info")} />
      <View style={styles.container}>
        <Spacer space={35} />
        <CommonTextInput
          title={i18n.t("first_name")}
          value={firstName}
          onChangeText={handleInputChange(setFirstName, setFirstNameError)}
          errorMessage={firstNameError}
          placeholder={i18n.t("firstName")}
          borderStyle={{ borderColor: "#ad5389" }}
        />

        <Spacer space={20} />

        <CommonTextInput
          title={i18n.t("last_name")}
          value={lastName}
          onChangeText={handleInputChange(setLastName, setLastNameError)}
          errorMessage={lastNameError}
          placeholder={i18n.t("lastName")}
          borderStyle={{ borderColor: "#ad5389" }}
        />

        <Spacer space={20} />
        <CommonTextInput
          disable={false}
          title={i18n.t("email")}
          value={email}
          onChangeText={handleInputChange(setEmail, setEmailError)}
          errorMessage={emailError}
          placeholder={i18n.t("emailAddress")}
          borderStyle={{
            color: "#888",
            backgroundColor: "#f5f5f5",
            opacity: 0.6,
          }}
        />
        <Spacer space={30} />
        <CustomButton
          onPress={handleUpdateProfile}
          title={i18n.t("save_changes")}
          style={styles.btnStyle}
          loading={mutationLoading}
        />
      </View>
    </ScreenWrapper>
  );
};

export default PersonalInfo;
