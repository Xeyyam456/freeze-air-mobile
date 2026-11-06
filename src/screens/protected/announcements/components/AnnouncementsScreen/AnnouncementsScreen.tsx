import { Megaphone } from "lucide-react-native";
import ComingSoon from "@shared/components/ComingSoon";

// Elanlar (növbəti mərhələ): rəhbərliyin elanları, oxunmamış nişanı
function AnnouncementsScreen() {
  return <ComingSoon title="Elanlar" icon={Megaphone} text="Rəhbərliyin elanları və oxunmamış nişanı burada olacaq." />;
}

export default AnnouncementsScreen;
