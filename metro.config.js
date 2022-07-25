const { getDefaultConfig } = require('metro-config');
module.exports = (async () => {
  const defaultConfig = await getDefaultConfig();
  const { assetExts } = defaultConfig.resolver;
  return {
    resolver: {
      // Add bin to assetExts
      assetExts: [...assetExts, 'bin', 'cjs'],
    }
  };
})();


//const { getDefaultConfig } = require("@expo/metro-config");

//module.exports = {
//  transformer: {
//    getTransformOptions: async () => ({
//      transform: {
//        experimentalImportSupport: false,
//        inlineRequires: false,
//      },
//    }),
//  },
//  resolver: {
//    sourceExts: ['jsx', 'js', 'ts', 'tsx'], //add here
//  },
//};