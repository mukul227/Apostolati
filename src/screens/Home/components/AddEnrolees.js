import React, { useState, useEffect } from "react";
import { fonts } from "@/theme";

import { CloseTicketIcon, logOutIcon } from "@/assets";
import i18n from "@/localization/i18n";
import { ms } from "@/utils/scaling-utils";
import { Dimensions, Platform, TouchableOpacity } from "react-native";
import { View, Text, StyleSheet, Modal, Image } from "react-native";
import { Spacer } from "@/components/Spacer";
import CustomButton from "@/components/CustomButton";
import CommonTextInput from "@/components/CommonTextInput";
import { Dropdown } from "react-native-element-dropdown";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import {
  useAddEnrollDataMutation,
  useGetMyClubListMutation,
} from "@/redux/services/homeApi";
import { CustomErrorToast, CustomSuccessToast } from "@/components/Toast";
import { navigate } from "@/navigation/RootNavigation";
const { height } = Dimensions.get("window");

const mobileHeight = height * 0.645;
const AddEnrolees = ({ visible, onContinue, onCancel }) => {
  const [name, setName] = useState();
  const [nameError, setNameError] = useState(null);
  const [clubError, setClubError] = useState(null);

  const [selectedClub, setSelectedClub] = useState(null);
  const [getMyClubList, { isLoading, isError, isSuccess, data: clubData }] =
    useGetMyClubListMutation();
  const [
    addEnrollData,
    {
      isLoading: enrollLoading,
      isError: enrollError,
      isSuccess: enrollSuccess,
      data: enrollData,
    },
  ] = useAddEnrollDataMutation();
  console.log("sadasdasdasdsadasd", JSON.stringify(clubData));
  const onChangeName = (name) => {
    if (nameError) {
      setNameError(null);
    }
    setName(name);
  };
  useEffect(() => {
    getMyClubList();
    // if (isSuccess && clubData?.data?.length > 0) {
    //   const transformedData = clubData?.data.map((item) => ({
    //     id: item.id,
    //     status: item.status,
    //     club_id: item.club_data.id,
    //     plan_id: item.club_data.plan_id,
    //     club_name: item.club_data.club_name,
    //     club_status: item.club_data.status, // renamed because 'status' was already used
    //   }));
    //   console.log("TRANSDFORMMEMEME", transformedData);
    // }

    return () => {
      setNameError("");
    };
  }, []);
  // const data = [
  //   { label: "Item 1", value: "1" },
  //   { label: "Item 2", value: "2" },
  //   { label: "Item 3", value: "3" },
  //   { label: "Item 4", value: "4" },
  //   { label: "Item 5", value: "5" },
  //   { label: "Item 6", value: "6" },
  //   { label: "Item 7", value: "7" },
  //   { label: "Item 8", value: "8" },
  // ];

  const onSubmit = async () => {
    if (selectedClub == null) {
      setClubError("Please select society");
    } else if (!name?.trim()) {
      setNameError("Please enter your name");
    } else {
      let params = {
        club_data: [
          {
            club_id: selectedClub?.club_id,
            name: name?.trim(),
          },
        ],
      };
      console.log("paoipiaspas", params);
      try {
        const user = await addEnrollData(params).unwrap();
        onCancel();
        CustomSuccessToast({ message: user?.message });
        clearData();
        console.log("sdsadada", user?.data);
      } catch (error) {
        console.log("Asdasdas", error);
        CustomErrorToast({ message: error?.data?.message });
      }
    }
  };
  console.log("aDasdadas", selectedClub);
  const renderItem = (item) => {
    return (
      <View style={styles.labelViewStyle}>
        <Text style={styles.labelTextStyle}>{item.label}</Text>
      </View>
    );
  };
  const clearData = () => {
    setName(), setNameError(null);
    setSelectedClub(null), setClubError(null);
  };
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={() => {
        clearData(), onCancel();
      }}
    >
      <KeyboardAwareScrollView
        bounces={false}
        enableOnAndroid={true}
        scrollEnabled={true}
        showsVerticalScrollIndicator={false}
        enableAutomaticScroll={true}
        keyboardShouldPersistTaps="always"
        contentContainerStyle={{ flexGrow: 1 }}
        extraScrollHeight={Platform.OS == "ios" ? 2 : 0}
        style={{ flex: 1 }}
        nestedScrollEnabled={true}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              onPress={() => {
                clearData(), onCancel();
              }}
              style={styles.closeButton}
              hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
            >
              <Image source={CloseTicketIcon} style={styles.closeIcon} />
            </TouchableOpacity>

            <Spacer space={20} />
            <Text style={styles.congratulationsText}>
              {i18n.t("add_enrolee")}
            </Text>
            <Spacer space={20} />
            <Text style={styles.labelText}>{"Society"}</Text>
            <Spacer space={6} />
            <Dropdown
              showsVerticalScrollIndicator={false}
              style={[styles.dropdown, clubError && { borderColor: "#C10B0E" }]}
              itemContainerStyle={{ borderRadius: 10, margin: 4 }}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              containerStyle={{ borderRadius: 10, maxHeight: "45%" }}
              data={
                clubData?.data.map((item) => ({
                  id: item.id,
                  status: item.status,
                  club_id: item.club_data.id,
                  plan_id: item.club_data.plan_id,
                  label: item.club_data.club_name,
                  club_status: item.club_data.status,
                })) ?? []
              }
              labelField="label"
              valueField="label"
              placeholder="Select Society"
              value={selectedClub?.label}
              iconColor="#ad5389"
              onChange={(item) => {
                setClubError(null);
                // getFilterdTransactionHistory(item.value);
                setSelectedClub(item);
              }}
              renderItem={renderItem}
              flatListProps={{
                ItemSeparatorComponent: () => <View style={styles.separator} />,
              }}
            />
            {clubError && (
              <>
                <Spacer space={6} />
                <Text style={[styles.waringText]}>
                  {"Please select society"}
                </Text>
              </>
            )}
            <Spacer space={25} />
            <CommonTextInput
              title={i18n.t("name")}
              value={name}
              isScure={false}
              onChangeText={(name) => onChangeName(name)}
              placeholder={i18n.t("name")}
              errorMessage={nameError}
              placeholderTextColor={"grey"}
              borderStyle={{ width: "100%", borderColor: "#ad5389" }}
            />
            <Spacer space={25} />
            <CustomButton
              style={styles.continueButton}
              title={i18n.t("submit")}
              onPress={onSubmit}
              loading={enrollLoading}
            />
          </View>
        </View>
      </KeyboardAwareScrollView>
    </Modal>
  );
};

export default AddEnrolees;

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "90%",
    // height: "60%",
    // maxHeight:"90%",
    padding: ms(27),
    borderRadius: 20,
    // alignItems: "center",
    backgroundColor: "#FFF",
  },
  logoutImage: {
    width: ms(80),
    height: ms(80),
    resizeMode: "contain",
    tintColor: "#3c1053",
  },
  congratulationsText: {
    fontSize: ms(18),
    color: "#313131",
    paddingTop: ms(10),
    textAlign: "center",
    fontFamily: fonts.Poppins.bold,
  },
  descriptionText: {
    fontSize: ms(14),
    textAlign: "center",
    color: "#737373",
    paddingTop: ms(12),
  },
  continueButton: {
    width: "100%",
    height: 60,
    textAlign: "center",
    alignItems: "center",
  },

  labelText: {
    fontSize: ms(12),
    fontFamily: fonts.Poppins.medium,
    color: "#3c1053",
    textAlign: "left",
  },
  waringText: {
    fontSize: ms(12),
    fontFamily: fonts.Poppins.medium,
    color: "#C10B0E",
    textAlign: "left",
  },

  sortByText: {
    fontSize: ms(12),
    fontFamily: fonts.Poppins.semiBold,
    color: "#ABADAD",
    paddingVertical: ms(5),
  },
  dropdown: {
    backgroundColor: "#FFFFFF",
    borderRadius: ms(10),
    padding: ms(17),
    borderWidth: ms(1),
    borderColor: "#ad5389",
    width: "100%",

    height: ms(50),
  },
  placeholderStyle: {
    fontSize: ms(14),
    fontFamily: fonts.Poppins.regular,
    color: "grey",
  },
  selectedTextStyle: {
    fontSize: ms(14),
    fontFamily: fonts.Poppins.regular,
    color: "#313131",
  },
  transactionsContainer: {
    paddingHorizontal: ms(21),
    height: mobileHeight,
    paddingTop: ms(23),
  },
  transactionsCard: {
    backgroundColor: "#FFF",
    borderWidth: ms(1.5),
    borderColor: "#E0E8F299",
    borderRadius: ms(15),
  },
  recentTransactionsText: {
    paddingTop: ms(18),
    paddingLeft: ms(20),
    color: "#313131",
    fontSize: ms(16),
    fontFamily: fonts.Poppins.regular,
  },
  cardDivider: {
    borderBottomWidth: ms(1.5),
    borderColor: "#E0E8F299",
  },
  transactionItem: {
    paddingHorizontal: ms(15),
    paddingTop: ms(8),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  transactionDetails: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    width: ms(52),
    height: ms(52),
    resizeMode: "contain",
  },
  transactionText: {
    paddingLeft: ms(13),
  },
  transactionLabel: {
    color: "#313131",
    fontSize: ms(15),
    fontFamily: fonts.Poppins.regular,
  },
  transactionDate: {
    color: "#31313199",
    fontSize: ms(12),
    fontFamily: fonts.Poppins.regular,
  },
  transactionAmount: {
    color: "#313131",
    fontSize: ms(15),
    fontFamily: fonts.Poppins.regular,
  },
  transactionStatus: {
    color: "#F49A47",
    fontSize: ms(10),
    textAlign: "right",
    fontFamily: fonts.Poppins.regular,
  },
  separator: {
    height: ms(0.3),
    backgroundColor: "#3c1053",
    marginHorizontal: ms(10),
  },
  labelViewStyle: { paddingVertical: ms(15), paddingHorizontal: ms(25) },
  labelTextStyle: {
    fontSize: ms(12),
    fontFamily: fonts.Poppins.regular,
    color: "#838383",
  },

  closeButton: {
    height: 50,
    width: 50,
    position: "absolute",
    top: 20,
    right: 18,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F3F3F3",
    borderRadius: 100,
    zIndex: 10,
  },

  closeIcon: {
    height: ms(22),
    width: ms(22),
    tintColor: "#3c1053",
    alignSelf: "center",
    resizeMode: "contain",
  },
});
