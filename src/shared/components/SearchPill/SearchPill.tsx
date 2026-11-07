import { useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import { CloseIcon, SearchIcon } from "@shared/icons";
import { c } from "@theme/colors";
import { styles } from "./SearchPill.styles";
import type { SearchPillProps } from "./SearchPill.types";

// Axtarış həbi: fokusda mavi çərçivə, yazanda sağda silmə düyməsi; altda sakit izah ("166 kod" / "9 uyğun kod")
function SearchPill({ value, onChange, onSubmit, hint, placeholder, upper = false }: SearchPillProps) {
  const [focus, setFocus] = useState(false);
  return (
    <View>
      <View style={[styles.pill, focus && styles.pillOn]}>
        <SearchIcon size={20} color={focus ? c.primary : c.muted} />
        <TextInput value={value} onChangeText={onChange} onFocus={() => setFocus(true)} onBlur={() => setFocus(false)} onSubmitEditing={onSubmit}
          placeholder={placeholder} placeholderTextColor={c.faint} style={styles.input} autoCapitalize={upper ? "characters" : "none"} autoCorrect={false} returnKeyType="search" />
        {value ? <Pressable onPress={() => onChange("")} hitSlop={8} style={styles.clear} accessibilityLabel="Təmizlə"><CloseIcon size={16} color={c.muted} /></Pressable> : null}
      </View>
      {hint ? <Text style={styles.hint}>{hint}</Text> : null}
    </View>
  );
}

export default SearchPill;
