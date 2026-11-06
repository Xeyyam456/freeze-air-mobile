// Windows-da uzun yollar (C++ modulları: nitro, worklets) köhnə ninja ilə yığılmır: CMake 3.31.6 (ninja 1.12) lazımdır.
// `expo prebuild` android/local.properties-i silir; bu plugin onu hər prebuild-də yenidən yazır (yalnız Windows, SDK varsa).
// Şərtlər: Windows-da LongPathsEnabled = 1 və SDK-da cmake;3.31.6 quraşdırılıb (mobile/CLAUDE.md).
const fs = require("fs");
const path = require("path");
const { withDangerousMod } = require("expo/config-plugins");

const CMAKE_VERSION = "3.31.6";

module.exports = function withLocalCmake(config) {
  return withDangerousMod(config, [
    "android",
    (cfg) => {
      const sdk = process.env.ANDROID_HOME || (process.env.LOCALAPPDATA && path.join(process.env.LOCALAPPDATA, "Android", "Sdk"));
      if (process.platform !== "win32" || !sdk || !fs.existsSync(path.join(sdk, "cmake", CMAKE_VERSION))) return cfg;
      const slash = (p) => p.replace(/\\/g, "/");
      const file = path.join(cfg.modRequest.platformProjectRoot, "local.properties");
      fs.writeFileSync(file, `sdk.dir=${slash(sdk)}\ncmake.dir=${slash(path.join(sdk, "cmake", CMAKE_VERSION))}\n`);
      return cfg;
    },
  ]);
};
