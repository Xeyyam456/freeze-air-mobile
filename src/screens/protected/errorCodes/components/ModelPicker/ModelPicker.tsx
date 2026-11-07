import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import ModelSheet from "@screens/protected/errorCodes/components/ModelSheet";
import { ChevronDownIcon, SnowflakeIcon } from "@shared/icons";
import { c } from "@theme/colors";
import { styles } from "./ModelPicker.styles";
import type { ModelPickerProps } from "./ModelPicker.types";

// Model seçimi: tək düymə (seçilmiş model + kod sayı + ox) → alt paneldə siyahı. 20–30 model olsa da ekran sakit qalır. Tək model olsa göstərilmir
function ModelPicker({ models, counts, value, onChange }: ModelPickerProps) {
  const [open, setOpen] = useState(false);
  const cur = models.find((m) => m.id === value);
  if (models.length < 2 || !cur) return null;
  return (
    <>
      <Pressable onPress={() => setOpen(true)} style={styles.btn} accessibilityLabel={`Model: ${cur.name}. Dəyiş`}>
        <View style={styles.tile}><SnowflakeIcon size={20} color={c.primary} /></View>
        <View style={styles.text}>
          <Text style={styles.kicker}>MODEL</Text>
          <Text style={styles.name} numberOfLines={1}>{cur.name}</Text>
        </View>
        <Text style={styles.count}>{counts.get(cur.id) ?? 0} kod</Text>
        <ChevronDownIcon size={20} color={c.muted} />
      </Pressable>
      {open ? <ModelSheet models={models} counts={counts} value={value} onPick={(id) => { onChange(id); setOpen(false); }} onClose={() => setOpen(false)} /> : null}
    </>
  );
}

export default ModelPicker;
