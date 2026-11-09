import { useEffect } from "react";
import { Modal, Pressable, ScrollView, Text, useWindowDimensions, View } from "react-native";
import Animated, { Easing, useAnimatedStyle, useSharedValue, withRepeat, withSequence, withTiming, ZoomIn } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Svg, { Defs, RadialGradient, Rect, Stop } from "react-native-svg";
import { toneOf } from "@shared/config/codeTones";
import { ChevronLeftIcon, ChevronRightIcon, CloseIcon } from "@shared/icons";
import { isNoInfo, splitSteps } from "@shared/utils/errorCodes";
import WorkSteps from "@screens/protected/errorCodes/components/WorkSteps";
import DragSheet from "@shared/components/DragSheet";
import { c } from "@theme/colors";
import { styles } from "./CodeSheet.styles";
import type { CodeSheetProps } from "./CodeSheet.types";

// Kodun izahı (alt panel): ortada iri kod (yaylanaraq gəlir; arxada ailə rəngində nəfəs alan işıq), model, açıqlama, "Edilecək iş" addımlar xətti kimi,
// eyni kod digər modellərdə, ‹ › qonşu kodlar. X, fon və "geri" bağlayır
function CodeSheet({ code, modelName, twins, prev, next, onSelect, onClose }: CodeSheetProps) {
  const { height, width } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const off = isNoInfo(code);
  const tone = toneOf(code.code[0] ?? "");
  const glow = useSharedValue(1);
  useEffect(() => { glow.value = withRepeat(withSequence(withTiming(0.55, { duration: 2400, easing: Easing.inOut(Easing.sin) }), withTiming(1, { duration: 2400, easing: Easing.inOut(Easing.sin) })), -1); }, [glow]);
  const glowStyle = useAnimatedStyle(() => ({ opacity: glow.value }));
  return (
    <Modal transparent animationType="slide" statusBarTranslucent navigationBarTranslucent onRequestClose={onClose}>
      <Pressable style={styles.backdrop} onPress={onClose} />
      <View style={styles.wrap} pointerEvents="box-none">
        <DragSheet style={[styles.sheet, { maxHeight: height * 0.9 }]} onClose={onClose}>
          <View style={styles.banner}>
            <Animated.View style={[styles.glow, glowStyle]} pointerEvents="none">
              <Svg width={width} height={210}>
                <Defs><RadialGradient id="gl" cx="50%" cy="48%" r="55%"><Stop offset="0" stopColor={tone} stopOpacity={0.34} /><Stop offset="1" stopColor={tone} stopOpacity={0} /></RadialGradient></Defs>
                <Rect width={width} height={210} fill="url(#gl)" />
              </Svg>
            </Animated.View>
            <View style={styles.handle} />
            <Text style={styles.model}>{modelName.toUpperCase()}</Text>
            <Animated.Text key={code.id} entering={ZoomIn.springify().damping(13).stiffness(140)} style={styles.code}>{code.code}</Animated.Text>
            <Pressable onPress={onClose} hitSlop={10} style={styles.close} accessibilityLabel="Bağla"><CloseIcon size={18} color={c.ink} /></Pressable>
          </View>
          <ScrollView contentContainerStyle={[styles.body, { paddingBottom: insets.bottom + 20 }]} showsVerticalScrollIndicator={false}>
            <Text style={[styles.title, off && styles.muted]}>{off ? "Kitabçada bu kodun izahı yoxdur" : code.title}</Text>
            <View>
              <Text style={styles.head}>EDİLECƏK İŞ</Text>
              {code.solution ? <WorkSteps steps={splitSteps(code.solution)} /> : <Text style={styles.empty}>Hələ yazılmayıb. Rəhbərlik admin paneldən əlavə edə bilər.</Text>}
            </View>
            {twins.length > 0 ? (
              <View>
                <Text style={styles.head}>{code.code} DİGƏR MODELLƏRDƏ</Text>
                {twins.map((t) => (
                  <Pressable key={t.id} onPress={() => onSelect(t)} style={styles.twin}>
                    <Text style={styles.twinModel}>{t.model.replace("Daikin ", "")}</Text>
                    <Text style={styles.twinText} numberOfLines={1}>{isNoInfo(t) ? "İzah yoxdur" : t.title}</Text>
                    <ChevronRightIcon size={16} color={c.faint} />
                  </Pressable>
                ))}
              </View>
            ) : null}
            <View style={styles.steps}>
              <Pressable disabled={!prev} onPress={() => prev && onSelect(prev)} style={[styles.step, !prev && styles.stepOff]} accessibilityLabel="Əvvəlki kod">
                <ChevronLeftIcon size={18} color={c.ink} /><Text style={styles.stepText}>{prev?.code ?? "—"}</Text>
              </Pressable>
              <Pressable disabled={!next} onPress={() => next && onSelect(next)} style={[styles.step, !next && styles.stepOff]} accessibilityLabel="Növbəti kod">
                <Text style={styles.stepText}>{next?.code ?? "—"}</Text><ChevronRightIcon size={18} color={c.ink} />
              </Pressable>
            </View>
          </ScrollView>
        </DragSheet>
      </View>
    </Modal>
  );
}

export default CodeSheet;
