import { supabase } from "@shared/api/supabase";
import { readBytes } from "@shared/utils/helpers/media";
import type { FeedGroup } from "@typings/feed";

const randomName = () => `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;

// Səs şərhi: fayl `feed-audio/<mənim id>/<ad>.m4a` yoluna yüklənir (RLS: yalnız öz qovluğuna), sonra şərh sətri yazılır.
// Yazma xətası olsa yüklənmiş fayl geri silinir. Paylaşımın ustasına push bazadakı tetikleyicidir (0116: "🎤 Səs mesajı")
export async function addVoiceComment(logId: number, group: FeedGroup, me: number, v: { uri: string; ms: number; peaks: number[] }) {
  const path = `${me}/${randomName()}.m4a`;
  const up = await supabase.storage.from("feed-audio").upload(path, await readBytes(v.uri), { contentType: "audio/mp4" });
  if (up.error) throw new Error(up.error.message);
  const { error } = await supabase.from("feed_comments").insert({ work_log_id: logId, grp: group, employee_id: me, body: "", audio_path: path, audio_ms: Math.max(1, v.ms), audio_peaks: v.peaks });
  if (error) {
    await supabase.storage.from("feed-audio").remove([path]).catch(() => undefined);
    throw new Error(error.message);
  }
}

// Oxutmaq üçün imzalı link (bucket gizlidir): 1 saat
export async function voiceUrl(path: string): Promise<string> {
  const { data, error } = await supabase.storage.from("feed-audio").createSignedUrl(path, 3600);
  if (error || !data) throw new Error(error?.message ?? "Səs faylı tapılmadı");
  return data.signedUrl;
}
