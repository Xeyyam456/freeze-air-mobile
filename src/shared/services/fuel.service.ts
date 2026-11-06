import { ImageManipulator, SaveFormat } from "expo-image-manipulator";
import { supabase } from "@shared/api/supabase";
import { readBytes } from "@shared/utils/media";
import type { FuelData, StepKind } from "@typings/fuel";

// Maşın, dövrün yürüşləri, bu günün sətri, qiymətlər, dövrün ödənişləri, ayın sərfi və alınanı (API.md §9). 7 paralel sorğu
export async function fetchMyFuel(me: number, from: string, to: string, today: string, mFrom: string, mTo: string): Promise<FuelData> {
  const [car, rows, t, s, pays, cost, paid] = await Promise.all([
    supabase.from("employees").select("has_car, car_plate, car_model, fuel_per_100, fuel_type").eq("id", me).maybeSingle(),
    supabase.from("mileage_logs").select("*").eq("employee_id", me).gte("day", from).lte("day", to).order("day", { ascending: false }),
    supabase.from("mileage_logs").select("*").eq("employee_id", me).eq("day", today).maybeSingle(),
    supabase.from("fuel_settings").select("petrol_price, diesel_price").eq("id", 1).maybeSingle(),
    supabase.from("fuel_payments").select("*").eq("employee_id", me).gte("day", from).lte("day", to)
      .order("day", { ascending: false }).order("created_at", { ascending: false }),
    supabase.from("mileage_logs").select("cost").eq("employee_id", me).gte("day", mFrom).lte("day", mTo).not("cost", "is", null),
    supabase.from("fuel_payments").select("amount").eq("employee_id", me).gte("day", mFrom).lte("day", mTo),
  ]);
  const error = car.error ?? rows.error ?? t.error ?? pays.error;
  if (error) throw error;
  return {
    car: car.data ?? null,
    rows: rows.data ?? [],
    today: t.data ?? null,
    prices: { petrol: s.data?.petrol_price ?? null, diesel: s.data?.diesel_price ?? null },
    payments: pays.data ?? [],
    month: {
      cost: (cost.data ?? []).reduce((n, r) => n + Number(r.cost), 0),
      paid: (paid.data ?? []).reduce((n, p) => n + Number(p.amount), 0),
    },
  };
}

// Spidometr şəkli: 1280 px WebP → qapalı "mileage" bucket-i, <usta>/<gün>-<addım>-<ad>.webp (web ilə eyni yol)
export async function uploadMileagePhoto(me: number, today: string, kind: StepKind, uri: string) {
  const img = await ImageManipulator.manipulate(uri).resize({ width: 1280 }).renderAsync();
  const out = await img.saveAsync({ format: SaveFormat.WEBP, compress: 0.8 });
  const path = `${me}/${today}-${kind}-${Date.now().toString(36)}${Math.random().toString(36).slice(2, 8)}.webp`;
  const { error } = await supabase.storage.from("mileage").upload(path, await readBytes(out.uri), { contentType: "image/webp" });
  if (error) throw new Error(error.message);
  return path;
}

// Səhər km-i (günün ilk yazısı) yeni sətir yaradır; qalanı bu günün sətrini dəyişir. km/litr/məbləğ bazada (mileage_guard)
export async function saveMileage(me: number, kind: StepKind, km: number, photo: string | null, todayId: number | null) {
  const { error } = kind === "start" && todayId === null
    ? await supabase.from("mileage_logs").insert({ employee_id: me, start_km: km, start_photo: photo })
    : await supabase.from("mileage_logs").update(kind === "start"
      ? { start_km: km, ...(photo ? { start_photo: photo } : {}) }
      : { end_km: km, ...(photo ? { end_photo: photo } : {}) }).eq("id", todayId!);
  if (error) throw new Error(error.message);
}

// "Aldım" / "Almadım" (fuel_payment_confirm); "Aldım" geri alınmır
export async function confirmPayment(id: number, received: boolean) {
  const { error } = await supabase.rpc("fuel_payment_confirm", { p_id: id, p_received: received });
  if (error) throw new Error(error.message);
}

// Qapalı bucket-dəki şəkil: imzalı link (1 saat)
export async function mileagePhotoUrl(path: string) {
  const { data } = await supabase.storage.from("mileage").createSignedUrl(path, 3600);
  return data?.signedUrl ?? null;
}
