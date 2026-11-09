import { useRef } from "react";
import { Animated, Keyboard, PanResponder, View } from "react-native";
import { styles } from "./DragSheet.styles";
import type { DragSheetProps } from "./DragSheet.types";

// Alt panelin (bottom sheet) ortaq qabığı: yuxarıdakı tutacaq zonasından (xəttin yeri) AŞAĞI sürüşdürəndə panel barmağı izləyir;
// kifayət qədər çəkilsə (90 px) və ya sürətli çəkilsə aşağı sürüşüb bağlanır, yoxsa geri qayıdır. Zona görünməzdir, panelin üstündə dayanır
function DragSheet({ style, onClose, children }: DragSheetProps) {
  const dy = useRef(new Animated.Value(0)).current;
  const close = useRef(onClose);
  close.current = onClose;
  const drag = useRef(PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderGrant: () => Keyboard.dismiss(),
    onPanResponderMove: (_, g) => { if (g.dy > 0) dy.setValue(g.dy); },
    onPanResponderRelease: (_, g) => {
      if (g.dy > 90 || g.vy > 0.9) Animated.timing(dy, { toValue: 900, duration: 180, useNativeDriver: true }).start(() => close.current());
      else Animated.spring(dy, { toValue: 0, useNativeDriver: true, bounciness: 6 }).start();
    },
    onPanResponderTerminate: () => Animated.spring(dy, { toValue: 0, useNativeDriver: true }).start(),
  })).current;

  return (
    <Animated.View style={[style, { transform: [{ translateY: dy }] }]}>
      {children}
      <View {...drag.panHandlers} style={styles.zone} />
    </Animated.View>
  );
}

export default DragSheet;
