import React from "react";
import { NAVIGATION } from "@/constants";
import { useTheme } from "@react-navigation/native";
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  Keyboard,
  Image,
  Platform,
} from "react-native";
import { fonts } from "@/theme";
import { ms } from "@/utils/scaling-utils";
import { HomeTabIcon, ProfileTabIcon } from "@/assets";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { isAndroid } from "@/constants/deviceInfo";

const tabBarLabel = {
  [NAVIGATION.home]: "Home",
  [NAVIGATION.profile]: "Profile",
};

const tabBarIcon = {
  [NAVIGATION.home]: HomeTabIcon,
  [NAVIGATION.profile]: ProfileTabIcon,
};

function CustomBottomTabBar({ state, descriptors, navigation }) {
  const { colors } = useTheme();
  const [keyboardShow, setKeyboardShow] = React.useState();
  const insets = useSafeAreaInsets();

  const hasNotch =
    insets.top > 0 || insets.bottom > 0 || insets.left > 0 || insets.right > 0;
  React.useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setKeyboardShow(true);
        navigation.setOptions({
          tabBarVisible: false,
        });
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardShow(false);
        navigation.setOptions({
          tabBarVisible: true,
        });
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  return (
    <LinearGradient
      colors={[colors.secondary, colors.primary]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.tab}
    >
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;
        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });
          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate({ name: route.name, merge: true });
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            key={index}
            accessibilityRole="button"
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.tabBoxContainer}
          >
            <Image
              source={tabBarIcon[route.name]}
              tintColor={isFocused ? colors.activeTab : colors.inActiveTab}
              style={styles.tabIcon}
            />
            <Text
              style={[
                styles.labelStyle,
                {
                  color: isFocused
                    ? colors.activeTabLabel
                    : colors.inActiveTabLabel,
                },
              ]}
            >
              {tabBarLabel[route.name]}
            </Text>
          </TouchableOpacity>
        );
      })}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  tabBoxContainer: {
    flex: 1,
    paddingBottom: ms(15),
    paddingTop: ms(20),
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  labelStyle: {
    paddingTop: ms(10),
    fontSize: ms(10),
    fontFamily: fonts.Poppins.semiBold,
  },
  tab: {
    height: Platform.OS == "ios" ? ms(80) : ms(75),
    width: "91%",
    position: "absolute",
    bottom: isAndroid ? 10 : 20,
    alignSelf: "center",
    flexDirection: "row",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },

  tabIcon: {
    height: ms(25),
    width: ms(25),
    resizeMode: "contain",
  },
});

export { CustomBottomTabBar };
