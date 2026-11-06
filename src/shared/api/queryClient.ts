import { QueryClient } from "@tanstack/react-query";

const DAY = 24 * 60 * 60 * 1000;

// Ayrı modul: çıxışda (auth.service) da təmizlənir ki, başqa hesab əvvəlkinin keşini görməsin.
// Yenilənmə əsasən Realtime ilədir (panel/hooks/usePanelLive), dövri sorğu yoxdur.
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30_000,
      // persistOptions.maxAge-dən kiçik olmamalıdır: yaddaşdan düşən sorğu diskə də yazılmır
      gcTime: 7 * DAY,
      retry: 1,
    },
  },
});
