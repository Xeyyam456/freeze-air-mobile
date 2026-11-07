import { supabase } from "@shared/api/supabase";
import type { ErrorCodesData } from "@typings/errorCodes";

// Xəta kodları (API.md): modellər + bütün kodlar (~300 sətir, bir sorğu cütü). Oxu: daxil olmuş hər kəs
export async function fetchErrorCodes(): Promise<ErrorCodesData> {
  const [models, codes] = await Promise.all([
    supabase.from("ac_models").select("id, name").order("name"),
    supabase.from("ac_error_codes").select("id, model_id, code, title, solution").order("code").limit(2000),
  ]);
  if (models.error) throw models.error;
  if (codes.error) throw codes.error;
  return {
    models: models.data ?? [],
    codes: (codes.data ?? []).filter((c): c is typeof c & { model_id: number } => c.model_id !== null),
  };
}
