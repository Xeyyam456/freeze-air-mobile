import type { LucideIcon } from "lucide-react-native";
import type { MyDayStats } from "@typings/panel";

export type StatTilesProps = { stats: MyDayStats | undefined };

export type StatTileProps = {
  icon: LucideIcon;
  color: string;
  bg: string;
  value: string;
  label: string;
  sub?: string;
};
