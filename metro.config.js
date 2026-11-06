// Metro konfiqi. Layihənin KÖK android/ və ios/ qovluqları izlənmir: Gradle/CMake build zamanı orada müvəqqəti qovluqlar
// yaranıb silinir, Metro-nun fayl izləyicisi ENOENT ilə donurdu (native build-dən sonra ağ ekran, /status cavab vermir).
// node_modules içindəki android/ qovluqlarına toxunulmur.
const path = require("path");
const { getDefaultConfig } = require("expo/metro-config");

const config = getDefaultConfig(__dirname);
const esc = (p) => p.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const native = ["android", "ios"].map((d) => new RegExp(`^${esc(path.join(__dirname, d))}[\\\\/].*`));

config.resolver.blockList = [...native, ...[].concat(config.resolver.blockList ?? [])];

module.exports = config;
