import { fonts } from "@/theme";
import { s } from "@/utils/scaling-utils";
import Toast from "react-native-toast-message";

export const CustomErrorToast = ({ message = "" }) => {
  Toast.show({
    position: "top",
    type: "error",
    visibilityTime: 1500,
    text1: message,
    text2Style: {
      fontSize: s(12),
      fontFamily: fonts.Poppins.medium,
    },
  });
};

export const CustomSuccessToast = ({ message = "" }) => {
  Toast.show({
    position: "top",
    type: "success",
    visibilityTime: 1500,
    text1: message,
    text2Style: {
      fontSize: s(12),
      fontFamily: fonts.Poppins.medium,
    },
  });
};
