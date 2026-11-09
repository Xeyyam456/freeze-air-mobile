import { getDocumentAsync } from "expo-document-picker";
import type { ImagePickerAsset } from "expo-image-picker";
import { formatSeconds, PDF_MAX_BYTES, videoBitrate } from "@shared/utils/helpers/media";
import { type PickMedia, pickAssets } from "@shared/utils/helpers/picker";
import { toast } from "@shared/utils/helpers/toast";
import type { FileKind, NewFile, PickSource } from "@typings/taskNote";
import type { TaskNoteForm } from "@screens/protected/taskNote/hooks/useTaskNoteForm";

const toFile = (a: ImagePickerAsset, kind: FileKind): NewFile =>
  ({ uri: a.uri, kind, mime: a.mimeType ?? "image/jpeg", width: a.width, height: a.height });

// PDF mənbəyi burada ayrıca işlənir; kamera/qalereya ortaq seçicidən
const pick = (source: PickSource, media: PickMedia, multiple = false) =>
  pickAssets(source === "camera" ? "camera" : "gallery", media, { multiple });

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
