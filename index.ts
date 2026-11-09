import { registerRootComponent } from "expo";
import "@app/pushTapEarly"; // push toxunuşu: React-dan əvvəl dinləyici (tam bağlı tətbiq)
import App from "./App";

// Giriş nöqtəsi (package.json "main"). registerRootComponent həm dev build, həm release üçün düzgün qeydiyyat edir.
registerRootComponent(App);
