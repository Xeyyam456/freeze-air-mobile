import { createNativeStackNavigator } from "@react-navigation/native-stack";
import type { MoreStackParamList } from "@typings/navigation";
import AttendanceCalendarScreen from "@screens/protected/attendance/components/AttendanceCalendarScreen";
import AttendanceScreen from "@screens/protected/attendance/components/AttendanceScreen";
import ErrorCodesScreen from "@screens/protected/errorCodes/components/ErrorCodesScreen";
import CompaniesScreen from "@screens/protected/companies/components/CompaniesScreen";
import CompanyDetailScreen from "@screens/protected/companies/components/CompanyDetailScreen";
import EmployeesScreen from "@screens/protected/employees/components/EmployeesScreen";
import FuelScreen from "@screens/protected/fuel/components/FuelScreen";
import LeavesScreen from "@screens/protected/leaves/components/LeavesScreen";
import ManagementScreen from "@screens/protected/management/components/ManagementScreen";
import MorePlaceholderScreen from "@screens/protected/more/components/MorePlaceholderScreen";
import MoreScreen from "@screens/protected/more/components/MoreScreen";

const Stack = createNativeStackNavigator<MoreStackParamList>();

// Hələ yazılmayan bölmələr "Tezliklə" ekranı açır; bölmə yazılanda burada onun öz ekranı ilə əvəz et
const SOON = ["Tools"] as const;

// "Daha çox" tabının stack-i: menyu → bölmələr (Davamiyyət ekranları Panel stack-i ilə ortaqdır)
function MoreStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false, animation: "slide_from_right" }}>
      <Stack.Screen name="MoreMain" component={MoreScreen} />
      <Stack.Screen name="Attendance" component={AttendanceScreen} />
      <Stack.Screen name="AttendanceCalendar" component={AttendanceCalendarScreen} />
      <Stack.Screen name="Leaves" component={LeavesScreen} />
      <Stack.Screen name="Fuel" component={FuelScreen} />
      <Stack.Screen name="Employees" component={EmployeesScreen} />
      <Stack.Screen name="Management" component={ManagementScreen} />
      <Stack.Screen name="ErrorCodes" component={ErrorCodesScreen} />
      <Stack.Screen name="Companies">{() => <CompaniesScreen kind="company" />}</Stack.Screen>
      <Stack.Screen name="Stores">{() => <CompaniesScreen kind="market" />}</Stack.Screen>
      <Stack.Screen name="CompanyDetail" component={CompanyDetailScreen} />
      {SOON.map((name) => <Stack.Screen key={name} name={name} component={MorePlaceholderScreen} />)}
    </Stack.Navigator>
  );
}

export default MoreStackNavigator;
