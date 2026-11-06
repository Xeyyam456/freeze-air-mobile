import { useState } from "react";
import { pickAssets } from "@shared/utils/picker";
import { fmtKm } from "@shared/utils/fuel";
import { toast } from "@shared/utils/toast";
import type { StepKind } from "@typings/fuel";

type Args = { kind: StepKind; value: number | null; photo: string | null; min?: number; max?: number; onSave: (km: number, uri: string | null) => void };

// Səhər / axşam addımının forması (web useStep): km, spidometr şəkli (kamera/qalereya), yoxlamalar; "Dəyiş" ilə düzəliş.
// Yadda saxla → forma dərhal bağlanır, km kartda görünür (optimistik, yükləmə arxada)
function useFuelStep({ value, photo, min, max, onSave }: Args) {
  const [editing, setEditing] = useState(false);
  const [km, setKmText] = useState("");
  const [uri, setUri] = useState<string | null>(null);
  const [menu, setMenu] = useState(false);

  async function pick(source: "camera" | "gallery") {
    const [a] = await pickAssets(source, "images");
    if (a) setUri(a.uri);
  }

  function submit() {
    const n = Number(km.replace(/\s/g, ""));
    if (!km || !Number.isInteger(n) || n < 0) return toast.error("Km-i tam rəqəmlə yaz.");
    if (min !== undefined && n < min) return toast.error(`Axşam km səhər km-dən (${fmtKm(min)}) az ola bilməz.`);
    if (max !== undefined && n > max) return toast.error(`Səhər km axşam km-dən (${fmtKm(max)}) çox ola bilməz.`);
    if (!uri && !photo) return toast.error("Spidometrin şəklini çək.");
    onSave(n, uri);
    setEditing(false);
    setKmText("");
    setUri(null);
  }

  return {
    editing, km, uri, menu, setMenu, pick, submit,
    done: value !== null && !editing,
    setKm: (v: string) => setKmText(v.replace(/[^\d]/g, "")),
    startEdit: () => { setEditing(true); setKmText(String(value)); },
    cancel: () => { setEditing(false); setUri(null); },
  };
}

export default useFuelStep;
