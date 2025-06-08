import {
  userIcon,
  logOutIcon,
  arrowRight,
  privacyPolicy,
  changePasswordIcon,
  termConditionsIcon,
} from "@/assets";
import React, { useEffect, useState } from "react";

import i18n from "@/localization/i18n";
import ScreenWrapper from "@/components/ScreenWrapper";
import { Image, Text, View, TouchableOpacity, ScrollView } from "react-native";
import { NAVIGATION } from "@/constants";
import { navigate } from "@/navigation/RootNavigation";
import LogOutModal from "@/components/LogOutModal";
import {
  useDeletAccountMutation,
  useGetProfileMutation,
} from "@/redux/services/authApi";
import { FullScreenLoader } from "@/components/FullScreenLoader";
import { useDispatch, useSelector } from "react-redux";
import { logout, setUser } from "@/redux/slices/userSlicer";
import { useIsFocused } from "@react-navigation/native";
import { style } from "./style";
import { CustomErrorToast, CustomSuccessToast } from "@/components/Toast";
import DeleteModal from "@/components/DeleteModal";
import { capitalizeFirstLetter } from "@/utils/GlobalMethods";
import { LinearGradient } from "expo-linear-gradient";

export const Profile = () => {
  const styles = style();
  const [modalVisible, setModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);

  const dispatch = useDispatch();
  const [getProfile, { isLoading, data, isSuccess }] = useGetProfileMutation();
  console.log("poopopp", JSON.stringify(data));
  const isFocused = useIsFocused();
  const user = useSelector((state) => state?.auth?.user);
  const [deletAccount, { isLoading: deleteLoading, isSuccess: deleteSuccess }] =
    useDeletAccountMutation();
  useEffect(() => {
    if (isSuccess) {
      const updatedData = {
        user: data?.data,
        access_token: user?.access_token,
      };

      dispatch(setUser(updatedData));
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isFocused) {
      getProfile();
    }
  }, [isFocused]);

  const DATA = [
    {
      img: userIcon,
      title: i18n.t("personalInfo"),
      screen: () => navigate(NAVIGATION.personalInfo),
      visible: true, // Always visible
    },
    {
      img: changePasswordIcon,
      title: i18n.t("changePassword"),
      screen: () => navigate(NAVIGATION.changePassword),
      visible: true,
    },
    {
      img: privacyPolicy,
      title: i18n.t("privacyPolicy"),
      screen: () => navigate(NAVIGATION.privacyPolicy),
      visible: true,
    },
    {
      img: termConditionsIcon,
      title: i18n.t("termConditions"),
      screen: () => navigate(NAVIGATION.termConditions),
      visible: true,
    },
    {
      img: logOutIcon,
      title: i18n.t("logOut"),
      screen: () => setModalVisible(true),
      visible: true,
    },

    // {
    //   img: DeleteIcon,
    //   title: i18n.t("delete_account"),
    //   screen: () => setDeleteModalVisible(true),
    //   visible: true,
    //   tintColor: "rgba(255, 11, 11, 1)",
    // },
  ];
  const visibleData = DATA?.filter((item) => item.visible);
  const onLogout = () => {
    setModalVisible(false);
    dispatch(logout());
  };
  const navigateQr = () => {
    navigate(NAVIGATION.qrScreen, {
      QR: user?.qr_data,
      goBackScreen: NAVIGATION.profile,
    });
  };
  const onDeleteAccount = async () => {
    setDeleteModalVisible(!deleteModalVisible);
    navigate(NAVIGATION.deleteAccountPassword);
    return;

    try {
      const user = await deletAccount().unwrap();
      if (deleteSuccess) {
        onLogout();
      }
      CustomSuccessToast({ message: user?.message });
    } catch (error) {
      CustomErrorToast({ message: error?.message });
    }
  };

  return (
    <ScreenWrapper
      scrollEnabled={true}
      useKeyboardAwareScrollView={false}
      useSafeArea={false}
      style={styles.screenWrapper}
    >
      <View style={styles.container}>
        <View style={styles.profileHeader}>
          <LinearGradient
            colors={["#ad5389", "#3c1053"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.profileImageContainer}
          >
            <Text style={styles.firtsName} numberOfLines={1}>
              {capitalizeFirstLetter(user?.user?.full_name)?.charAt(0)}
            </Text>
          </LinearGradient>

          <View style={styles.profileInfo}>
            <Text style={styles.profileName} numberOfLines={2}>
              {capitalizeFirstLetter(user?.user?.full_name)}
            </Text>
            <Text style={styles.profileEmail}>{user?.user?.email ?? ""}</Text>
          </View>
        </View>

        <View style={styles.optionsContainer}>
          <ScrollView
            contentContainerStyle={{ paddingBottom: 120 }}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.optionsWrapper}>
              {visibleData?.map((item, index) => (
                <React.Fragment key={index}>
                  <TouchableOpacity style={styles.option} onPress={item.screen}>
                    <View style={styles.optionContent}>
                      <Image
                        source={item.img}
                        style={[
                          styles.optionImage,
                          item?.tintColor && { tintColor: item?.tintColor },
                        ]}
                      />
                      <Text
                        style={[
                          styles.optionTitle,
                          item?.tintColor && { color: item?.tintColor },
                        ]}
                      >
                        {item.title}
                      </Text>
                    </View>
                    <TouchableOpacity onPress={item.screen}>
                      <Image
                        source={arrowRight}
                        style={[
                          styles.arrowIcon,
                          item?.tintColor && { tintColor: item?.tintColor },
                        ]}
                      />
                    </TouchableOpacity>
                  </TouchableOpacity>
                  {index < visibleData?.length - 1 && (
                    <View style={styles.separator} />
                  )}
                </React.Fragment>
              ))}
            </View>
            {/* <View style={[styles.optionsWrapper,{justifyContent:"center",alignItems:"center",}]}>
              <TouchableOpacity
                onPress={() => setDeleteModalVisible(!deleteModalVisible)}
                style={styles.optionContent}
              >
                <Image source={DeleteIcon} style={[styles.optionImage,{tintColor:"rgba(255, 11, 11, 1)"}]} />
                <Text style={styles.deleteAccount}>{"Delete Account"}</Text>
              </TouchableOpacity>
            </View> */}
          </ScrollView>
        </View>
      </View>
      {deleteLoading && <FullScreenLoader />}
      <LogOutModal
        visible={modalVisible}
        onContinue={() => onLogout()}
        onCancel={() => setModalVisible(!modalVisible)}
      />
      <DeleteModal
        visible={deleteModalVisible}
        onContinue={() => onDeleteAccount()}
        onCancel={() => setDeleteModalVisible(!deleteModalVisible)}
      />
    </ScreenWrapper>
  );
};
