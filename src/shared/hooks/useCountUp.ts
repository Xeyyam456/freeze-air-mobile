import { useEffect, useRef, useState } from "react";

// Rəqəm sayğacı: dəyər dəyişəndə əvvəlkindən yenisinə yumşaq sayır (ease-out). İlk dəyər keşdən gəlirsə 0-dan başlayır.
function useCountUp(value: number, duration = 700) {
  const [shown, setShown] = useState(0);
  const from = useRef(0);

  useEffect(() => {
    const start = Date.now();
    const a = from.current;
    let frame = 0;
    const tick = () => {
      const t = Math.min(1, (Date.now() - start) / duration);
      const eased = 1 - (1 - t) ** 3;
      setShown(Math.round(a + (value - a) * eased));
      if (t < 1) frame = requestAnimationFrame(tick);
      else from.current = value;
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [value, duration]);

  return shown;
}

export default useCountUp;
