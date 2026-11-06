import { useMemo, useState } from "react";
import { addDays, todayBaku, weekOf, weekStart } from "@shared/utils/time";

// Seçilən gün və onun həftəsi. Həftə oxu seçimi 7 gün sürüşdürür (həftənin eyni günü).
function useTaskDay() {
  const [today] = useState(todayBaku);
  const [day, setDay] = useState(today);
  const from = weekStart(day);
  const days = useMemo(() => weekOf(from), [from]); // sabit massiv: aşağıdakı useMemo-lar boşuna işləməsin
  return {
    today,
    day,
    from,
    days,
    past: day < today, // keçmiş gün bağlıdır (bazada da bloklanır)
    setDay,
    shiftWeek: (n: number) => setDay((d) => addDays(d, n * 7)),
  };
}

export default useTaskDay;
