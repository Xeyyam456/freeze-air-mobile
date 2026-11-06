import { StyleSheet } from "react-native";
import { c } from "@theme/colors";

const SIZE = 64;

export const styles = StyleSheet.create({
  wrap: { width: SIZE, height: SIZE },
  dimmed: { opacity: 0.4 },
  image: { width: SIZE, height: SIZE, borderRadius: 12, borderWidth: 1, borderColor: c.glassBorder },
  tile: {
    width: SIZE,
    height: SIZE,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: c.glassBorder,
    backgroundColor: c.surface2,
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
  },
  label: { color: c.ink, fontSize: 11, fontWeight: "700" },
  badge: {
    position: "absolute",
    left: 4,
    bottom: 4,
    color: c.white,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    fontSize: 10,
    fontWeight: "700",
    paddingHorizontal: 5,
    borderRadius: 6,
    overflow: "hidden",
  },
  x: {
    position: "absolute",
    top: -6,
    right: -6,
    width: 22,
    height: 22,
    borderRadius: 11,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: c.danger,
  },
  xOff: { backgroundColor: c.faint },
});
