import { useQueryClient } from "@tanstack/react-query";
import * as Location from "expo-location";
import { useState } from "react";
import { reverseGeocode } from "@shared/services/geocode.service";
import { setPlaceLocation } from "@shared/services/companies.service";
import { MAX_ACC, meters, parseCoordinates } from "@shared/utils/helpers/location";
import { toast } from "@shared/utils/helpers/toast";
import type { PlaceFix, PlaceRef } from "@typings/companies";

// Konumu düzəltmə vəziyyəti (web usePlaceLocation ilə eyni qaydalar): ünvan, GPS ilə tapılan / əl ilə yazılan / xəritədən seçilən koordinat, təsdiq.
// Əlavə: koordinatdan ünvan götürmək (Nominatim reverse). Yazıdan sonra şirkət siyahısı və detalı yenilənir
function usePlaceLocation(place: PlaceRef) {
  const qc = useQueryClient();
  const [address, setAddress] = useState(place.address ?? "");
  const [fix, setFix] = useState<PlaceFix | null>(null);
  const [manual, setManual] = useState("");
  const [locating, setLocating] = useState(false);
  const [busy, setBusy] = useState<"addr" | "coord" | "geo" | null>(null);
  const [confirm, setConfirm] = useState(false);
  const has = place.lat != null && place.lng != null;
  const dist = fix && has ? meters(fix, { lat: place.lat as number, lng: place.lng as number }) : null;
  const goodFix = !!fix && (!!fix.manual || fix.acc <= MAX_ACC);
  const manualBad = manual.trim() !== "" && !parseCoordinates(manual);
  const addrChanged = address.trim() !== (place.address ?? "").trim() && address.trim().length > 0;

  async function find() {
    setLocating(true); setConfirm(false); setManual("");
    try {
      const perm = await Location.requestForegroundPermissionsAsync();
      if (!perm.granted) throw new Error("icazə yoxdur");
      const p = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Highest });
      setFix({ lat: +p.coords.latitude.toFixed(6), lng: +p.coords.longitude.toFixed(6), acc: Math.round(p.coords.accuracy ?? 999) });
    } catch {
      toast.error("Yerin təyin olunmadı. Məkana icazə ver və açıq yerdə yenidən yoxla.");
    } finally { setLocating(false); }
  }

  const pick = (lat: number, lng: number) => { setConfirm(false); setManual(""); setFix({ lat: +lat.toFixed(6), lng: +lng.toFixed(6), acc: 0, manual: true }); };
  const onManual = (v: string) => { setManual(v); setConfirm(false); const c = parseCoordinates(v); setFix(c ? { ...c, acc: 0, manual: true } : null); };

  // Seçilmiş/tapılmış koordinatın ünvanını götür (Nominatim): ünvan sahəsini doldurur, istifadəçi düzəldib saxlayır
  async function takeAddress() {
    const at = fix ?? (has ? { lat: place.lat as number, lng: place.lng as number } : null);
    if (!at) return toast.error("Əvvəl koordinat tap və ya yaz.");
    setBusy("geo");
    try {
      const a = await reverseGeocode(at.lat, at.lng);
      if (a) setAddress(a); else toast.error("Bu nöqtənin ünvanı tapılmadı.");
    } catch (e) { toast.error((e as Error).message); } finally { setBusy(null); }
  }

  async function save(kind: "addr" | "coord") {
    setBusy(kind);
    try {
      await setPlaceLocation(kind === "addr"
        ? { p_kind: place.kind, p_id: place.id, p_address: address.trim() }
        : { p_kind: place.kind, p_id: place.id, p_lat: (fix as PlaceFix).lat, p_lng: (fix as PlaceFix).lng, ...((fix as PlaceFix).manual ? {} : { p_accuracy: (fix as PlaceFix).acc }) });
      toast.success(kind === "addr" ? "Ünvan yadda saxlandı" : "Koordinat yadda saxlandı", `${place.code ? `${place.code} · ` : ""}${place.name}`);
      setConfirm(false);
      if (kind === "coord") { setFix(null); setManual(""); }
      void qc.invalidateQueries({ queryKey: ["company"] });
      void qc.invalidateQueries({ queryKey: ["companies"] });
    } catch (e) { toast.error((e as Error).message); } finally { setBusy(null); }
  }

  return { address, setAddress, fix, manual, onManual, locating, busy, confirm, setConfirm, has, dist, goodFix, manualBad, addrChanged, find, pick, takeAddress, save };
}

export default usePlaceLocation;
