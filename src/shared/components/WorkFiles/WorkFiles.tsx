import { useQuery } from "@tanstack/react-query";
import { Image } from "expo-image";
import { useState } from "react";
import { ActivityIndicator, Linking, Modal, Pressable, ScrollView, Text, View } from "react-native";
import ImageViewer from "@shared/components/ImageViewer";
import { CloseIcon, FileTextIcon, VideoIcon } from "@shared/icons";
import { queryKeys } from "@shared/queries/queryKeys";
import { fetchLogFiles } from "@shared/services/taskNote.service";
import { c } from "@theme/colors";
import { styles } from "./WorkFiles.styles";
import type { WorkFilesProps } from "./WorkFiles.types";

// İşin faylları (akt, şəkillər, video): şəkillər kiçik önizləmə → toxunuş tam ekran (yana sürüşdür); PDF və video telefonun öz tətbiqində açılır
function WorkFiles({ logIds, title, sub, onClose }: WorkFilesProps) {
  const q = useQuery({ queryKey: [...queryKeys.workFiles(logIds[0]), "group", ...logIds], queryFn: () => fetchLogFiles(logIds) });
  const [view, setView] = useState<number | null>(null);
  const files = q.data ?? [];
  const isImage = (f: (typeof files)[number]) => f.kind !== "video" && !f.path.endsWith(".pdf") && !!f.url;
  const images = files.filter(isImage).map((f) => f.url as string);

  return (
    <Modal transparent animationType="fade" statusBarTranslucent navigationBarTranslucent onRequestClose={onClose}>
      <Pressable style={styles.backdrop} onPress={onClose} />
      <View style={styles.center} pointerEvents="box-none">
        <View style={styles.card}>
          <Pressable onPress={onClose} hitSlop={10} style={styles.close} accessibilityLabel="Bağla"><CloseIcon size={18} color={c.muted} /></Pressable>
          <View style={styles.head}>
            <Text style={styles.title} numberOfLines={2}>{title}</Text>
            {sub ? <Text style={styles.sub} numberOfLines={1}>{sub}</Text> : null}
          </View>
          {q.isPending ? <ActivityIndicator color={c.muted} style={{ marginVertical: 24 }} />
            : !files.length ? <Text style={styles.empty}>Bu işə fayl əlavə olunmayıb.</Text>
            : (
              <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.grid}>
                  {files.map((f) => {
                    const img = isImage(f);
                    const open = () => (img ? setView(images.indexOf(f.url as string)) : f.url && void Linking.openURL(f.url));
                    return (
                      <Pressable key={f.id} onPress={open} style={styles.cell} accessibilityLabel={f.kind === "act" ? "Akt" : f.kind === "video" ? "Video" : "Şəkil"}>
                        {img ? <Image source={{ uri: f.url }} style={styles.image} contentFit="cover" cachePolicy="disk" />
                          : (
                            <View style={styles.tile}>
                              {f.kind === "video" ? <VideoIcon size={26} color={c.primary} /> : <FileTextIcon size={26} color={c.primary} />}
                              <Text style={styles.tileText}>{f.kind === "video" ? "Video" : f.path.endsWith(".pdf") ? "PDF akt" : "Şəkil"}</Text>
                            </View>
                          )}
                        {img && f.kind === "act" ? <Text style={styles.badge}>Akt</Text> : null}
                      </Pressable>
                    );
                  })}
                </View>
              </ScrollView>
            )}
        </View>
      </View>
      {view !== null && <ImageViewer images={images} start={view} onClose={() => setView(null)} />}
    </Modal>
  );
}

export default WorkFiles;
