// Learn more: https://docs.expo.dev/guides/customizing-metro/
const { getDefaultConfig } = require('expo/metro-config');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

// expo-sqlite's web backend (wa-sqlite) ships a .wasm file that gets
// imported directly in its worker code. Metro doesn't treat .wasm as a
// resolvable asset by default, which is what causes:
//   "Unable to resolve module ./wa-sqlite/wa-sqlite.wasm"
// See: https://docs.expo.dev/versions/latest/sdk/sqlite/#web-setup
config.resolver.assetExts.push('wasm');

// expo-sqlite on web also needs SharedArrayBuffer, which browsers only
// expose on cross-origin-isolated pages. These headers make the local dev
// server (and, if you build one, a locally-served static export) cross-
// origin isolated. If you deploy the static export elsewhere, the exact
// same headers need to be set by whatever is serving the files (e.g. via
// the expo-router "headers" plugin option if using EAS Hosting).
config.server.enhanceMiddleware = (middleware) => {
  return (req, res, next) => {
    res.setHeader('Cross-Origin-Embedder-Policy', 'credentialless');
    res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
    return middleware(req, res, next);
  };
};

module.exports = config;
