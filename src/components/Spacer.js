import React, { useMemo } from "react";
import { StyleSheet, View } from "react-native";

import PropTypes from "prop-types";

export function Spacer({ space, horizontal, backgroundColor, style }) {
  const styles = useMemo(
    () =>
      StyleSheet.create({
        spacerStyle: {
          style: style,
          backgroundColor: "transparent",
          [horizontal ? "width" : "height"]: space,
        },
      }),
    [horizontal, space, backgroundColor, style]
  );

  return <View style={[styles.spacerStyle]} />;
}

Spacer.propTypes = {
  space: PropTypes.number || PropTypes.string,
  horizontal: PropTypes.bool,
  backgroundColor: PropTypes.string,
  style: PropTypes.object,
};
