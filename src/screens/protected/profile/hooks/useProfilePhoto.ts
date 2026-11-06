import { useQueryClient } from "@tanstack/react-query";
import { useRef } from "react";
import useMe from "@shared/hooks/useMe";
import { queryKeys } from "@shared/queries/queryKeys";
import type { fetchMe } from "@shared/services/auth.service";
import { setProfilePhoto } from "@shared/services/profile.service";
import { pickAssets } from "@shared/utils/picker";
import { toast } from "@shared/utils/toast";

type Me = Awaited<ReturnType<typeof fetchMe>>;
type Image = { uri: string; width: number; height: number };

// Şəklim harda görünür: yazıdan sonra təzələnir
const AFTER = ["attendance-employees", "tasks-view"];

// Profil şəkli — OPTİMİSTİK: seçilən şəkil dərhal hər yerdə (me keşi) görünür, yükləmə arxada; xətada köhnəsi qayıdır
function useProfilePhoto() {
  const qc = useQueryClient();
  const emp = useMe().data?.employee;
  const busy = useRef(false);

  const setPhoto = (url: string | null) =>
    qc.setQueryData<Me>(queryKeys.me, (d) => (d?.employee ? { ...d, employee: { ...d.employee, photo_url: url } } : d));

  function run(image: Image | null) {
    if (!emp || busy.current) return;
    busy.current = true;
    const old = emp.photo_url;
    setPhoto(image?.uri ?? null);
    setProfilePhoto(emp.id, old, image)
      .then((url) => {
        setPhoto(url);
        toast.success(url ? "Şəkil yadda saxlanıldı" : "Şəkil silindi");
      })
      .catch(() => {
        setPhoto(old);
        toast.error(image ? "Şəkil yüklənmədi. Başqa şəkil yoxla." : "Şəkil silinmədi.");
      })
      .finally(() => {
        busy.current = false;
        AFTER.forEach((k) => qc.invalidateQueries({ queryKey: [k] }));
      });
  }

  async function change(source: "camera" | "gallery") {
    const [a] = await pickAssets(source, "images", { square: true });
    if (a) run({ uri: a.uri, width: a.width, height: a.height });
  }

  return { emp, change, remove: () => run(null) };
}

export default useProfilePhoto;
