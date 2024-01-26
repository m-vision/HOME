const IS_DEV = process.env.APP_VARIANT === "development";

export default {
  name: IS_DEV ? "Necterine Dev" : "Necterine",
  slug: "necterine-app",
  version: "1.0.0",
  orientation: "portrait",
  icon: "./assets/icon.png",
  userInterfaceStyle: "light",
  scheme: "necterine",
  splash: {
    foregroundImage: "./assets/necterine.png",
    resizeMode: "contain",
    backgroundColor: "#CFCCEC",
  },
  assetBundlePatterns: ["**/*"],
  ios: {
    bundleIdentifier: IS_DEV ? "com.necterine.app.dev" : "com.necterine.app",
    supportsTablet: true,
  },
  android: {
    package: IS_DEV ? "com.necterine.app.dev" : "com.necterine.app",
  },
  assetBundlePatterns: [
    "**/*"
  ],
  plugins: [
    "expo-router",
    "sentry-expo",
    [
      "expo-image-picker",
      {
        photosPermission:
          "Allow access to your photos, so you can upload them to your profile and share them in the app.",
        cameraPermission:
          "Allow access to your camera, so you can upload photos to your profile and share them in the app.",
      },
    ],
    [
      "expo-location",
      {
        locationAlwaysAndWhenInUsePermission:
          "Recommendations will be presented based on your location.",
      },
    ],
  ],
  hooks: {
    postPublish: [
      {
        file: "sentry-expo/upload-sourcemaps",
        config: {
          organization: "nolte-io",
          project: "necterine-app",
        },
      },
    ],
  },
  extra: {
    eas: {
      projectId: "a88d48b7-320d-4238-8b52-71cc231131ca",
    },
  },
  runtimeVersion: {
    policy: "appVersion",
  },
  owner: "nolte-io",
};
