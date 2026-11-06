import { Image } from "expo-image";
import { Pressable, Text, TextInput, View } from "react-native";
import Button from "@shared/components/Button";
import SourceMenu from "@shared/components/SourceMenu";
import { CameraIcon, CheckIcon, PenLineIcon } from "@shared/icons";
import { fmtKm } from "@shared/utils/fuel";
import { timeBaku } from "@shared/utils/time";
import MileagePhoto from "@screens/protected/fuel/components/MileagePhoto";
import useFuelStep from "@screens/protected/fuel/hooks/useFuelStep";
import { c } from "@theme/colors";
import { styles } from "./FuelStep.styles";
import type { FuelStepProps } from "./FuelStep.types";

// Səhər / axşam addımı (web Step): yazılıbsa şəkil + km + "Dəyiş"; yoxdursa şəkil plitəsi, km sahəsi, "Yadda saxla"
function FuelStep(props: FuelStepProps) {
  const { kind, value, photo, at, min, disabled } = props;
  const s = useFuelStep(props);
  const title = kind === "start" ? "Səhər: işə başlayanda" : "Axşam: işi bitirəndə";
  const sub = s.done && at ? `Yazılıb: ${timeBaku(at)}` : disabled ? "Əvvəl səhər km-ini yaz" : "Spidometrin şəkli + km";
  return (
    <View style={[styles.card, disabled && styles.disabled]}>
      <View style={styles.head}>
        <View style={[styles.tile, s.done && styles.tileDone]}>
          {s.done ? <CheckIcon size={17} color={c.ok} strokeWidth={3} /> : <Text style={styles.emoji}>{kind === "start" ? "☀️" : "🌙"}</Text>}
        </View>
        <View style={styles.headText}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.sub}>{sub}</Text>
        </View>
        {s.done && !disabled && (
          <Pressable onPress={s.startEdit} hitSlop={6} style={styles.edit}>
            <PenLineIcon size={13} color={c.primary} />
            <Text style={styles.editText}>Dəyiş</Text>
          </Pressable>
        )}
      </View>
      {s.done ? (
        <View style={styles.doneRow}>
          <MileagePhoto path={photo} />
          <Text style={styles.value}>{fmtKm(value!)} <Text style={styles.unit}>km</Text></Text>
        </View>
      ) : (
        <View style={styles.form}>
          <View style={styles.formRow}>
            <Pressable onPress={() => s.setMenu(true)} disabled={disabled} style={[styles.photo, (s.uri || photo) && styles.photoOn]}>
              {s.uri ? <Image source={{ uri: s.uri }} style={styles.preview} contentFit="cover" />
                : <><CameraIcon size={18} color={c.primary} /><Text style={styles.photoText}>Şəkil</Text></>}
            </Pressable>
            <TextInput value={s.km} onChangeText={s.setKm} editable={!disabled} keyboardType="number-pad" style={styles.input}
              placeholder={min !== undefined ? `≥ ${fmtKm(min)}` : "məs. 52000"} placeholderTextColor={c.faint} />
          </View>
          <View style={styles.actions}>
            {s.editing && <Button title="Ləğv et" variant="glass" onPress={s.cancel} style={styles.grow} />}
            <Button title="Yadda saxla" variant="gradient" disabled={disabled} onPress={s.submit} style={styles.grow} />
          </View>
        </View>
      )}
      {s.menu && <SourceMenu title="Spidometr şəkli" sources={["camera", "gallery"]} onClose={() => s.setMenu(false)}
        onPick={(src) => void s.pick(src === "camera" ? "camera" : "gallery")} />}
    </View>
  );
}

export default FuelStep;
