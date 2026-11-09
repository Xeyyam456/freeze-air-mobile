import { useState } from "react";
import { shiftMonth } from "@shared/utils/helpers/attendanceView";
import { todayBaku } from "@shared/utils/helpers/time";

// Seçilən ay ("2026-11"): gələcək aya keçmək olmaz
function useMonthNav() {
  const [thisMonth] = useState(() => todayBaku().slice(0, 7));
  const [month, setMonth] = useState(thisMonth);
  return {
    month,
    thisMonth,
    isCurrent: month === thisMonth,
    shift: (n: number) => setMonth((m) => (shiftMonth(m, n) > thisMonth ? m : shiftMonth(m, n))),
  };
}

export default useMonthNav;
