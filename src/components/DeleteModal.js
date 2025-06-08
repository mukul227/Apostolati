import React from "react";
import { fonts, ShadowStyles } from "@/theme";
import { Spacer } from "./Spacer";
import { DeleteIcon } from "@/assets";
import i18n from "@/localization/i18n";
import { ms } from "@/utils/scaling-utils";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  Image,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const Button = ({ title, onPress, colors, style }) => {
  return (
    <TouchableOpacity onPress={onPress} style={[style]}>
      <LinearGradient
        colors={colors}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.premiumButtonGradient}
      >
        <Text style={styles.premiumButtonText}>{title.toUpperCase()}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const DeleteModal = ({ visible, onContinue, onCancel }) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onContinue}
    >
      <View style={styles.modalOverlay}>
        <LinearGradient
          colors={["#ffffff", "#f7f7f7"]}
          style={styles.modalContent}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <View style={styles.iconWrapper}>
            <Image source={DeleteIcon} style={styles.deleteImage} />
          </View>

          <Text style={styles.titleText}>{i18n.t("sure_delete")}</Text>

          <Spacer space={20} />

          <View style={styles.buttonRow}>
            <Button
              colors={["#9c3c7d", "#ad5389"]}
              title={i18n.t("cancel")}
              onPress={onCancel}
              style={styles.cancelButton}
            />
            <Button
              colors={["#7a5299", "#3c1053"]}
              title={i18n.t("delete")}
              onPress={onContinue}
              style={styles.deleteButton}
            />
          </View>
        </LinearGradient>
      </View>
    </Modal>
  );
};

export default DeleteModal;

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
  },
  modalContent: {
    width: ms(340),
    padding: ms(25),
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    elevation: 10,
  },
  iconWrapper: {
    backgroundColor: "#fff",
    padding: ms(10),
    borderRadius: 50,
    elevation: 4,
    ...ShadowStyles.shadow,
    marginBottom: ms(15),
  },
  deleteImage: {
    width: ms(60),
    height: ms(60),
    resizeMode: "contain",
    tintColor: "#3c1053",
  },
  titleText: {
    fontSize: ms(18),
    color: "#313131",
    textAlign: "center",
    fontFamily: fonts.Poppins.semiBold,
    marginVertical: ms(10),
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  premiumButtonGradient: {
    paddingVertical: ms(12),
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    // elevation: 5,
    width: "100%",
  },
  premiumButtonText: {
    fontSize: ms(14),
    color: "#fff",
    fontFamily: fonts.Poppins.medium,
    letterSpacing: 1,
  },
  cancelButton: {
    width: ms(130),
    marginRight: ms(10),
  },
  deleteButton: {
    width: ms(130),
    marginLeft: ms(10),
  },
});
