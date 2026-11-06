import type { TaskNoteForm } from "@screens/protected/taskNote/hooks/useTaskNoteForm";
import type useMediaPickers from "@screens/protected/taskNote/hooks/useMediaPickers";

export type TileKey = "act" | "photos" | "video";

export type FileTilesProps = { form: TaskNoteForm; pickers: ReturnType<typeof useMediaPickers> };
