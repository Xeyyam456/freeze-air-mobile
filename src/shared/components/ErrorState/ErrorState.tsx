import { WifiOff } from "lucide-react-native";
import { Text, View } from "react-native";
import Button from "@shared/components/Button";
import { c } from "@theme/colors";
import { styles } from "./ErrorState.styles";
import type { ErrorStateProps } from "./ErrorState.types";

// Məlumat yüklənmədi (keş də boşdur): mesaj + "Yenidən yoxla"
function ErrorState({ message, onRetry }: ErrorStateProps) {
  return (
    <View style={styles.wrap}>
      <WifiOff size={28} color={c.muted} />
      <Text style={styles.text}>{message}</Text>
      {onRetry && <Button title="Yenidən yoxla" variant="soft" onPress={onRetry} />}
    </View>
  );
}

export default ErrorState;
