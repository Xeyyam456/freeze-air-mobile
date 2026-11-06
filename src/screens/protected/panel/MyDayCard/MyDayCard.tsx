import { CalendarCheck } from "lucide-react-native";
import Card from "@shared/components/Card";
import useMyDay from "@screens/protected/panel/hooks/useMyDay";
import PresenceActions from "@screens/protected/panel/PresenceActions";
import SessionList from "@screens/protected/panel/SessionList";
import type { MyDayCardProps } from "./MyDayCard.types";

// Mənim bugünüm: davamiyyət düymələri (optimistik) + bir neçə seans olanda siyahı
function MyDayCard({ employeeId }: MyDayCardProps) {
  const { day, busy, run } = useMyDay(employeeId);
  return (
    <Card title="Mənim bugünüm" icon={CalendarCheck}>
      <PresenceActions day={day} busy={busy} onAction={run} />
      {day && day.sessions.length > 1 && <SessionList sessions={day.sessions} />}
    </Card>
  );
}

export default MyDayCard;
