// Mobil tünd tema (yalnız tünd). Web-in kopyası deyil: mobil üçün daha dərin fon, şüşəvari kartlar, bir vurğu rəngi.
export const c = {
  bg: "#070b14",
  surface: "#0f1524",
  surface2: "#161e31",
  glass: "rgba(255, 255, 255, 0.045)", // şüşəvari kart fonu
  glassBorder: "rgba(255, 255, 255, 0.08)",
  ink: "#f4f6fb",
  muted: "#8a94a8",
  faint: "#566077",
  line: "rgba(255, 255, 255, 0.07)",
  primary: "#4f8dff",
  primaryDeep: "#2f5fd0",
  primarySoft: "rgba(79, 141, 255, 0.14)",
  ok: "#34d399",
  okSoft: "rgba(52, 211, 153, 0.14)",
  danger: "#f87171",
  dangerSoft: "rgba(248, 113, 113, 0.14)",
  violet: "#a78bfa",
  violetSoft: "rgba(167, 139, 250, 0.14)",
  orange: "#fbbf24",
  orangeSoft: "rgba(251, 191, 36, 0.14)",
  navy: "#1d2a47",
  white: "#ffffff",
} as const;

// Qradiyentlər (yuxarı-sol → aşağı-sağ)
export const gradients = {
  hero: ["#14244a", "#0d1730", "#0a1020"],
  card: ["#111a2c", "#0c1322"],
  accent: ["#5b9bff", "#2f5fd0"], // əsas düymə, halqa
} as const;

export const radius = { sm: 12, md: 16, lg: 24 } as const;
export const space = { xs: 4, sm: 8, md: 12, lg: 16, xl: 24 } as const;
