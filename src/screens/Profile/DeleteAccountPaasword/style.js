const { fonts } = require("@/theme");
const { StyleSheet } = require("react-native");
const { ms } = require("@/utils/scaling-utils");

export const styles = StyleSheet.create({
  container: {
    paddingHorizontal: ms(20),
    flex:0.9
  },
  image: {
    width: ms(153),
    height: ms(133),
    alignSelf: "center",
    resizeMode: "contain",
    marginVertical: ms(15),
  },
  instructionText: {
    color: "#868D98",
    fontSize: ms(14),
    textAlign: "center",
    fontFamily: fonts.Poppins.regular,
  },
  label: {
    fontSize: 12,
    color: "#4F4F4F",
    fontFamily: fonts.Poppins.medium,
  },
  buttonContainer: {
    flex: 0.1,
    justifyContent: "flex-end",
    paddingHorizontal: ms(20),
  },
});
