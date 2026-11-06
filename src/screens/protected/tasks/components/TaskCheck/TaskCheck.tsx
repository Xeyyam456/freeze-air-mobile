import { Pressable } from "react-native";
import Animated, { ZoomIn } from "react-native-reanimated";
import { CheckIcon } from "@shared/icons";
import { c } from "@theme/colors";
import { styles } from "./TaskCheck.styles";
import type { TaskCheckProps } from "./TaskCheck.types";

// "Görüldü" dairəsi: toxunan an dolur (optimistik), işarə yumşaq böyüyərək çıxır. Bağlı gündə/geri alınanda toxunulmaz.
function TaskCheck({ done, disabled, onPress }: TaskCheckProps) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      hitSlop={12}
      accessibilityRole="checkbox"
      accessibilityState={{ checked: done, disabled }}
      style={({ pressed }) => [styles.box, done && styles.done, disabled && styles.disabled, pressed && styles.pressed]}
    >
      {done && (
        <Animated.View entering={ZoomIn.duration(180)}>
          <CheckIcon size={16} color={c.bg} strokeWidth={3} />
        </Animated.View>
      )}
    </Pressable>
  );
}

export default TaskCheck;
