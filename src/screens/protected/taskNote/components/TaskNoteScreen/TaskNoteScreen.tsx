import { Pressable, Text, TextInput, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Button from "@shared/components/Button";
import { CheckIcon, CloseIcon } from "@shared/icons";
import ExistingFiles from "@screens/protected/taskNote/components/ExistingFiles";
import FileTiles from "@screens/protected/taskNote/components/FileTiles";
import NewFiles from "@screens/protected/taskNote/components/NewFiles";
import useMediaPickers from "@screens/protected/taskNote/hooks/useMediaPickers";
import useTaskNoteForm from "@screens/protected/taskNote/hooks/useTaskNoteForm";
import { c } from "@theme/colors";
import { styles } from "./TaskNoteScreen.styles";
import type { TaskNoteScreenProps } from "./TaskNoteScreen.types";

// Təmir barədə: görülmüş tapşırığa yazı + akt/şəkil/video (web TaskNoteModal kimi). Tab bar-ın üstündə tam ekran;
// X və telefonun "geri" düyməsi bağlayır. Saxla → ekran dərhal bağlanır, yükləmə arxada (useSaveTaskNote).
function TaskNoteScreen({ route, navigation }: TaskNoteScreenProps) {
  const { task } = route.params;
  const insets = useSafeAreaInsets();
  const f = useTaskNoteForm(task);
  const pickers = useMediaPickers(f);

  return (
    <View style={[styles.flex, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <Pressable onPress={navigation.goBack} hitSlop={10} style={styles.close} accessibilityLabel="Bağla">
          <CloseIcon size={20} color={c.ink} />
        </Pressable>
        <View style={styles.headText}>
          <Text style={styles.title}>Təmir barədə</Text>
          <Text style={styles.sub} numberOfLines={1}>{task.place}</Text>
        </View>
      </View>

      <KeyboardAwareScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled" bottomOffset={24}>
        <Text style={styles.reason}>{task.reason}</Text>
        <View style={styles.field}>
          <Text style={styles.label}>Nə edildi?</Text>
          <TextInput value={f.note} onChangeText={f.setNoteText} multiline textAlignVertical="top" style={styles.input}
            placeholderTextColor={c.faint} placeholder="Məs. kompressor klapanı dəyişdirildi, qaz sızması aradan qalxdı" />
        </View>
        <ExistingFiles saved={f.saved} removed={f.removed} onToggle={f.toggleRemove} />
        <FileTiles form={f} pickers={pickers} />
        <NewFiles form={f} />
      </KeyboardAwareScrollView>

      <View style={[styles.footer, { paddingBottom: insets.bottom + 12 }]}>
        <Button title="Yadda saxla" variant="gradient" icon={CheckIcon} onPress={f.submit} />
      </View>
    </View>
  );
}

export default TaskNoteScreen;
