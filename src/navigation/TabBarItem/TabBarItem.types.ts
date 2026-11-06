import type { Icon } from "@shared/icons";

// badge: ikonun üstündə rəqəm (0 = görünmür, 9-dan çox "9+")
export type TabBarItemProps = { icon: Icon; label: string; focused: boolean; badge?: number; onPress: () => void };
