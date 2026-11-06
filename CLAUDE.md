@AGENTS.md

# CLAUDE.md — Freeze Air: mobil app (usta paneli)

## Ünsiyyət
- Hər şey Azərbaycan dilində: cavablar, izahlar, kod şərhləri. Kod, identifikatorlar, texniki terminlər olduğu kimi.
- Qısa, birbaşa. Məcburi razılaşma yoxdur: səhvi açıq de, daha yaxşı variant təklif et.

## Nədir
Usta paneli üçün React Native app: **Expo SDK 58** (RN 0.88, development build, Expo Go yox), **React Navigation** (expo-router yox: daha yüngül açılış), **birbaşa Supabase** (publishable açar + RLS; ayrıca server yox). Kök repo `kondisioner-servis/mobile`, deploy güzgüsü `github.com/Xeyyam456/freeze-air-mobile` (remote `mobile`). Paket `az.freezeair.mobile`. Yalnız tünd tema.

**Hansı sorğu hara gedir: `docs/API.md`** (cədvəl, RPC, Storage, Realtime; web usta panelinin servisləri ilə eyni). Baza dəyişəndə həmin faylı yenilə.

## Quruluş (DAİMİ; nümunə: github.com/Xeyyam456/TikTak-Project-RN-MobileApp)
- Hər komponent öz qovluğunda: `Ad/Ad.tsx` (default export), `Ad.styles.ts` (StyleSheet), `Ad.types.ts` (props), `index.ts` (`export { default } from './Ad'`). Qovluqda başqa başıboş fayl yoxdur.
- `src/app/` — Providers, AppShell, `hooks/` (useAppBootstrap, useSession).
- `src/navigation/` — RootNavigator (auth flow: sessiyaya görə Login / Main), `*StackNavigator`, sonra TabNavigator. Ekranlarda naviqator yaratma.
- `src/screens/auth/components/<Ekran>/`, `src/screens/protected/<bölmə>/<Komponent>/` + `<bölmə>/hooks/`.
- `src/shared/` — `api/` (supabase, storage, queryClient, queryStorage), `services/*.service.ts` (yalnız burada `supabase.from/rpc`), `queries/queryKeys.ts`, `hooks/`, `components/` (Button, Card, Pill, Avatar, TextField, ErrorState), `utils/` (time, toast), `config/env.ts` (env yalnız burada).
- `src/theme/` — `colors.ts` (web panel tokenləri ilə eyni), `navigationTheme.ts`.
- Tiplər kökdə `types/` (`navigation.ts`, `panel.ts`, `database.ts` — Supabase-dən, əl ilə dəyişmə; kökdəki `supabase/database.types.ts`-dən kopyala).
- **Importlar yalnız alias ilə**: `@app/*`, `@navigation/*`, `@screens/*`, `@shared/*`, `@theme/*`, `@typings/*`, `@assets/*` (`tsconfig.json`). `../` yoxdur; yalnız komponentin öz `./Ad.styles` / `./Ad.types` faylları `./` ilə.
- **Siyahılar yalnız `@shopify/flash-list`** (FlatList, böyük ScrollView yox). Sətir komponenti `memo`.
- Fayl max ~100 sətir; böyüyürsə böl.
- Paket əlavə etmək: `npx expo install <paket>` (SDK-ya uyğun versiya). Native modul əlavə olunanda yenidən build lazımdır.

## Sürət qaydaları (istifadəçi tələbi: "saat kimi gecikməsiz")
- Keş diskdə (MMKV + TanStack persist, `shared/api/queryStorage.ts`): açılışda son məlumat dərhal görünür, boş "Yüklənir" ekranı yoxdur.
- Hər düymə optimistik (`useMutation` + `onMutate`/`onError` geri qaytarma; nümunə `panel/hooks/useMyDay.ts`).
- Yenilənmə Realtime ilə (`panel/hooks/usePanelLive.ts`: bir kanal, `setAuth` vacibdir), dövri sorğu yox. Yeni cədvəl/açar əlavə edəndə `TABLE_KEYS`-ə yaz.
- Şəkillər `expo-image` (`cachePolicy="disk"`).

## Komandalar və build (Windows)
- Tip yoxlaması: `npx tsc --noEmit` (commitdən əvvəl). Metro: `npm start` (fonda; `--dev-client`).
- Native build: `npx expo run:android` və ya `cd android && gradlew.bat app:assembleDebug -PreactNativeArchitectures=arm64-v8a`, sonra `adb install -r android/app/build/outputs/apk/debug/app-debug.apk`. Build-dən sonra `gradlew --stop` (daemonlar ~3 GB RAM tutur; istifadəçi RAM/CPU-dan şikayət edib).
- Android SDK: `%LOCALAPPDATA%\Android\Sdk` (Android Studio yoxdur; cmdline-tools 23, platforma 37.0, build-tools 37, NDK 27.1, CMake 3.31.6). `ANDROID_HOME`, `JAVA_HOME` (JDK 17) user env-dədir.
- **Uzun yollar**: Windows-da `LongPathsEnabled = 1` (istifadəçi admin ilə açıb) + CMake 3.31.6 (ninja 1.12). `android/local.properties`-i `plugins/withLocalCmake.js` hər prebuild-də yazır. **`subst` / M: diski işlətmə** (istifadəçi istəmir; həm də codegen "different roots" xətası verir). Layihə həmişə `kondisioner-servis\mobile`-dan yığılır.
- `android/`, `ios/` git-də yoxdur (CNG: `npx expo prebuild --platform android --no-install`).
- **Telefon**: Xiaomi 12 Lite (Android 14), Wi-Fi adb. Qoşulma portu hər dəfə dəyişir: istifadəçidən "Wireless debugging" ekranındakı IP:Port-u istə, `adb connect`. İki cihaz görünsə (IP + mDNS adı) `adb -s <IP:port>` işlət. Telefon Metro-ya `adb reverse tcp:8081 tcp:8081` ilə qoşulur.
- Env: `.env.local` (git-ignore): `EXPO_PUBLIC_SUPABASE_URL`, `EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY` (publishable, gizli deyil). Nümunə `.env.example`.

## Git
- Kök repoda commit (hər bitmiş addım dərhal lokal commit, mesaj Azərbaycanca). Push yalnız istifadəçi deyəndə: kökdən `node scripts/push-all.mjs` (kök + dəyişən web/admin/mobile, saniyələr).
