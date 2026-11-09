import { useScrollToTop } from "@react-navigation/native";
import { useRef } from "react";

// Tabın kök ekranının siyahısı: aktiv taba yenidən basanda yumşaq yuxarı sürüşür (React Navigation standartı).
// FlashList (scrollToOffset) və ScrollView (scrollTo) ikisi də dəstəklənir; ref-i siyahının `ref`-inə ver
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function useTabScrollTop<T = any>() {
  const ref = useRef<T>(null);
  useScrollToTop(ref as unknown as Parameters<typeof useScrollToTop>[0]);
  return ref;
}

export default useTabScrollTop;
