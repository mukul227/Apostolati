import { ms } from "@/utils/scaling-utils";
import { useTheme } from "@react-navigation/native";
import React from "react";
import { View, ActivityIndicator, Text, StyleSheet } from "react-native";

const ListFooter = ({ isLoading, text = "Loading more..." }) => {
 const {colors}= useTheme();
  return (
    <View style={styles.footerContainer}>
      {isLoading ? (
        <>
          <ActivityIndicator size="small" color={colors.primary}/>
          {text && <Text style={styles.loadingText}>{text}</Text>}
        </>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  footerContainer: {
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    marginBottom: ms(20),
  },
  loadingText: {
    marginLeft: 10,
    fontSize: 16,
    color:"#3c1053",
  },
});

export default ListFooter;
