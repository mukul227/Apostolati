import { ActivityIndicator, View } from "react-native";
import React, { useRef } from "react";
import ScreenWrapper from "@/components/ScreenWrapper";
import Header from "@/components/Header";
import i18n from "@/localization/i18n";
import WebView from "react-native-webview";
import { TERMS_URL } from "@/utils/APIinventory";
import { FullScreenLoader } from "@/components/FullScreenLoader";
import { ms } from "@/utils/scaling-utils";
const TermConditions = () => {
  const webViewRef = useRef();
  return (
    <ScreenWrapper
      scrollEnabled={false}
      useKeyboardAwareScrollView={false}
      useSafeArea={false}
    >
      <Header title={i18n.t("termConditions")} />
      <View style={{ flex: 1,paddingHorizontal: ms(10) }}>
        <WebView
          ref={(ref) => (webViewRef.current = ref)}
          source={{
            uri: TERMS_URL,
          }}
          startInLoadingState={true}
          renderLoading={() => (

           <ActivityIndicator
                  color={"#3c1053"}
                  size="large"
                 style={{position: "absolute", top: "50%", left: "50%", transform: [{ translateX: -20 }, { translateY: -20 }]}}
                />
          )}
        />
      </View>
    </ScreenWrapper>
  );
};

export default TermConditions;
