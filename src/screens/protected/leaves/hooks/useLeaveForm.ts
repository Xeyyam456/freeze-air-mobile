import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import useMe from "@shared/hooks/useMe";
import { shiftMonth } from "@shared/utils/attendanceView";
import { leaveWorkdays } from "@shared/utils/leaves";
import { todayBaku } from "@shared/utils/time";
import { toast } from "@shared/utils/toast";
import useLeaveActions from "@screens/protected/leaves/hooks/useLeaveActions";

// İcazə istə formu: təqvimdə aralıq (1-ci toxunuş başlanğıc, 2-ci bitmə), səbəb, iş günü sayı (bazar sayılmır).
// Göndər → ekran dərhal bağlanır, sorğu siyahıda "Göndərilir" kimi görünür (optimistik)
function useLeaveForm() {
  const nav = useNavigation();
  const me = useMe().data?.employee?.id;
  const { submit } = useLeaveActions(me);
  const [today] = useState(todayBaku);
  const [month, setMonth] = useState(today.slice(0, 7));
  const [from, setFrom] = useState<string | null>(today);
  const [to, setTo] = useState<string | null>(today); // başlanğıcda bu gün (tam seçim): ilk toxunuş yeni aralıq başladır
  const [reason, setReason] = useState("");
  const end = to ?? from;
  const days = from && end ? leaveWorkdays({ date_from: from, date_to: end }) : 0;

  function pick(d: string) {
    if (!from || to) {
      setFrom(d);
      setTo(null);
    } else if (d < from) {
      setFrom(d);
    } else {
      setTo(d);
    }
  }

  function send() {
    if (!me) return toast.error("İcazə yalnız usta kartı olan hesabla istənilir.");
    if (!from || !end) return toast.error("Tarix seç.");
    if (days === 0) return toast.error("Seçilən günlər bazardır: iş günü deyil.");
    submit(from, end, reason);
    nav.goBack();
  }

  return { today, month, shift: (n: number) => setMonth((m) => shiftMonth(m, n)), from, to, end, pick, reason, setReason, days, send };
}

export default useLeaveForm;
