export type PlaceMapProps = {
  lat: number;
  lng: number;
  height?: number;
  zoom?: number;
  interactive?: boolean; // false: yalnız önizləmə (sürüşmə/yaxınlaşma yoxdur)
  onPick?: (lat: number, lng: number) => void; // xəritəyə toxunuş: nişan həmin nöqtəyə keçir
};
