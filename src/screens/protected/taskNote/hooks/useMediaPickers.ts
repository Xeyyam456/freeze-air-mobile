import { getDocumentAsync } from "expo-document-picker";
import * as ImagePicker from "expo-image-picker";
import { formatSeconds, PDF_MAX_BYTES, videoBitrate } from "@shared/utils/media";
import { toast } from "@shared/utils/toast";
import type { FileKind, NewFile, PickSource } from "@typings/taskNote";
import type { TaskNoteForm } from "@screens/protected/taskNote/hooks/useTaskNoteForm";

type Media = "images" | "videos";

const toFile = (a: ImagePicker.ImagePickerAsset, kind: FileKind): NewFile =>
  ({ uri: a.uri, kind, mime: a.mimeType ?? "image/jpeg", width: a.width, height: a.height });

// Kamera (icazə soruşulur) və ya qalereya (Android 13+ sistem seçicisi, icazə lazım deyil)
async function pick(source: PickSource, media: Media, multiple = false) {
  if (source === "camera") {
    const perm = await ImagePicker.requestCameraPermissionsAsync();
    if (!perm.granted) {
      toast.error("Kameraya icazə verilməyib. Telefon ayarlarından icazə ver.");
      return [];
    }
    const r = await ImagePicker.launchCameraAsync({ mediaTypes: [media], quality: 1 });
    return r.canceled ? [] : r.assets;
  }
  const r = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: [media], quality: 1, allowsMultipleSelection: multiple, selectionLimit: multiple ? 10 : 1,
  });
  return r.canceled ? [] : r.assets;
}

// Akt (şəkil və ya PDF ≤ 10 MB; yenisi köhnəni əvəz edir), şəkillər (bir neçə), video (saxlayanda arxada 720p-yə sıxılır)
function useMediaPickers(f: TaskNoteForm) {
  async function pickAct(source: PickSource) {
    if (source === "pdf") {
      const r = await getDocumentAsync({ type: "application/pdf", copyToCacheDirectory: true });
      if (r.canceled) return;
      const doc = r.assets[0];
      if ((doc.size ?? 0) > PDF_MAX_BYTES) return toast.error("PDF 10 MB-dan böyükdür. Aktın şəklini çək: şəkil avtomatik kiçilir.");
      f.setAct({ uri: doc.uri, kind: "act", mime: "application/pdf" });
      return;
    }
    const [a] = await pick(source, "images");
    if (a) f.setAct(toFile(a, "act"));
  }

  async function pickPhotos(source: PickSource) {
    const list = await pick(source, "images", true);
    if (list.length) f.setPhotos((p) => [...p, ...list.map((a) => toFile(a, "photo"))]);
  }

  async function pickVideo(source: PickSource) {
    const [a] = await pick(source, "videos");
    if (!a) return;
    // Müddət dərhal yoxlanır; sıxma özü "Yadda saxla"-dan sonra arxada (göstərici yoxdur)
    const seconds = Math.max(1, Math.round((a.duration ?? 0) / 1000));
    if (!videoBitrate(seconds)) return toast.error(`Video çox uzundur (${formatSeconds(seconds)}): 50 MB-a sığmır. Hissələrə bölüb ayrı əlavə et.`);
    f.setVideo({ uri: a.uri, kind: "video", mime: "video/mp4", seconds });
  }

  return { pickAct, pickPhotos, pickVideo };
}

export default useMediaPickers;
