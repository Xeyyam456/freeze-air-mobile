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
- `src/screens/auth/{components,hooks}/`, `src/screens/protected/<bölmə>/components/<Komponent>/` + `src/screens/protected/<bölmə>/hooks/` (komponentlər və hook-lar həmişə ayrı qovluqda; bölmənin kökündə başqa heç nə yoxdur).
- `src/shared/` — `api/` (supabase, storage, queryClient, queryStorage), `services/*.service.ts` (yalnız burada `supabase.from/rpc`), `queries/queryKeys.ts`, `hooks/`, `components/` (Button, Card, Pill, Avatar, TextField, ErrorState), `utils/` (time, toast), `config/env.ts` (env yalnız burada).
- `src/theme/` — `colors.ts` (web panel tokenləri ilə eyni), `navigationTheme.ts`.
- Tiplər kökdə `types/` (`navigation.ts`, `panel.ts`, `database.ts` — Supabase-dən, əl ilə dəyişmə; kökdəki `supabase/database.types.ts`-dən kopyala).
- **Importlar yalnız alias ilə**: `@app/*`, `@navigation/*`, `@screens/*`, `@shared/*`, `@theme/*`, `@typings/*`, `@assets/*` (`tsconfig.json`). `../` yoxdur; yalnız komponentin öz `./Ad.styles` / `./Ad.types` faylları `./` ilə.
- **Siyahılar yalnız `@shopify/flash-list`** (FlatList, böyük ScrollView yox). Sətir komponenti `memo`.
- Fayl max ~100 sətir; böyüyürsə böl.
- Paket əlavə etmək: `npx expo install <paket>` (SDK-ya uyğun versiya). Native modul əlavə olunanda yenidən build lazımdır.

## Sürət qaydaları (istifadəçi tələbi: "saat kimi gecikməsiz")
- Keş diskdə (MMKV + TanStack persist, `shared/api/queryStorage.ts`): açılışda son məlumat dərhal görünür, boş "Yüklənir" ekranı yoxdur.
- **UI DƏRHAL dəyişir (DAİMİ, istifadəçi 2026-11-06: "işə gəldimə klik edən kimi UI dəyişməlidir, bütün yerlərdə")**: hər yazı əməliyyatı optimistikdir. Klik handler-ində əvvəl keş **sinxron** dəyişir (`qc.setQueryData`), sonra `mutation.mutate({ ..., prev })`; `onError` → `prev`-ə qaytar + tost; `onSettled` → `invalidateQueries`. `onMutate` içində `await` edib sonra yazma (gecikmə). **Düymədə spinner yox** (nəticə dərhal görünür); təkrar klik `isPending` ilə bloklanır. Realtime hadisəsi yazı gedərkən keşi əzməsin (`qc.isMutating()` yoxla). Nümunə: `panel/hooks/useMyDay.ts` + `shared/utils/optimistic.ts`.
- Yenilənmə Realtime ilə (`panel/hooks/usePanelLive.ts`: bir kanal, `setAuth` vacibdir), dövri sorğu yox. Yeni cədvəl/açar əlavə edəndə `TABLE_KEYS`-ə yaz.
- Şəkillər `expo-image` (`cachePolicy="disk"`).

## Komandalar və build (Windows)
- Tip yoxlaması: `npx tsc --noEmit` (commitdən əvvəl). Metro: `npx expo start --dev-client --port 8081 < /dev/null` (fonda). **`CI=1` ilə başlatma**: o rejimdə fayl izləmə və reload söndürülür, dəyişiklik telefona düşmür. Reload: `curl -X POST localhost:8081/reload`.
- Native build: `npx expo run:android` və ya `cd android && gradlew.bat app:assembleDebug -PreactNativeArchitectures=arm64-v8a`, sonra `adb install -r android/app/build/outputs/apk/debug/app-debug.apk`. Build-dən sonra `gradlew --stop` (daemonlar ~3 GB RAM tutur; istifadəçi RAM/CPU-dan şikayət edib).
- Android SDK: `%LOCALAPPDATA%\Android\Sdk` (Android Studio yoxdur; cmdline-tools 23, platforma 37.0, build-tools 37, NDK 27.1, CMake 3.31.6). `ANDROID_HOME`, `JAVA_HOME` (JDK 17) user env-dədir.
- **Uzun yollar**: Windows-da `LongPathsEnabled = 1` (istifadəçi admin ilə açıb) + CMake 3.31.6 (ninja 1.12). `android/local.properties`-i `plugins/withLocalCmake.js` hər prebuild-də yazır. **`subst` / M: diski işlətmə** (istifadəçi istəmir; həm də codegen "different roots" xətası verir). Layihə həmişə `kondisioner-servis\mobile`-dan yığılır.
- **APK (TikTak kimi)**: `npm run apk` (`scripts/build-apk.js`): prebuild → `assembleRelease` (arm64-v8a + armeabi-v7a) → `gradlew --stop` → `mobile/apk/freeze-air DD.MM.YYYY HH.MM.apk` (git-ignore). JS bundle içindədir, Metro lazım deyil. İmza hələlik debug açarı (Play Store üçün öz keystore → GitHub Secrets).
- **GitHub-da APK**: `.github/workflows/build-apk.yml` (kökdə `mobile/.github/`, ayrı repoda kökə düşür): `freeze-air-mobile`-a hər push-da və ya Actions → Run workflow; nəticə artefakt `freeze-air-release-apk` (30 gün). Repo Secrets: `EXPO_PUBLIC_SUPABASE_URL`, `EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY` (Claude yaza bilmir — "Secret-Store Writes" bloku; istifadəçi `gh secret set` ilə yazır).
- `android/`, `ios/` git-də yoxdur (CNG: `npx expo prebuild --platform android --no-install`).
- **Telefon**: Xiaomi 12 Lite (Android 14), Wi-Fi adb. Qoşulma portu hər dəfə dəyişir: istifadəçidən "Wireless debugging" ekranındakı IP:Port-u istə, `adb connect`. İki cihaz görünsə (IP + mDNS adı) `adb -s <IP:port>` işlət. Telefon Metro-ya `adb reverse tcp:8081 tcp:8081` ilə qoşulur.
- Env: `.env.local` (git-ignore): `EXPO_PUBLIC_SUPABASE_URL`, `EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY` (publishable, gizli deyil). Nümunə `.env.example`.

## Git
- Kök repoda commit (hər bitmiş addım dərhal lokal commit, mesaj Azərbaycanca). Push yalnız istifadəçi deyəndə: kökdən `node scripts/push-all.mjs` (kök + dəyişən web/admin/mobile, saniyələr).
