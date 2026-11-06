import { Eye, EyeOff } from "lucide-react-native";
import { useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import { c } from "@theme/colors";
import { styles } from "./TextField.styles";
import type { TextFieldProps } from "./TextField.types";

// Yazı sahəsi: başlıq, solda ikon, parolda göz düyməsi
function TextField({ label, icon: Icon, secure, ...input }: TextFieldProps) {
  const [focused, setFocused] = useState(false);
  const [hidden, setHidden] = useState(true);
  return (
    <View style={styles.wrap}>
      <Text style={styles.label}>{label}</Text>
      <View style={[styles.box, focused && styles.focused]}>
        {Icon && <Icon size={18} color={focused ? c.primary : c.muted} />}
        <TextInput
          {...input}
          style={styles.input}
          placeholderTextColor={c.muted}
          secureTextEntry={secure && hidden}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />
        {secure && (
          <Pressable onPress={() => setHidden((h) => !h)} hitSlop={10} style={styles.eye}>
            {hidden ? <Eye size={18} color={c.muted} /> : <EyeOff size={18} color={c.muted} />}
          </Pressable>
        )}
      </View>
    </View>
  );
}

export default TextField;
