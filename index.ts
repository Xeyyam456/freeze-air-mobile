import { registerRootComponent } from "expo";
import App from "./App";

// Giriş nöqtəsi (package.json "main"). registerRootComponent həm dev build, həm release üçün düzgün qeydiyyat edir.
registerRootComponent(App);
