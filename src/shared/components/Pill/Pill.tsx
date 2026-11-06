import { Text } from "react-native";
import { styles } from "./Pill.styles";
import type { PillProps } from "./Pill.types";

// Vəziyyət nişanı ("İşdəsən · 09:02-dən")
function Pill({ text, color, bg }: PillProps) {
  return <Text style={[styles.pill, { color, backgroundColor: bg }]} numberOfLines={1}>{text}</Text>;
}

export default Pill;
