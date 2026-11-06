import Toast, { BaseToast, type ToastConfig } from "react-native-toast-message";
import { c } from "@theme/colors";
import { styles } from "./toast.styles";

// Qısa bildiriş (react-native-toast-message). <Toast config={toastConfig} /> AppShell-dədir.
export const toast = {
  success: (title: string, detail?: string) => Toast.show({ type: "success", text1: title, text2: detail }),
  error: (message: string) => Toast.show({ type: "error", text1: message }),
};

// Tünd tema: kart fonu, solda rəngli zolaq
const make = (accent: string) => (props: Parameters<NonNullable<ToastConfig["success"]>>[0]) => (
  <BaseToast
    {...props}
    style={[styles.toast, { borderLeftColor: accent }]}
    contentContainerStyle={styles.content}
    text1Style={styles.title}
    text2Style={styles.detail}
    text1NumberOfLines={2}
  />
);

export const toastConfig: ToastConfig = { success: make(c.ok), error: make(c.danger), info: make(c.primary) };
