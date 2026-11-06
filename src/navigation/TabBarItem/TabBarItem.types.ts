import type { Icon } from "@shared/icons";

export type TabBarItemProps = { icon: Icon; label: string; focused: boolean; onPress: () => void };
