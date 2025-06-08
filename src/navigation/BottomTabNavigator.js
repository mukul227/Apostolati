import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useTheme } from "@react-navigation/native";
import React from "react";
import { TabBarIcon } from "@/components";
import { NAVIGATION } from "@/constants";
import { TabBarLabel } from "@/components/TabBarLabel";
import { CustomBottomTabBar } from "./CustomBottomTabBar";
import { Profile, Home } from "@/screens";

const Tab = createBottomTabNavigator();

export function BottomTabNavigator() {
  const { colors } = useTheme();
  const renderTabIcon = (color, route) => (
    <TabBarIcon color={color} routeName={route.name} />
  );
  const renderTabLabel = (color, route) => (
    <TabBarLabel color={color} routeName={route.name} />
  );
  return (
    <Tab.Navigator
      tabBar={(props) => <CustomBottomTabBar {...props} />}
      screenOptions={({ route, navigation }) => ({
        tabBarHideOnKeyboard: true,
        tabBarActiveTintColor: colors.activeTab,
        tabBarInactiveTintColor: colors.inactiveTab,
        headerShown: false,
        tabBarIcon: ({ color }) => renderTabIcon(color, route),
        tabBarLabel: ({ color }) => renderTabLabel(color, route),
        tabBarStyle: {
          backgroundColor: "transparent",
          tabBarHideOnKeyboard: true,
        },
        title: null,
      })}
    >
      <Tab.Screen name={NAVIGATION.home} component={Home} />
      <Tab.Screen name={NAVIGATION.profile} component={Profile} />
    </Tab.Navigator>
  );
}
