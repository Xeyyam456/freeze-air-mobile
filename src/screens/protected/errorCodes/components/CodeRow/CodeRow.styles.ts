import { StyleSheet } from "react-native";
import { c, radius } from "@theme/colors";

export const styles = StyleSheet.create({
  // Qrup bir kartdır: sətirlər arasında nazik xətt, yalnız ilk/son sətirdə künc yuvarlaq (iOS siyahısı kimi)
  row: { flexDirection: "row", alignItems: "center", gap: 14, paddingVertical: 12, paddingHorizontal: 14, backgroundColor: c.glass, borderLeftWidth: 1, borderRightWidth: 1, borderColor: c.glassBorder },
  first: { borderTopWidth: 1, borderTopLeftRadius: radius.md, borderTopRightRadius: radius.md },
  last: { borderBottomWidth: 1, borderBottomLeftRadius: radius.md, borderBottomRightRadius: radius.md },
  divider: { borderBottomWidth: 1, borderBottomColor: c.line },
  plate: { width: 54, height: 42, borderRadius: 13, alignItems: "center", justifyContent: "center", borderWidth: 1 },
  plateOff: { backgroundColor: "transparent", borderColor: "rgba(255, 255, 255, 0.05)" },
  code: { color: c.ink, fontSize: 17, fontWeight: "800", letterSpacing: 0.4, fontVariant: ["tabular-nums"] },
  codeOff: { color: c.faint },
  text: { flex: 1 },
  title: { color: c.ink, fontSize: 14, fontWeight: "600", lineHeight: 19 },
  titleOff: { color: c.faint, fontWeight: "500" },
});
