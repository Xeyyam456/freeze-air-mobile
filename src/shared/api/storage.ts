import { createMMKV } from "react-native-mmkv";

// Sessiya yaddaşı (MMKV, sinxron): Supabase auth tokeni burada saxlanır, app açılan an giriş məlumdur.
const auth = createMMKV({ id: "freeze-air-auth" });

// Bu telefonun push tokeni (çıxışda bazadan silmək üçün)
const PUSH_KEY = "push-token";
export const pushTokenStore = {
  get: () => auth.getString(PUSH_KEY) ?? null,
  set: (token: string) => auth.set(PUSH_KEY, token),
  clear: () => {
    auth.remove(PUSH_KEY);
  },
};

// localStorage formalı adapter (Supabase auth storage tələbi)
export const authStorage = {
  getItem: (key: string) => auth.getString(key) ?? null,
  setItem: (key: string, value: string) => auth.set(key, value),
  removeItem: (key: string) => {
    auth.remove(key);
  },
};
