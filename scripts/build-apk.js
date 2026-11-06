/**
 * `npm run apk`: release APK yığır və mobile/apk/ qovluğuna tarixli adla köçürür
 * ("freeze-air 06.11.2026 12.40.apk") — Gradle-ın dərin qovluqlarında axtarmaq lazım olmasın.
 * TikTak layihəsindəki skriptin eynisi, üstəlik:
 *  - əvvəl `expo prebuild` (android/ git-də yoxdur, CNG); plugins/withLocalCmake local.properties-i yazır;
 *  - yalnız telefon arxitekturaları (arm64-v8a, armeabi-v7a): emulyator x86 lazım deyil, build qısalır;
 *  - sonda `gradlew --stop`: daemonlar ~3 GB RAM tutur.
 * JS bundle APK-nın içindədir: Metro və kompüter lazım deyil, istənilən telefona quraşdırılır.
 * İmza: hələlik debug açarı (telefona quraşdırmaq üçün bəs edir); Play Store üçün öz keystore lazımdır.
 */
const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const projectRoot = path.resolve(__dirname, "..");
const androidDir = path.join(projectRoot, "android");
const apkSource = path.join(androidDir, "app", "build", "outputs", "apk", "release", "app-release.apk");
const outDir = path.join(projectRoot, "apk");
const isWin = process.platform === "win32";
const gradlew = path.join(androidDir, isWin ? "gradlew.bat" : "gradlew");
const run = (cmd, cwd = projectRoot) => execSync(cmd, { cwd, stdio: "inherit", shell: true });

console.log("1/3 Native qovluq (expo prebuild)...");
run("npx expo prebuild --platform android --no-install");

console.log("2/3 Release APK (gradlew assembleRelease)...");
try {
  run(`"${gradlew}" assembleRelease -PreactNativeArchitectures=arm64-v8a,armeabi-v7a`, androidDir);
} finally {
  run(`"${gradlew}" --stop`, androidDir);
}

if (!fs.existsSync(apkSource)) {
  console.error(`APK tapılmadı: ${apkSource}`);
  process.exit(1);
}

console.log("3/3 apk/ qovluğuna köçürülür...");
fs.mkdirSync(outDir, { recursive: true });
const now = new Date();
const pad = (n) => String(n).padStart(2, "0");
// Windows fayl adında ':' olmur, saat nöqtə ilə
const stamp = `${pad(now.getDate())}.${pad(now.getMonth() + 1)}.${now.getFullYear()} ${pad(now.getHours())}.${pad(now.getMinutes())}`;
const dest = path.join(outDir, `freeze-air ${stamp}.apk`);
fs.copyFileSync(apkSource, dest);

const mb = (fs.statSync(dest).size / 1048576).toFixed(1);
console.log(`\nAPK hazırdır (${mb} MB): ${dest}`);
