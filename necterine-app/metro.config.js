const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Add support for symlinks
if (config.transformer) {
    config.transformer.babelTransformerPath = require.resolve("react-native-svg-transformer");
  }

// Adjust asset and source extensions for SVG support
config.resolver.assetExts = config.resolver.assetExts.filter(ext => ext !== "svg");
config.resolver.sourceExts = [...config.resolver.sourceExts, "svg"];

module.exports = config;