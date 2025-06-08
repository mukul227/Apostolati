import { Dimensions, Platform, StyleSheet } from "react-native";
import { fonts } from "@/theme";
import { useTheme } from "@react-navigation/native";
import { s, ms } from "@/utils/scaling-utils";
import { isAndroid } from "@/constants/deviceInfo";

export const style = () => {
  const { colors } = useTheme();
  const { height } = Dimensions.get("window");

  const mobileHeight = height * 0.645;
  return StyleSheet.create({
    screenWrapper: {
      flex: 1,
    },
    imageBackground: {
      resizeMode: "cover",
    },
    imageBackgroundContainer: {
      flex: 0.4,
      height: "100%",
      width: "100%",
      justifyContent: "flex-end",
    },
    searchContainer: {
      paddingHorizontal: 20,
    },
    exploreText: {
      fontSize: 37,
      color: "#FFFFFF",
      fontFamily: fonts.Poppins.bold,
    },
    discoverText: {
      fontSize: 12,
      color: "#FFFFFF",
      fontFamily: fonts.Poppins.medium,
    },
    searchInputBorder: {
      backgroundColor: "white",
      width: "91%",
      borderColor: "white",
      alignSelf: "center",
    },
    topContainer: {
      flex: 0.15,
      justifyContent: "flex-end",
      alignItems: "center",
      paddingVertical: 16,
    },
    bottomContainer: {
      flex: 0.85,
      backgroundColor: "white",
      paddingBottom: Platform.OS == "ios" ? 95 : 80,
    },
    packageText: {
      fontSize: 20,
      color: "#313131",
      fontFamily: fonts.Poppins.semiBold,
      textAlign: "center",
    },
    allDestinationsText: {
      fontSize: 16,
      color: "#000000",
      fontFamily: fonts.Poppins.regular,
      textAlign: "left",
    },
    flashListContent: {
      paddingBottom: ms(30),
      paddingTop: ms(16),
    },
    flashListWrapper: {
      flex: 1,
      height: 100,
      width: "100%",
    },
    columnWrapper: {
      justifyContent: "center",
      alignItems: "center",
    },
    itemContainer: {
      height: ms(70),
      width: "91%",
      marginBottom: 10,
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: "white",
      shadowColor: colors.primary,
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.3,
      shadowRadius: 5,
      elevation: 5,
      borderRadius: 10,
      padding: 8,
      paddingHorizontal: 16,
      alignSelf: "center",
      borderWidth: 0.3,
      borderColor: colors.primary,
    },

    flagContainer: {
      flex: 0.1,
      justifyContent: "center",
      alignItems: "center",
    },
    flagIcon: {
      height: 24,
      width: 24,
      resizeMode: "cover",
      borderRadius: 100,
      borderColor: "grey",
      borderWidth: 0.3,
    },
    regionTextContainer: {
      flex: 1,
      // paddingLeft: 10,
    },
    regionText: {
      fontFamily: fonts.Poppins.medium,
      fontSize: 16,
      color: "#313131",
    },
    arrowIconContainer: {
      flex: 0.1,
      alignItems: "flex-end",
      justifyContent: "center",
    },
    arrowIcon: {
      height: ms(18),
      width: ms(18),
      resizeMode: "contain",
    },
    fab: {
      height: ms(55),
      width: ms(55),
      justifyContent: "center",
      alignItems: "center",
      position: "absolute",
      bottom: isAndroid ? 100 : 120,
      right: 18,
    },
    fabGradient: {
      height: "100%",
      width: "100%",
      borderRadius: 100,
      justifyContent: "center",
      alignItems: "center",
    },
    plusIcon: {
      height: ms(30),
      width: ms(30),
      resizeMode: "contain",
      tintColor: "white",
    },

    menuOptions: {
      width: "100%",
      borderRadius: 8,
      padding: 5,
    },
    menuOption: {
      paddingVertical: 5,
    },
    menuOptionContainer: {
      flexDirection: "row",
      alignItems: "center",
      gap: 10, // for spacing between icon and text
    },
    optionIcon: {
      width: 20,
      height: 20,
      resizeMode: "contain",
      tintColor: colors.primary,
    },
    optionText: {
      fontSize: 16,
      fontFamily: fonts.Poppins.medium,
      color: "#3c1053",
    },

    //DROP

    labelText: {
      fontSize: ms(12),
      fontFamily: fonts.Poppins.medium,
      color: "#3c1053",
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
      width: "91%",
      alignSelf: "center",
      height: ms(50),
    },
    placeholderStyle: {
      fontSize: ms(14),
      fontFamily: fonts.Poppins.regular,
      color: "black",
    },
    selectedTextStyle: {
      fontSize: ms(14),
      fontFamily: fonts.Poppins.regular,
      color: "black",
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

    cardContainer: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: "#fff",
      borderRadius: 16,
      marginBottom: 18,
      shadowColor: "#3c1053",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.08,
      shadowRadius: 12,
      elevation: 3,
      width: "91%",
      alignSelf: "center",
      minHeight: 100,
      borderWidth: 1,
      borderColor: "#f1e9f7",
    },
    badge: {
      width: 45,
      height: 45,
      borderRadius: 24,
      backgroundColor: "#f1e9f7",
      justifyContent: "center",
      alignItems: "center",
      marginLeft: 18,
      marginRight: 18,
      borderWidth: 2,
      borderColor: "#ad5389",
    },
    badgeText: {
      color: "#ad5389",
      fontWeight: "bold",
      fontSize: 20,
    },
    infoContainer: {
      flex: 1,
      justifyContent: "center",
      paddingVertical: 18,
      width: "91%",
    },
    title: {
      fontWeight: "700",
      fontSize: ms(18),
      color: "#3c1053",
      marginBottom: 4,
      letterSpacing: 0.1,
      fontFamily: fonts.Poppins.semiBold,
    },
    subTitle: {
      color: "#7a6e8c",
      fontSize: 15,
      fontWeight: "500",
      marginBottom: 2,
      fontFamily: fonts.Poppins.regular,
    },
    metaRow: {
      flexDirection: "row",
      alignItems: "center",
      marginTop: 2,
    },
    metaText: {
      color: "#b6a7c7",
      fontSize: 13,
      fontWeight: "500",
      fontFamily: fonts.Poppins.regular,
    },
    moreIcon: {
      width: 24,
      height: 24,
      tintColor: "#ad5389",
    },
    menuOptions: {
      borderRadius: 12,
      backgroundColor: "#fff",
      paddingVertical: 8,
      minWidth: 140,
      shadowColor: "#3c1053",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.09,
      shadowRadius: 8,
      elevation: 2,
    },
    menuOption: {
      flexDirection: "row",
      alignItems: "center",
      paddingVertical: 12,
      paddingHorizontal: 16,
    },
    optionIcon: {
      width: 18,
      height: 18,
      marginRight: 10,
    },
    optionText: {
      fontWeight: "600",
      fontSize: 15,
    },
  });
};
