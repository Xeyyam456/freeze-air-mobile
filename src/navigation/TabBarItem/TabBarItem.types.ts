import type { Icon } from "@shared/icons";

// badge: ikonun üstündə rəqəm (0 = görünmür, 9-dan çox "9+")
// dot: rəqəmsiz yanıb-sönən qırmızı nöqtə (yeni var, say yoxdur)
export type TabBarItemProps = { icon: Icon; color: string; label: string; focused: boolean; badge?: number; dot?: boolean; onPress: () => void };
