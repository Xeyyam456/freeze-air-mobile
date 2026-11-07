import { Text, View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { styles } from "./WorkSteps.styles";
import type { WorkStepsProps } from "./WorkSteps.types";

// "Edilecək iş" addımlar xətti (zaman xətti kimi): nömrəli dairə + şaquli xətt + mətn; addımlar ardıcıl yumşaq daxil olur
function WorkSteps({ steps }: WorkStepsProps) {
  return (
    <View style={styles.box}>
      {steps.map((s, i) => (
        <Animated.View key={i} entering={FadeInDown.delay(180 + i * 80).duration(340)} style={styles.row}>
          <View style={styles.rail}>
            <View style={styles.dot}><Text style={styles.dotText}>{i + 1}</Text></View>
            {i < steps.length - 1 ? <View style={styles.line} /> : null}
          </View>
          <Text style={[styles.text, i === steps.length - 1 && styles.textLast]}>{s}</Text>
        </Animated.View>
      ))}
    </View>
  );
}

export default WorkSteps;
