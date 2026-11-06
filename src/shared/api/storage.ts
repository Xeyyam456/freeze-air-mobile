import { createMMKV } from "react-native-mmkv";

// Sessiya yaddaşı (MMKV, sinxron): Supabase auth tokeni burada saxlanır, app açılan an giriş məlumdur.
const auth = createMMKV({ id: "freeze-air-auth" });

// localStorage formalı adapter (Supabase auth storage tələbi)
export const authStorage = {
  getItem: (key: string) => auth.getString(key) ?? null,
  setItem: (key: string, value: string) => auth.set(key, value),
  removeItem: (key: string) => {
    auth.remove(key);
  },
};
