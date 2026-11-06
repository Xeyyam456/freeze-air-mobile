import { Text, View } from "react-native";
import FileThumb from "@screens/protected/taskNote/components/FileThumb";
import { formatBytes } from "@shared/utils/media";
import { styles } from "./NewFiles.styles";
import type { NewFilesProps } from "./NewFiles.types";

// Seçilən, hələ yüklənməyən fayllar: × siyahıdan çıxarır. Video sıxılıbsa ölçü fərqi göstərilir.
function NewFiles({ form: f }: NewFilesProps) {
  if (!f.act && !f.photos.length && !f.video) return null;
  return (
    <View style={styles.wrap}>
      <Text style={styles.label}>Yeni fayllar</Text>
      <View style={styles.grid}>
        {f.act && <FileThumb kind="act" uri={f.act.uri} pdf={f.act.mime === "application/pdf"} onRemove={() => f.setAct(null)} />}
        {f.photos.map((p, i) => (
          <FileThumb key={p.uri} kind="photo" uri={p.uri} onRemove={() => f.setPhotos((list) => list.filter((_, j) => j !== i))} />
        ))}
        {f.video && <FileThumb kind="video" onRemove={() => f.setVideo(null)} />}
      </View>
      {f.video && (
        <Text style={styles.video}>Video sıxıldı: {formatBytes(f.video.originalBytes)} → {formatBytes(f.video.bytes)}</Text>
      )}
    </View>
  );
}

export default NewFiles;
