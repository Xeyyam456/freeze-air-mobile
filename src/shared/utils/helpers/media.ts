import { File } from "expo-file-system";
import { ImageManipulator, SaveFormat } from "expo-image-manipulator";
import { Video } from "react-native-compressor";
import type { NewFile } from "@typings/taskNote";

// Bucket "work" limiti 50 MB; hədəf 45 MB (encoder bitreyti həmişə dəqiq saxlamır)
export const VIDEO_MAX_BYTES = 50 * 1024 * 1024;
export const PDF_MAX_BYTES = 10 * 1024 * 1024; // web ilə eyni: şəkil/PDF ≤ 10 MB (telefonda PDF sıxılmır)
const TARGET_BYTES = 45 * 1024 * 1024;
const MAX_VIDEO_BITRATE = 1_800_000; // web ilə eyni: 720p, ≤ 1,8 Mbps
const MIN_VIDEO_BITRATE = 450_000; // bundan aşağı görüntü yararsızdır
const AUDIO_BITRATE = 96_000;

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

// Video bitreyti müddətə görə (uzun video → aşağı bitreyt); null = 50 MB-a sığmır. Seçəndə dərhal yoxlanır.
export function videoBitrate(seconds: number) {
  const fit = Math.floor((TARGET_BYTES * 8) / Math.max(seconds, 1) - AUDIO_BITRATE);
  return fit < MIN_VIDEO_BITRATE ? null : Math.min(MAX_VIDEO_BITRATE, fit);
}

// Video: uzun tərəf 1280 (720p). "Yadda saxla"-dan sonra ARXADA sıxılır (göstərici yoxdur), sonra yüklənir.
export async function compressVideo(f: NewFile) {
  const bitrate = videoBitrate(f.seconds ?? 1);
  if (!bitrate) throw new Error("Video 50 MB-a sığmır.");
  const uri = await Video.compress(f.uri, { compressionMethod: "manual", maxSize: 1280, bitrate });
  if (sizeOf(uri) > VIDEO_MAX_BYTES) throw new Error("Video sıxılandan sonra da 50 MB-dan böyükdür.");
  return { uri, mime: "video/mp4", ext: "mp4" };
}

// Faylın baytları (Storage upload ArrayBuffer qəbul edir)
export const readBytes = (uri: string) => new File(uri).arrayBuffer();
