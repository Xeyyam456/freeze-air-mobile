import { useNavigation } from "@react-navigation/native";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { queryKeys } from "@shared/queries/queryKeys";
import { fetchLogFiles } from "@shared/services/taskNote.service";
import type { NewFile, NoteTask } from "@typings/taskNote";
import useSaveTaskNote from "@screens/protected/taskNote/hooks/useSaveTaskNote";

// Təmir qeydi formu: yazı, mövcud fayllar (silinməyə işarələnir), yeni akt/şəkillər/video. Web TaskNoteModal ilə eyni məntiq.
function useTaskNoteForm(task: NoteTask) {
  const nav = useNavigation();
  const save = useSaveTaskNote();
  const files = useQuery({
    queryKey: queryKeys.workFiles(task.logId ?? 0),
    queryFn: () => fetchLogFiles(task.logId!),
    enabled: !!task.logId,
  });
  const saved = task.logId ? files.data ?? null : [];

  const [note, setNoteText] = useState(task.note ?? "");
  const [removed, setRemoved] = useState<Set<number>>(new Set());
  const [act, setAct] = useState<NewFile | null>(null);
  const [photos, setPhotos] = useState<NewFile[]>([]);
  const [video, setVideo] = useState<NewFile | null>(null);

  const toggleRemove = (id: number) =>
    setRemoved((s) => {
      const next = new Set(s);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  function submit() {
    // Silinməsi seçilənlər; yeni akt seçilibsə köhnə akt da əvəz olunur
    const remove = (saved ?? []).filter((f) => removed.has(f.id) || (act && f.kind === "act"));
    const add = [...(act ? [act] : []), ...photos, ...(video ? [video] : [])];
    save({ task, note, remove, add });
    nav.goBack();
  }

  return {
    note, setNoteText, saved, removed, toggleRemove,
    act, setAct, photos, setPhotos, video, setVideo, submit,
    hasAct: (saved ?? []).some((f) => f.kind === "act" && !removed.has(f.id)),
  };
}

export type TaskNoteForm = ReturnType<typeof useTaskNoteForm>;
export default useTaskNoteForm;
