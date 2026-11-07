import { useQuery } from "@tanstack/react-query";
import { searchAddress } from "@shared/services/geocode.service";
import type { PlaceRef } from "@typings/companies";

// Yerin xəritə nöqtəsi: koordinat varsa o; yoxdursa ünvan Nominatim ilə koordinata çevrilir (keşlənir; tapılmasa null)
function usePlacePoint(place: Pick<PlaceRef, "lat" | "lng" | "address">) {
  const has = place.lat != null && place.lng != null;
  const q = useQuery({
    queryKey: ["place-point", place.address],
    queryFn: () => searchAddress(place.address as string),
    enabled: !has && !!place.address,
    staleTime: Infinity,
  });
  const point = has ? { lat: place.lat as number, lng: place.lng as number } : q.data ?? null;
  return { point, loading: !has && !!place.address && q.isPending, byAddress: !has && !!point };
}

export default usePlacePoint;
