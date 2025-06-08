import PropTypes from "prop-types";
import React from "react";
import { Image } from "react-native";
import { HomeTabIcon, MyEsimTabIcon, ProfileTabIcon } from "@/assets";
import { NAVIGATION } from "@/constants";

const tabIcon = {
  [NAVIGATION.store]: HomeTabIcon,
  [NAVIGATION.myEsim]: MyEsimTabIcon,
  [NAVIGATION.profile]: ProfileTabIcon,
};

export function TabBarIcon({ color, routeName }) {
  return (
    <Image
      accessibilityIgnoresInvertColors
      source={tabIcon[routeName]}
      style={{ tintColor: color }}
    />
  );
}

TabBarIcon.propTypes = {
  color: PropTypes.string.isRequired,
  routeName: PropTypes.string.isRequired,
};
