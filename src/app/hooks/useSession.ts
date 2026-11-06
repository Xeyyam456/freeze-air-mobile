import type { Session } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { supabase } from "@shared/api/supabase";

// undefined = hələ oxunur (MMKV-dən, bir anlıq), null = giriş yoxdur
function useSession() {
  const [session, setSession] = useState<Session | null | undefined>(undefined);
  useEffect(() => {
    void supabase.auth.getSession().then(({ data }) => setSession(data.session));
    const { data } = supabase.auth.onAuthStateChange((_event, s) => setSession(s));
    return () => data.subscription.unsubscribe();
  }, []);
  return session;
}

export default useSession;
