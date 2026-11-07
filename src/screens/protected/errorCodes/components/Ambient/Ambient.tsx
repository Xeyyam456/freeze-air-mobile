import { View, useWindowDimensions } from "react-native";
import Svg, { Defs, RadialGradient, Rect, Stop } from "react-native-svg";
import { styles } from "./Ambient.styles";

// Ekranın yuxarısında yumşaq mühit işığı: sol-yuxarıda mavi, sağda mərcan (arxa fon, toxunuşa mane olmur)
function Ambient() {
  const { width } = useWindowDimensions();
  const h = 420;
  return (
    <View style={styles.box} pointerEvents="none">
      <Svg width={width} height={h}>
        <Defs>
          <RadialGradient id="amA" cx="0%" cy="0%" r="70%"><Stop offset="0" stopColor="#4f8dff" stopOpacity={0.22} /><Stop offset="1" stopColor="#4f8dff" stopOpacity={0} /></RadialGradient>
          <RadialGradient id="amB" cx="100%" cy="18%" r="60%"><Stop offset="0" stopColor="#ff6a5c" stopOpacity={0.16} /><Stop offset="1" stopColor="#ff6a5c" stopOpacity={0} /></RadialGradient>
        </Defs>
        <Rect width={width} height={h} fill="url(#amA)" />
        <Rect width={width} height={h} fill="url(#amB)" />
      </Svg>
    </View>
  );
}

export default Ambient;
