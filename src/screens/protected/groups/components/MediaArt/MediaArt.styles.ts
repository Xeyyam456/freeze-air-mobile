import { StyleSheet } from "react-native";

// 56×56 sahə (GroupCard plitəsi ilə eyni ölçü)
export const styles = StyleSheet.create({
  box: { width: 56, height: 56 },
  photo: { position: "absolute", left: 3, top: 7 },
  video: { position: "absolute", right: 2, bottom: 6, alignItems: "center", justifyContent: "center" },
  play: { position: "absolute" },
});
