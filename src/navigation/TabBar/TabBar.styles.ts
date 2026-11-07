import { StyleSheet } from "react-native";
import { c } from "@theme/colors";

export const styles = StyleSheet.create({
  // Aşağıya yapışıq: kənardan kənara, yalnız üst künclər yuvarlaq; alt boşluq sistem zolağı qədər (TabBar.tsx).
  // TAM QEYRİ-ŞƏFFAF və ekranın altından 1 px aşağı: altında sürüşən məzmun heç görünməsin (istifadəçi)
  wrap: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: -1,
    flexDirection: "row",
    paddingTop: 10,
    paddingHorizontal: 4,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderLeftWidth: StyleSheet.hairlineWidth,
    borderRightWidth: StyleSheet.hairlineWidth,
    borderColor: c.line,
    backgroundColor: c.surface,
    overflow: "hidden",
    elevation: 16,
    shadowColor: "#000",
    shadowOpacity: 0.5,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: -6 },
  },
});
