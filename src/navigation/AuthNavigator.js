import React from "react";
import { NAVIGATION } from "@/constants";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "@/screens/Auth/Login/LoginScreen";
import ForgotPasswordScreen from "@/screens/Auth/ForgotPassword/ForgotPasswordScreen";
import ResetPasswordScreen from "@/screens/Auth/ResetPassword/ResetPasswordScreen";

const Stack = createNativeStackNavigator();

export function AuthNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        component={LoginScreen}
        name={NAVIGATION.login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        component={ForgotPasswordScreen}
        name={NAVIGATION.forgot}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        component={ResetPasswordScreen}
        name={NAVIGATION.resetPassword}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
