import { Lock, Mail, Snowflake } from "lucide-react-native";
import { Text, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Button from "@shared/components/Button";
import TextField from "@shared/components/TextField";
import { c } from "@theme/colors";
import useLoginForm from "@screens/auth/hooks/useLoginForm";
import { styles } from "./LoginScreen.styles";

// Giriş: yalnız e-poçt + parol (qeydiyyat bağlıdır, hesabları admin açır)
function LoginScreen() {
  const insets = useSafeAreaInsets();
  const f = useLoginForm();

  return (
    <KeyboardAwareScrollView
      style={styles.flex}
      contentContainerStyle={[styles.content, { paddingTop: insets.top + 48, paddingBottom: insets.bottom + 24 }]}
      keyboardShouldPersistTaps="handled"
      bottomOffset={24}
    >
      <View style={styles.brand}>
        <View style={styles.logo}><Snowflake size={34} color={c.primary} /></View>
        <Text style={styles.name}>Freeze Air</Text>
        <Text style={styles.badge}>Usta paneli</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.title}>Daxil ol</Text>
        <TextField
          label="E-poçt"
          icon={Mail}
          value={f.email}
          onChangeText={f.setEmail}
          placeholder="ad@freezeair.az"
          keyboardType="email-address"
          autoCapitalize="none"
          autoComplete="email"
          textContentType="emailAddress"
          returnKeyType="next"
        />
        <TextField
          label="Parol"
          icon={Lock}
          secure
          value={f.password}
          onChangeText={f.setPassword}
          placeholder="••••••••"
          autoComplete="current-password"
          textContentType="password"
          returnKeyType="go"
          onSubmitEditing={f.submit}
        />
        {f.error && <Text style={styles.error}>{f.error}</Text>}
        <Button title="Daxil ol" onPress={f.submit} loading={f.loading} style={styles.submit} />
      </View>

      <Text style={styles.hint}>Hesabın yoxdursa, rəhbərliyə müraciət et.</Text>
    </KeyboardAwareScrollView>
  );
}

export default LoginScreen;
