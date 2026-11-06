import { StyleSheet } from "react-native";
import { c, radius, space } from "@theme/colors";

export const styles = StyleSheet.create({
  // Günün elanları bir şüşəvari kart kimi: hər sətir yan kənarlı, ilk/son künclər yuvarlaq
  row: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: space.md,
    paddingHorizontal: space.md + 2,
    paddingVertical: space.md + 2,
    backgroundColor: c.glass,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: c.glassBorder,
  },
  first: { borderTopWidth: 1, borderTopLeftRadius: radius.md, borderTopRightRadius: radius.md },
  last: { borderBottomWidth: 1, borderBottomLeftRadius: radius.md, borderBottomRightRadius: radius.md, marginBottom: space.sm },
  divider: { borderTopWidth: 1, borderTopColor: c.line },
  pending: { opacity: 0.6 },
  icon: { width: 36, height: 36, borderRadius: 18, alignItems: "center", justifyContent: "center", backgroundColor: c.primarySoft, marginTop: 1 },
  iconFresh: { backgroundColor: c.primary },
  body: { flex: 1, gap: 4 },
  title: { color: c.ink, fontSize: 15, fontWeight: "700", lineHeight: 20 },
  text: { color: c.muted, fontSize: 14, lineHeight: 20 },
  meta: { flexDirection: "row", alignItems: "center", gap: 6, marginTop: 2 },
  fresh: {
    color: c.primary,
    backgroundColor: c.primarySoft,
    fontSize: 11,
    fontWeight: "800",
    paddingHorizontal: 8,
    paddingVertical: 1,
    borderRadius: 999,
    overflow: "hidden",
  },
  metaText: { color: c.muted, fontSize: 12 },
  trash: { width: 34, height: 34, borderRadius: 17, alignItems: "center", justifyContent: "center", backgroundColor: c.dangerSoft },
});
