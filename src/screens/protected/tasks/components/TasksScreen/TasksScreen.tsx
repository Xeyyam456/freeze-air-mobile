import { ClipboardIcon } from "@shared/icons";
import ComingSoon from "@shared/components/ComingSoon";

// Tapşırıqlar (növbəti mərhələ): günün tapşırıqları, "görüldü" (optimistik), təmir qeydi, şəkil
function TasksScreen() {
  return <ComingSoon title="Tapşırıqlar" icon={ClipboardIcon} text="Günün tapşırıqları, “görüldü” işarəsi və təmir qeydi burada olacaq." />;
}

export default TasksScreen;
