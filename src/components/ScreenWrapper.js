import React, { useState, useEffect } from "react";
import {
  View,
  SafeAreaView,
  StyleSheet,
  Platform,
  StatusBar,
  Text,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import NetInfo from "@react-native-community/netinfo";
import { fonts } from "@/theme";

import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ms, s } from "@/utils/scaling-utils";
import { LinearGradient } from "expo-linear-gradient";

const ScreenWrapper = ({
  children,
  style,
  useSafeArea = true,
  scrollEnabled = true,
  useKeyboardAwareScrollView = true,
}) => {
  const [isConnected, setIsConnected] = useState(true);
  const WrapperComponent = useSafeArea ? SafeAreaView : View;

  const insets = useSafeAreaInsets();

  const hasNotch =
    insets.top > 0 || insets.bottom > 0 || insets.left > 0 || insets.right > 0;

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsConnected(state.isConnected);
    });
    return () => {
      unsubscribe();
    };
  }, []);
  const NoInternet = () => {
    return (
      <View style={[styles.noInternetViewStyle, { marginTop: insets.top }]}>
        <Text style={styles.noInternetTxtStyle}>No Internet</Text>
      </View>
    );
  };

  return (
    <WrapperComponent style={[styles.wrapper, style]}>
      <LinearGradient
        start={{ x: 1, y: 0 }}
        end={{ x: 0, y: 1 }}
        colors={[
          "rgba(255, 255, 255, 1)",
         "rgba(255, 255, 255, 1)",
        ]}
        style={{
          flex: 1,
          flexGrow: 1,
          // paddingTop: useSafeArea ? 0 :insets.top,
        }}
      >
        <StatusBar
          barStyle="dark-content"
          translucent
          backgroundColor="transparent"
        />
        {!isConnected && <NoInternet />}
        {useKeyboardAwareScrollView ? (
          <KeyboardAwareScrollView
            bounces={false}
            enableOnAndroid={true}
            scrollEnabled={scrollEnabled}
            showsVerticalScrollIndicator={false}
            enableAutomaticScroll={true}
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={styles.contentContainer}
            extraScrollHeight={Platform.OS == "ios" ? 2 : 0}
            style={{ flex: 1 }}
            nestedScrollEnabled={true}
          >
            {children}
          </KeyboardAwareScrollView>
        ) : (
          <View style={[styles.container]}>{children}</View>
        )}
      </LinearGradient>
    </WrapperComponent>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapper: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
    // justifyContent: "center",
  },
  offlineIndicator: {
    backgroundColor: "red",
    padding: 6,
    alignItems: "center",
    width: "100%",
    zIndex: 1,
    position: "absolute",
    top: 20,
  },
  offlineText: {
    color: "white",
    fontFamily: fonts.Poppins.regular,
    fontSize: s(12),
  },
  internetBox: { position: "absolute" },
  alert: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    alignSelf: "center",
    backgroundColor: "#BE0A32",
    height: 45,
  },
  alertContent: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  alertText: {
    fontFamily: fonts.Poppins.bold,
    color: "white",
    marginLeft: 10,
  },
  noInternetViewStyle: {
    zIndex: 1,
    width: "100%",
    padding: ms(2),
    marginTop: ms(40),
    position: "absolute",
    alignItems: "center",
    backgroundColor: "red",
    justifyContent: "center",
  },
  noInternetTxtStyle: { color: "#FFF", fontFamily: fonts.Poppins.semiBold },
});

export default ScreenWrapper;
