import { useEffect, useState } from "react";
import { Keyboard, Platform } from "react-native";

// Klaviaturanın hündürlüyü (açıq deyilsə 0): Modal içində (alt panel) klaviatura yazı sahəsini örtməsin deyə panel bu qədər qalxır
function useKeyboardHeight() {
  const [height, setHeight] = useState(0);
  useEffect(() => {
    const show = Keyboard.addListener(Platform.OS === "ios" ? "keyboardWillShow" : "keyboardDidShow", (e) => setHeight(e.endCoordinates.height));
    const hide = Keyboard.addListener(Platform.OS === "ios" ? "keyboardWillHide" : "keyboardDidHide", () => setHeight(0));
    return () => { show.remove(); hide.remove(); };
  }, []);
  return height;
}

export default useKeyboardHeight;
