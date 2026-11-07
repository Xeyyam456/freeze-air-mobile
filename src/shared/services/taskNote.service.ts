import { supabase } from "@shared/api/supabase";
import { compressImage, compressVideo, readBytes } from "@shared/utils/media";
import type { FileKind, NewFile, NoteSave, SavedFile } from "@typings/taskNote";

const ext = (mime: string) => (mime === "application/pdf" ? "pdf" : mime === "video/mp4" ? "mp4" : "jpg");
const randomName = () => `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;

// İş qeydinin faylları (API.md §4): bucket gizlidir → şəkillər imzalı linklə (1 saat)
export async function fetchLogFiles(logId: number | number[]): Promise<SavedFile[]> {
  const { data, error } = await supabase.from("work_files").select("id, kind, path").in("work_log_id", Array.isArray(logId) ? logId : [logId]).order("id");
  if (error) throw error;
  const rows = (data ?? []).map((r) => ({ ...r, kind: r.kind as FileKind }));
  if (!rows.length) return [];
  const { data: signed } = await supabase.storage.from("work").createSignedUrls(rows.map((r) => r.path), 3600);
  return rows.map((r, i) => ({ ...r, url: signed?.[i]?.signedUrl ?? undefined }));
}

// Faylları sil (storage + qeyd)
async function removeWorkFiles(files: SavedFile[]) {
  await supabase.storage.from("work").remove(files.map((f) => f.path));
  await supabase.from("work_files").delete().in("id", files.map((f) => f.id));
}

// Bir fayl: şəkil WebP-yə kiçilir (akt oxunaqlı qalsın deyə daha böyük), video 720p-yə sıxılır, PDF olduğu kimi → work/<iş id>/<ad>
async function uploadWorkFile(logId: number, f: NewFile): Promise<boolean> {
  const file = f.mime.startsWith("image/") ? await compressImage(f, f.kind === "act" ? 2400 : 1600)
    : f.kind === "video" ? await compressVideo(f) : { uri: f.uri, mime: f.mime, ext: ext(f.mime) };
  const path = `${logId}/${randomName()}.${file.ext}`;
  const { error } = await supabase.storage.from("work").upload(path, await readBytes(file.uri), { contentType: file.mime });
  if (error) return false;
  const { error: rowError } = await supabase.from("work_files").insert({ work_log_id: logId, kind: f.kind, path });
  return !rowError;
}

// Yazı (RPC task_set_note → iş qeydi id), sonra silmə və yükləmə. Qaytarır: yüklənməyən fayl sayı
export async function persistTaskNote({ task, note, remove, add }: NoteSave): Promise<number> {
  const { data: logId, error } = await supabase.rpc("task_set_note", { p_task_id: task.id, p_note: note });
  if (error || !logId) throw new Error(error?.message ?? "Yadda saxlanmadı.");
  if (remove.length) await removeWorkFiles(remove);
  let failed = 0;
  for (const f of add) {
    const ok = await uploadWorkFile(logId, f).catch(() => false);
    if (!ok) failed += 1;
  }
  return failed;
}
