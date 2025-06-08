import React from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export function FullScreenLoader({ style }) {
  const insets = useSafeAreaInsets();
  return (
    <View
      style={[
        styles.loader,
        { paddingTop: insets.top, paddingBottom: insets.bottom },
        style,
      ]}
    >
      <View style={styles.overlay} />
      <ActivityIndicator
        color={"#3c1053"}
        size="large"
        style={styles.indicator}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  loader: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.2)",
  },
  indicator: {
    zIndex: 1001,
  },
});
