import { useRef } from "react";
import { ActivityIndicator, Text, TouchableOpacity } from "react-native";
import GradientBg from "@shared/components/GradientBg";
import { c, gradients } from "@theme/colors";
import { BG, styles } from "./Button.styles";
import type { ButtonProps } from "./Button.types";

// Ardıcıl iki basış bir dəfə sayılır (təsadüfi ikiqat check_in olmasın)
const DOUBLE_PRESS_GUARD_MS = 600;

function Button({ title, onPress, variant = "primary", icon: Icon, loading, disabled, style }: ButtonProps) {
  const lastPress = useRef(0);
  const off = disabled || loading;

  function handlePress() {
    const now = Date.now();
    if (now - lastPress.current < DOUBLE_PRESS_GUARD_MS) return;
    lastPress.current = now;
    onPress?.();
  }

  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: BG[variant] }, variant === "glass" && styles.glass, off && styles.disabled, style]}
      onPress={handlePress}
      disabled={off}
      activeOpacity={0.8}
    >
      {variant === "gradient" && <GradientBg colors={gradients.accent} radius={16} />}
      {loading ? <ActivityIndicator size="small" color={c.white} /> : Icon && <Icon size={18} color={c.white} />}
      <Text style={styles.title} numberOfLines={1}>{title}</Text>
    </TouchableOpacity>
  );
}

export default Button;
