import { NavigationContainer } from "@react-navigation/native";
import React, { useCallback, useEffect, useState } from "react";
import { ActivityIndicator, useColorScheme } from "react-native";
import { AppNavigator } from "@/navigation/AppNavigator";
import { AuthNavigator } from "@/navigation/AuthNavigator";
import { theme } from "@/theme";
import * as SplashScreen from "expo-splash-screen";
import { customFontsToLoad } from "@/theme/fonts";
import { useFonts } from "expo-font";
import { navigationRef } from "./RootNavigation";
import { useSelector } from "react-redux";
import { HttpClient } from "@/redux/services/HttpClient";

SplashScreen.preventAutoHideAsync();
export function RootNavigator() {
  const scheme = useColorScheme();
  const [isUserLoggedIn, setIsUserLoggedIn] = useState();
  const token = useSelector((state) => state?.auth?.user?.access_token);
  const [fontsLoaded, fontError] = useFonts(customFontsToLoad);
  useEffect(() => {
    if (token) {
      HttpClient.setAuthorization(token);
      setIsUserLoggedIn(true);
    } else {
      setIsUserLoggedIn(false);
    }
  }, [token]);

  const onReady = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return <ActivityIndicator size={"large"} />;
  }

  return (
    <NavigationContainer
      ref={navigationRef}
      onReady={onReady}
      theme={theme[scheme]}
    >
      {isUserLoggedIn ? <AppNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
}
