import { Pressable, Text, View } from "react-native";
import { FileTextIcon, ImageIcon, PenLineIcon, VideoIcon } from "@shared/icons";
import { c } from "@theme/colors";
import { styles } from "./TaskNoteRow.styles";
import type { TaskNoteRowProps } from "./TaskNoteRow.types";

// Kartın altı: fayl sayları (qrup üzrə) + "Təmir qeydi" düyməsi (yalnız bu günün görülmüş tapşırığında)
function TaskNoteRow({ task, editable, onNote }: TaskNoteRowProps) {
  const { act, photo, video } = task.files;
  if (!editable && !act && !photo && !video) return null;
  const counts = [
    { n: act, icon: FileTextIcon, label: "akt" },
    { n: photo, icon: ImageIcon, label: "şəkil" },
    { n: video, icon: VideoIcon, label: "video" },
  ].filter((x) => x.n > 0);
  return (
    <View style={styles.row}>
      <View style={styles.counts}>
        {counts.map(({ n, icon: Icon, label }) => (
          <View key={label} style={styles.count}>
            <Icon size={13} color={c.muted} />
            <Text style={styles.countText}>{n} {label}</Text>
          </View>
        ))}
      </View>
      {editable && (
        <Pressable onPress={onNote} hitSlop={6} style={({ pressed }) => [styles.button, pressed && styles.pressed]}>
          <PenLineIcon size={14} color={c.primary} />
          <Text style={styles.buttonText}>{task.note || act || photo || video ? "Qeydi dəyiş" : "Təmir qeydi"}</Text>
        </Pressable>
      )}
    </View>
  );
}

export default TaskNoteRow;
