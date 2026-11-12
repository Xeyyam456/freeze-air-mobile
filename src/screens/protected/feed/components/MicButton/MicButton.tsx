import { useRef } from "react";
import { Animated, PanResponder, View } from "react-native";
import GradientBg from "@shared/components/GradientBg";
import { MicIcon, SendIcon } from "@shared/icons";
import { c, gradients } from "@theme/colors";
import { styles } from "./MicButton.styles";
import type { MicButtonProps } from "./MicButton.types";

// WhatsApp mikrofonu: basıb saxla = yaz, burax = göndər, SOLA çək = ləğv, YUXARI çək = kilidlə (əl boşalır; sonra toxunuş göndərir).
// Jest bir PanResponder-dir (düymə jest zamanı unmount olmur); handler-lər ref-dədir ki, köhnə closure qalmasın
function MicButton(props: MicButtonProps) {
  const h = useRef(props);
  h.current = props;
  const pos = useRef(new Animated.ValueXY()).current;
  const g = useRef({ fired: false, tap: false });
  const back = () => Animated.spring(pos, { toValue: { x: 0, y: 0 }, useNativeDriver: true, bounciness: 6 }).start();

  const pan = useRef(PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderTerminationRequest: () => false,
    onPanResponderGrant: () => {
      g.current = { fired: false, tap: h.current.mode === "locked" };
      if (!g.current.tap) h.current.onStart();
    },
    onPanResponderMove: (_, s) => {
      if (g.current.tap || g.current.fired) return;
      pos.setValue({ x: Math.min(0, Math.max(-130, s.dx)), y: Math.min(0, Math.max(-90, s.dy)) });
      if (s.dx < -100) { g.current.fired = true; back(); h.current.onCancel(); }
      else if (s.dy < -80) { g.current.fired = true; back(); h.current.onLock(); }
    },
    onPanResponderRelease: () => { back(); if (!g.current.fired) h.current.onSend(); },
    onPanResponderTerminate: () => { back(); if (!g.current.fired && !g.current.tap) h.current.onCancel(); },
  })).current;

  const { mode } = props;
  return (
    <View style={styles.box}>
      <Animated.View {...pan.panHandlers} accessibilityLabel={mode === "locked" ? "Göndər" : "Səs yaz"}
        style={[styles.btn, mode === "hold" && styles.hold, { transform: [...pos.getTranslateTransform(), { scale: mode === "hold" ? 1.35 : 1 }] }]}>
        {mode === "locked" ? <GradientBg colors={gradients.accent} radius={23} /> : null}
        {mode === "locked" ? <SendIcon size={19} color={c.white} /> : <MicIcon size={21} color={mode === "hold" ? c.white : c.muted} />}
      </Animated.View>
    </View>
  );
}

export default MicButton;
