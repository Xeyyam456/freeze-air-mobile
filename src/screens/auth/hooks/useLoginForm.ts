import { useState } from "react";
import { signIn } from "@shared/services/auth.service";

// Giriş formu: sahələr, yoxlama, göndərmə. Uğurda ekranı RootNavigator özü dəyişir (sessiya hadisəsi).
function useLoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function submit() {
    if (!email.trim() || !password) return setError("E-poçt və parolu yaz.");
    setError(null);
    setLoading(true);
    const message = await signIn(email, password);
    setLoading(false);
    if (message) setError(message);
  }

  return { email, setEmail, password, setPassword, error, loading, submit };
}

export default useLoginForm;
