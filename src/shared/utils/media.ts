import { File } from "expo-file-system";
import { ImageManipulator, SaveFormat } from "expo-image-manipulator";
import { Video } from "react-native-compressor";
import type { NewFile, PickedVideo } from "@typings/taskNote";

// Bucket "work" limiti 50 MB; hədəf 45 MB (encoder bitreyti həmişə dəqiq saxlamır)
export const VIDEO_MAX_BYTES = 50 * 1024 * 1024;
const TARGET_BYTES = 45 * 1024 * 1024;
const MAX_VIDEO_BITRATE = 1_800_000; // web ilə eyni: 720p, ≤ 1,8 Mbps
const MIN_VIDEO_BITRATE = 450_000; // bundan aşağı görüntü yararsızdır
const AUDIO_BITRATE = 96_000;

export const formatBytes = (b: number) => (b >= 1024 * 1024 ? `${(b / 1024 / 1024).toFixed(1)} MB` : `${Math.round(b / 1024)} KB`);
export const formatSeconds = (s: number) => `${Math.floor(s / 60)}:${String(Math.round(s % 60)).padStart(2, "0")}`;

const sizeOf = (uri: string) => new File(uri).size ?? 0;

// Şəkil: uzun tərəf `max` px-dən böyükdürsə kiçilir, WebP-yə sıxılır (TikTak qaydası: yükləmədən əvvəl kiçilt)
export async function compressImage(f: NewFile, max: number) {
  const ctx = ImageManipulator.manipulate(f.uri);
  const w = f.width ?? 0;
  const h = f.height ?? 0;
  if (Math.max(w, h) > max) ctx.resize(w >= h ? { width: max } : { height: max });
  const img = await ctx.renderAsync();
  const out = await img.saveAsync({ format: SaveFormat.WEBP, compress: 0.8 });
  return { uri: out.uri, mime: "image/webp", ext: "webp" };
}

// Video: uzun tərəf 1280 (720p), bitreyt müddətə görə (uzun video → aşağı bitreyt). Telefonda sıxılır, sonra yüklənir.
export async function compressVideo(uri: string, durationMs: number | null | undefined, onProgress: (p: number) => void): Promise<PickedVideo> {
  const seconds = Math.max(1, Math.round((durationMs ?? 0) / 1000));
  const fit = Math.floor((TARGET_BYTES * 8) / seconds - AUDIO_BITRATE);
  if (fit < MIN_VIDEO_BITRATE) throw new Error(`Video çox uzundur (${formatSeconds(seconds)}): 50 MB-a sığmır. Hissələrə bölüb ayrı əlavə et.`);
  const originalBytes = sizeOf(uri);
  const out = await Video.compress(uri, { compressionMethod: "manual", maxSize: 1280, bitrate: Math.min(MAX_VIDEO_BITRATE, fit) }, onProgress);
  const bytes = sizeOf(out);
  if (bytes > VIDEO_MAX_BYTES) throw new Error("Video sıxılandan sonra da 50 MB-dan böyükdür. Daha qısa video seç.");
  return { uri: out, kind: "video", mime: "video/mp4", bytes, originalBytes, seconds };
}

// Faylın baytları (Storage upload ArrayBuffer qəbul edir)
export const readBytes = (uri: string) => new File(uri).arrayBuffer();
