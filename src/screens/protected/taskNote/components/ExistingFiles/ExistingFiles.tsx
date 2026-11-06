import { ActivityIndicator, Text, View } from "react-native";
import FileThumb from "@screens/protected/taskNote/components/FileThumb";
import { c } from "@theme/colors";
import { styles } from "./ExistingFiles.styles";
import type { ExistingFilesProps } from "./ExistingFiles.types";

// Əvvəl yüklənən fayllar: × silməyə işarələyir (yenə × ləğv edir), silmə "Yadda saxla"-da olur
function ExistingFiles({ saved, removed, onToggle }: ExistingFilesProps) {
  if (saved === null) return <ActivityIndicator color={c.muted} style={styles.loader} />;
  if (saved.length === 0) return null;
  return (
    <View style={styles.wrap}>
      <Text style={styles.label}>Mövcud fayllar</Text>
      <View style={styles.grid}>
        {saved.map((f) => (
          <FileThumb key={f.id} kind={f.kind} uri={f.url} pdf={f.path.endsWith(".pdf")}
            dimmed={removed.has(f.id)} onRemove={() => onToggle(f.id)} />
        ))}
      </View>
      {removed.size > 0 && <Text style={styles.warn}>{removed.size} fayl yadda saxlayanda silinəcək.</Text>}
    </View>
  );
}

export default ExistingFiles;
