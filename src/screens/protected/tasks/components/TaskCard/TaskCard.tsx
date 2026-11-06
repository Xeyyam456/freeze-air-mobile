import { memo } from "react";
import { Text, View } from "react-native";
import { BuildingIcon, MapPinIcon, StoreIcon } from "@shared/icons";
import GroupMates from "@screens/protected/tasks/components/GroupMates";
import TaskCheck from "@screens/protected/tasks/components/TaskCheck";
import TaskState from "@screens/protected/tasks/components/TaskState";
import { c } from "@theme/colors";
import { styles } from "./TaskCard.styles";
import type { TaskCardProps } from "./TaskCard.types";

const PLACE_ICON = { store: StoreIcon, company: BuildingIcon, text: MapPinIcon } as const;

// Mənim tapşırığım: solda "görüldü" dairəsi, yer, səbəb, qrup yoldaşları, təmir qeydi, vəziyyət. memo: FlashList sətri
function TaskCard({ task, mates, past, onToggle }: TaskCardProps) {
  const cancelled = !!task.cancelled_at;
  const Place = PLACE_ICON[task.placeKind];
  const tint = cancelled ? c.muted : task.done ? c.ok : c.primary;
  return (
    <View style={[styles.card, task.done && !cancelled && styles.done, cancelled && styles.cancelled]}>
      <TaskCheck done={task.done} disabled={past || cancelled} onPress={() => onToggle(task)} />
      <View style={styles.body}>
        <View style={styles.placeRow}>
          <Place size={15} color={tint} />
          <Text style={[styles.place, { color: tint }, cancelled && styles.strike]} numberOfLines={2}>{task.place}</Text>
          {task.group_id && <Text style={styles.group}>Qrup</Text>}
        </View>
        <Text style={[styles.reason, cancelled && styles.strike]}>{task.reason}</Text>
        <GroupMates mates={mates} />
        {task.note && <Text style={styles.note} numberOfLines={3}><Text style={styles.noteLabel}>Təmir: </Text>{task.note}</Text>}
        <TaskState task={task} past={past} />
      </View>
    </View>
  );
}

export default memo(TaskCard);
