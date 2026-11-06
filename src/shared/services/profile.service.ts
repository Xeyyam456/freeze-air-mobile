import { ImageManipulator, SaveFormat } from "expo-image-manipulator";
import { supabase } from "@shared/api/supabase";
import { readBytes } from "@shared/utils/media";

const BUCKET = "avatars";
const SIZE = 512; // web/admin ilə eyni: 512 px kvadrat WebP (API.md §6)
const randomName = () => `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;

// Köhnə şəkil bizim bucket-dədirsə, yolu (xarici linklər üçün null)
function storagePath(url: string | null) {
  const marker = `/storage/v1/object/public/${BUCKET}/`;
  return url?.includes(marker) ? url.split(marker)[1] : null;
}

// Şəkli 512 px kvadrata kiçilt (kəsmə seçicidə olub: 1:1), WebP-yə çevir, yüklə → ictimai link
async function uploadAvatar(employeeId: number, uri: string, width: number, height: number) {
  const ctx = ImageManipulator.manipulate(uri);
  const side = Math.min(width, height);
  if (width !== height) ctx.crop({ originX: (width - side) / 2, originY: (height - side) / 2, width: side, height: side });
  if (side > SIZE) ctx.resize({ width: SIZE, height: SIZE });
  const out = await (await ctx.renderAsync()).saveAsync({ format: SaveFormat.WEBP, compress: 0.85 });
  const path = `${employeeId}/${randomName()}.webp`;
  const storage = supabase.storage.from(BUCKET);
  const { error } = await storage.upload(path, await readBytes(out.uri), { contentType: "image/webp" });
  if (error) throw error;
  return storage.getPublicUrl(path).data.publicUrl;
}

// Profil şəklini dəyiş və ya sil (url = null). Yeganə yol RPC set_employee_photo; sonra köhnə fayl silinir
export async function setProfilePhoto(employeeId: number, oldUrl: string | null, image: { uri: string; width: number; height: number } | null) {
  const url = image ? await uploadAvatar(employeeId, image.uri, image.width, image.height) : null;
  const { error } = await supabase.rpc("set_employee_photo", { p_employee_id: employeeId, p_url: url });
  if (error) throw new Error(error.message);
  const old = storagePath(oldUrl);
  if (old) await supabase.storage.from(BUCKET).remove([old]);
  return url;
}
