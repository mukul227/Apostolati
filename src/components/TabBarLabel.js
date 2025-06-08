import PropTypes from "prop-types";
import React from "react";
import { Text } from "react-native";
import { NAVIGATION } from "@/constants";

const tabLabel = {
  [NAVIGATION.store]: "Store",
  [NAVIGATION.myEsim]: "MyEsim",
  [NAVIGATION.profile]: "Profile",
};

export function TabBarLabel({ color, routeName }) {
  return (
    <Text style={{ color: color, fontSize: 12 }}>{tabLabel[routeName]}</Text>
  );
}

TabBarLabel.propTypes = {
  color: PropTypes.string.isRequired,
  routeName: PropTypes.string.isRequired,
};
