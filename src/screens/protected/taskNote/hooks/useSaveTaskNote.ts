import { useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";
import { queryKeys } from "@shared/queries/queryKeys";
import { persistTaskNote } from "@shared/services/taskNote.service";
import { setNote } from "@shared/utils/helpers/tasks";
import { toast } from "@shared/utils/helpers/toast";
import type { DayTasks } from "@typings/tasks";
import type { NoteSave } from "@typings/taskNote";

// Yazıdan sonra təzələnənlər: tapşırıqlar (fayl sayı), günün işləri, faylların özü
const AFTER = ["tasks-view", "work-history", "work-files"];

// Saxla — OPTİMİSTİK: yazı kartda dərhal görünür, ekran dərhal bağlanır; RPC və fayl yükləməsi arxada gedir.
// Xətada yazı əvvəlkinə qayıdır. Fayllar varsa əvvəl "yüklənir", sonda nəticə tostu.
function useSaveTaskNote() {
  const qc = useQueryClient();
  return useCallback((s: NoteSave) => {
    const key = queryKeys.tasksDay(s.task.day);
    const note = s.note.trim() || null;
    void qc.cancelQueries({ queryKey: key });
    qc.setQueryData<DayTasks>(key, (d) => d && setNote(d, s.task, note));
    if (s.add.length) toast.info("Fayllar yüklənir…", `${s.add.length} fayl arxada göndərilir`);

    persistTaskNote(s)
      .then((failed) => {
        if (failed) toast.error(`Yazı saxlanıldı, amma ${failed} fayl yüklənmədi. Yenidən əlavə et.`);
        else toast.success("Təmir qeydi saxlanıldı", s.add.length ? `${s.add.length} fayl yükləndi` : undefined);
      })
      .catch((e: Error) => {
        qc.setQueryData<DayTasks>(key, (d) => d && setNote(d, s.task, s.task.note));
        toast.error(e.message);
      })
      .finally(() => AFTER.forEach((k) => qc.invalidateQueries({ queryKey: [k] })));
  }, [qc]);
}

export default useSaveTaskNote;
