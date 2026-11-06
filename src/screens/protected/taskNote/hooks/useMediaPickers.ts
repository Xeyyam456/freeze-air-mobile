import { getDocumentAsync } from "expo-document-picker";
import * as ImagePicker from "expo-image-picker";
import { compressVideo } from "@shared/utils/media";
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

// Akt (şəkil və ya PDF; yenisi köhnəni əvəz edir), şəkillər (bir neçə), video (seçilən kimi 720p-yə sıxılır)
function useMediaPickers(f: TaskNoteForm) {
  async function pickAct(source: PickSource) {
    if (source === "pdf") {
      const r = await getDocumentAsync({ type: "application/pdf", copyToCacheDirectory: true });
      if (!r.canceled) f.setAct({ uri: r.assets[0].uri, kind: "act", mime: "application/pdf" });
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
    f.setVideo(null);
    f.setVideoProgress(0);
    try {
      f.setVideo(await compressVideo(a.uri, a.duration, f.setVideoProgress));
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Video sıxılmadı. Başqa video seç.");
    } finally {
      f.setVideoProgress(null);
    }
  }

  return { pickAct, pickPhotos, pickVideo };
}

export default useMediaPickers;
