import { Text } from "react-native";
import useCountUp from "@shared/hooks/useCountUp";
import type { CountUpProps } from "./CountUp.types";

// Sayğac mətni: rəqəm 0-dan (və ya əvvəlki dəyərdən) yenisinə sayır
function CountUp({ value, style, suffix = "" }: CountUpProps) {
  const shown = useCountUp(value);
  return <Text style={style}>{shown}{suffix}</Text>;
}

export default CountUp;
