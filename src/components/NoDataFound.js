import { fonts } from "@/theme";
import React from "react";
import { View, Text, StyleSheet } from "react-native";

const NoDataFound = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>No data found</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
  },
  text: {
    fontSize: 18,
    fontFamily: fonts.Poppins.medium,
    color: "grey",
  },
});

export default NoDataFound;
