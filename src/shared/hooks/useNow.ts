import { useEffect, useState } from "react";

// İndiki an (ISO), hər `everyMs`-də yenilənir; active=false olanda taymer işləmir (batareyaya qənaət)
function useNow(active: boolean, everyMs = 30_000) {
  const [now, setNow] = useState(() => new Date().toISOString());
  useEffect(() => {
    if (!active) return;
    setNow(new Date().toISOString());
    const id = setInterval(() => setNow(new Date().toISOString()), everyMs);
    return () => clearInterval(id);
  }, [active, everyMs]);
  return now;
}

export default useNow;
