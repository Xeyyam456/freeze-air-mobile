// OTA yeniləmə: app.json "version"-un son rəqəmini artırır (1.0.3 → 1.0.4), sonra eas update.
// runtimeVersion sabitdir: yalnız native dəyişiklikdə (yeni paket, plugin, icazə, ikon) əl ilə artır + yeni APK.
// İstifadə: npm run update -- "qısa mesaj"
const { readFileSync, writeFileSync } = require("node:fs");
const { join } = require("node:path");
const { execSync } = require("node:child_process");

const msg = process.argv.slice(2).join(" ").trim();
if (!msg) {
  console.error('Mesaj lazımdır: npm run update -- "qısa mesaj"');
  process.exit(1);
}

const file = join(__dirname, "..", "app.json");
const raw = readFileSync(file, "utf8");
const app = JSON.parse(raw);
const [major, minor, patch] = app.expo.version.split(".").map(Number);
const next = `${major}.${minor}.${patch + 1}`;
app.expo.version = next;
writeFileSync(file, JSON.stringify(app, null, 2) + "\n");
console.log(`Versiya: ${major}.${minor}.${patch} → ${next} (runtime ${app.expo.runtimeVersion})`);

try {
  execSync(`npx eas-cli update --channel production --environment production --non-interactive --message "${next}: ${msg.replace(/"/g, "'")}"`, {
    stdio: "inherit",
    cwd: join(__dirname, ".."),
  });
} catch {
  writeFileSync(file, raw);
  console.error("Yeniləmə alınmadı, versiya geri qaytarıldı.");
  process.exit(1);
}
