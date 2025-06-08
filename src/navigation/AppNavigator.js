import React from "react";
import { NAVIGATION } from "@/constants";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { BottomTabNavigator } from "./BottomTabNavigator";
import ChangePassword from "@/screens/Profile/ChangePassword/ChangePassword";
import PersonalInfo from "@/screens/Profile/PersonalInfo/PersonalInfo";
import TermConditions from "@/screens/Profile/TermConditions/TermConditions";
import PrivacyPolicy from "@/screens/Profile/PrivacyPolicy/PrivacyPolicy";
import DeleteAccountPassword from "@/screens/Profile/DeleteAccountPaasword/DeleteAccountPassword";

const Stack = createNativeStackNavigator();

export function AppNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: true }}>
      <Stack.Screen
        component={BottomTabNavigator}
        name={NAVIGATION.bottomTab}
        options={{ headerShown: false }}
      />
       <Stack.Screen
        component={ChangePassword}
        name={NAVIGATION.changePassword}
        options={{ headerShown: false }}
      />
       <Stack.Screen
        component={PersonalInfo}
        name={NAVIGATION.personalInfo}
        options={{ headerShown: false }}
      />
        <Stack.Screen
        component={PrivacyPolicy}
        name={NAVIGATION.privacyPolicy}
        options={{ headerShown: false }}
      />
       <Stack.Screen
        component={TermConditions}
        name={NAVIGATION.termConditions}
        options={{ headerShown: false }}
      />
        <Stack.Screen
        component={DeleteAccountPassword}
        name={NAVIGATION.deleteAccountPassword}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
