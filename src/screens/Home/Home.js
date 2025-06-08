import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  Clipboard,
  Image,
  Linking,
  RefreshControl,
  Text,
  View,
  TouchableOpacity,
  Animated,
} from "react-native";
import { style } from "./style";
import { NAVIGATION } from "@/constants";
import ScreenWrapper from "@/components/ScreenWrapper";
import { logOutIcon, MoreIcon, plusIcon, SearchIcon } from "@/assets";
import i18n from "@/localization/i18n";
import CommonTextInput from "@/components/CommonTextInput";
import { Spacer } from "@/components/Spacer";
import NoDataFound from "@/components/NoDataFound";
import { FlashList } from "@shopify/flash-list";
import * as FileSystem from "expo-file-system";
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from "react-native-popup-menu";
import {
  useAllClubListMutation,
  useGetEnrollDataMutation,
} from "@/redux/services/homeApi";
import { useDispatch } from "react-redux";
import { capitalizeFirstLetter } from "@/utils/GlobalMethods";
import { useFocusEffect } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import AddEnrolees from "./components/AddEnrolees";
import { Dropdown } from "react-native-element-dropdown";
import {
  ApiHomeInventory,
  CERTIFICATE_LINK,
  DONWLOAD_LINK,
} from "@/utils/APIinventory";
import { FullScreenLoader } from "@/components/FullScreenLoader";
import ListFooter from "@/components/ListFooter";
import { CustomSuccessToast } from "@/components/Toast";

export const Home = () => {
  const dispatch = useDispatch();
  const styles = style();

  const [selectedClub, setSelectedClub] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [debouncedSearchText, setDebouncedSearchText] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [enrolleeList, setEnrolleeList] = useState({
    current_page: 1,
    last_page: 1,
    data: [],
  });
  const [refreshing, setRefreshing] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [showFab, setShowFab] = useState(true);

  const onEndReachedCalledDuringMomentum = useRef(false);

  const [allClubList, { data: clubData }] = useAllClubListMutation();
  const [
    getEnrollData,
    {
      isLoading: enrollDataLoading,
      data: enrollData,
      isSuccess: enrollDataSuccess,
    },
  ] = useGetEnrollDataMutation();

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedSearchText(searchText), 300);
    return () => clearTimeout(handler);
  }, [searchText]);

  useFocusEffect(
    useCallback(() => {
      allClubList();
      getEnrollListData(ApiHomeInventory.getEnrollData);
    }, [])
  );

  useEffect(() => {
    onSearchRegion();
  }, [debouncedSearchText, selectedClub]);

  const onRefresh = () => {
    setRefreshing(true);
    setSearchText("");
    setSelectedClub(null);
    setTimeout(() => setRefreshing(false), 500);
    getEnrollListData(ApiHomeInventory.getEnrollData);
  };

  const onCopyToClipboard = (item) => {
    console.log("Test", item);
    let finalString = `${item?.name} has been added to ${item?.club?.club_name}. Purgatorialsociety.org to see upcoming masses.`;
    Clipboard.setString(finalString);
    CustomSuccessToast({ message: "Copied" });
  };

  const onSearchRegion = () => {
    const trimmedSearch = debouncedSearchText.trim();
    const queryParams = [];
    if (trimmedSearch)
      queryParams.push(`search=${encodeURIComponent(trimmedSearch)}`);
    if (selectedClub?.id) queryParams.push(`club=${selectedClub.id}`);
    const url =
      queryParams.length > 0
        ? `${ApiHomeInventory.getEnrollData}?${queryParams.join("&")}`
        : ApiHomeInventory.getEnrollData;
    getEnrollListData(url);
  };

  const getEnrollListData = async (url, page = 1, append = false) => {
    const separator = url.includes("?") ? "&" : "?";

    try {
      const res = await getEnrollData(
        `${url}${separator}page=${page}`
      ).unwrap();

      if (res?.data) {
        console.log("DTATATDATDATDA", JSON.stringify(res?.data));
        setEnrolleeList((prev) => ({
          current_page: res.data.current_page,
          last_page: res.data.last_page,
          data: append
            ? [...(prev?.data || []), ...res.data.data]
            : res.data.data,
        }));
      }
    } catch (err) {
      console.error("Failed to fetch enroll list:", err);
    } finally {
      setIsLoadingMore(false);
    }
  };

  const onLoadMoreEnrollee = () => {
    if (isLoadingMore) return;

    if (enrolleeList.current_page < enrolleeList.last_page) {
      setIsLoadingMore(true);
      const nextPage = enrolleeList.current_page + 1;
      const trimmedSearch = debouncedSearchText.trim();
      const queryParams = [];
      if (trimmedSearch)
        queryParams.push(`search=${encodeURIComponent(trimmedSearch)}`);
      if (selectedClub?.id) queryParams.push(`club=${selectedClub.id}`);

      const baseUrl = ApiHomeInventory.getEnrollData;
      const url =
        queryParams.length > 0
          ? `${baseUrl}?${queryParams.join("&")}`
          : baseUrl;

      getEnrollListData(url, nextPage, true);
    }
  };

  const dropdownData = [
    { id: null, club_name: "All Societies" },
    ...(clubData?.data || []),
  ];

  const renderDropItem = (item) => (
    <View style={styles.labelViewStyle}>
      <Text style={styles.labelTextStyle}>{item.club_name}</Text>
    </View>
  );

  const renderItem = ({ item, index }) => (
    <View style={styles.cardContainer}>
      <View style={styles.badge}>
        <Text style={styles.badgeText}>{index + 1}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.title} numberOfLines={1}>
          {capitalizeFirstLetter(item?.name) || "No Name"}
        </Text>
        <Text style={styles.subTitle} numberOfLines={2}>
          {item?.club?.club_name || "No Society"}
        </Text>
        <View style={styles.metaRow}>
          <Text style={styles.metaText} numberOfLines={1}>
            {`By: ${item?.user?.name || "Unknown"} • ${
              item?.created_at
                ? new Date(item.created_at).toLocaleDateString()
                : ""
            }`}
          </Text>
        </View>
      </View>
      {item?.club?.plan_id == "95473" && (
        <Menu>
          <MenuTrigger
            customStyles={{
              TriggerTouchableComponent: TouchableOpacity,
              triggerTouchable: { padding: 10 },
            }}
          >
            <Image source={MoreIcon} style={styles.moreIcon} />
          </MenuTrigger>
          <MenuOptions style={styles.menuOptions}>
            <MenuOption
              onSelect={() => onCopyToClipboard(item)}
              style={styles.menuOption}
            >
              <Text style={[styles.optionText]}>Copy</Text>
            </MenuOption>

            <MenuOption
              onSelect={() => Linking.openURL(CERTIFICATE_LINK)}
              style={styles.menuOption}
            >
              <Text style={[styles.optionText]}>Certificate</Text>
            </MenuOption>
            <MenuOption
              onSelect={() => Linking.openURL(DONWLOAD_LINK)}
              style={styles.menuOption}
            >
              <Text style={[styles.optionText]}>Enrollment Card</Text>
            </MenuOption>
          </MenuOptions>
        </Menu>
      )}
      <View style={{ width: 10 }} />
    </View>
  );

  const handleScroll = (event) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    if (offsetY <= 0) {
      // Top of the list
      setShowFab(true);
    } else {
      // Scrolled down
      setShowFab(false);
    }
  };

  const downloadAndShareFile = async (url, filename) => {
    try {
      const downloadResumable = FileSystem.createDownloadResumable(
        url,
        FileSystem.documentDirectory + filename
      );

      const { uri } = await downloadResumable.downloadAsync();

      if (uri) {
        console.log("URIRI");
        CustomSuccessToast({ message: "Download complete" });
        // console.log('Finished downloading to ', uri);
        // // Optionally share the file
        // if (await Sharing.isAvailableAsync()) {
        //   await Sharing.shareAsync(uri);
        // } else {
        //   Alert.alert('Download complete', 'File downloaded but sharing is not available on this device.');
        // }
      }
    } catch (error) {
      console.error("Download failed:", error);
      Alert.alert("Error", "Failed to download the file.");
    }
  };

  return (
    <ScreenWrapper
      scrollEnabled={false}
      useKeyboardAwareScrollView={false}
      useSafeArea={false}
      routeName={NAVIGATION.loginScreen}
      style={styles.screenWrapper}
    >
      <View style={{ flex: 1 }}>
        <LinearGradient
          colors={["#ad5389", "#3c1053"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.topContainer}
        >
          <CommonTextInput
            value={searchText}
            onChangeText={setSearchText}
            placeholder={i18n.t("searchDestination")}
            rightIcon={SearchIcon}
            rightIconOnPress={() => {}}
            borderStyle={styles.searchInputBorder}
            rightIconStyle={{ tintColor: "#3c1053" }}
            placeholderTextColor
          />
        </LinearGradient>
        <View style={styles.bottomContainer}>
          <Spacer space={20} />
          <Dropdown
            autoScroll={false}
            showsVerticalScrollIndicator={false}
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            containerStyle={{ borderRadius: 10 }}
            itemContainerStyle={{ borderRadius: 10, margin: 4 }}
            iconColor="#ad5389"
            data={clubData?.data ? dropdownData : []}
            labelField="club_name"
            valueField="club_name"
            placeholder="All Societies"
            value={selectedClub?.club_name}
            onChange={setSelectedClub}
            renderItem={renderDropItem}
            flatListProps={{
              ItemSeparatorComponent: () => <View style={styles.separator} />,
            }}
          />
          <FlashList
            estimatedItemSize={100}
            refreshControl={
              <RefreshControl
                tintColor={"#3c1053"}
                refreshing={refreshing}
                onRefresh={onRefresh}
              />
            }
            data={enrolleeList?.data ?? []}
            extraData={enrolleeList?.data ?? []}
            renderItem={renderItem}
            keyExtractor={(item) => item?.id?.toString()}
            contentContainerStyle={styles.flashListContent}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={() =>
              !enrollDataLoading &&
              enrolleeList?.data?.length === 0 && <NoDataFound />
            }
            ListFooterComponent={() =>
              enrolleeList?.data?.length > 0 && (
                <ListFooter isLoading={isLoadingMore} />
              )
            }
            onEndReached={() =>
              (onEndReachedCalledDuringMomentum.current = true)
            }
            onMomentumScrollEnd={() => {
              if (onEndReachedCalledDuringMomentum.current && !isLoadingMore) {
                onLoadMoreEnrollee();
                onEndReachedCalledDuringMomentum.current = false;
              }
            }}
            onScroll={handleScroll}
            scrollEventThrottle={16}
          />
        </View>
        {showFab && (
          <TouchableOpacity
            style={styles.fab}
            onPress={() => setModalVisible(true)}
          >
            <LinearGradient
              colors={["#ad5389", "#3c1053"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.fabGradient}
            >
              <Image source={plusIcon} style={styles.plusIcon} />
            </LinearGradient>
          </TouchableOpacity>
        )}
        <AddEnrolees
          visible={modalVisible}
          onCancel={() => {
            getEnrollListData(ApiHomeInventory.getEnrollData);
            setModalVisible(false);
          }}
        />
        {enrollDataLoading && !refreshing && !isLoadingMore && (
          <FullScreenLoader />
        )}
      </View>
    </ScreenWrapper>
  );
};
