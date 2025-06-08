import { Alert, Platform } from "react-native";

export function capitalizeFirstLetter(str) {
  if (typeof str !== "string" || str.length === 0) {
    return str;
  }

  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}
export const formatDate = (inputDateStr) => {
  const date = new Date(inputDateStr);
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  let hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12;
  return `${day} ${month} ${year} ${hours}:${minutes}`;
  //  ${ampm}
};

export const formatDateEst = (inputDateStr) => {
  const date = new Date(inputDateStr);
  const options = {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
    timeZone: "America/New_York",
  };

  const formattedDate = date.toLocaleString("en-US", options);

  return formattedDate;
};

export const formatDateTime = (inputDateStr) => {
  const date = new Date(inputDateStr);
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  let hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";

  hours = hours % 12; // Convert to 12-hour format
  hours = hours ? hours : 12; // If hour is 0, set it to 12
  hours = hours.toString().padStart(2, "0"); // Add leading zero if necessary

  return `${day} ${month} ${year}, ${hours}:${minutes}`;
};

const NormalAlert = ({
  title = "",
  message = "",
  yesText = "OK",
  cancelText = "Cancel",
  singleButton = true,
}) => {
  return new Promise((resolve, reject) => {
    singleButton
      ? Alert.alert(
          title,
          message,
          [{ text: yesText, onPress: () => resolve(true), style: "default" }],
          { cancelable: false }
        )
      : Alert.alert(
          title,
          message,
          [
            {
              text: cancelText,
              onPress: () => reject(false),
              style: "default",
            },
            {
              text: yesText,
              onPress: () => resolve(true),
              style: "default",
            },
            Platform.OS == "ios" && {
              text: "Close",
              style: "cancel",
            },
          ],
          { cancelable: true }
        );
  });
};

function splitFullName(fullName) {
  const nameParts = fullName.trim().split(" ");
  const firstName = nameParts[0];
  const lastName = nameParts[nameParts.length - 1];
  return { firstName, lastName };
}

export { NormalAlert, splitFullName };
