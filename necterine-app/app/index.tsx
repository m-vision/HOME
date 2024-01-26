import NecterineImage from "../assets/svg/necterine.svg";
import * as Sentry from "sentry-expo";
import { useCallback } from "react";
import { View } from "react-native";
import Constants from "expo-constants";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

const executionEnvironment: string =
  Constants.expoConfig?.ios?.bundleIdentifier ??
  Constants.expoConfig?.android?.package ??
  "";

Sentry.init({
  dsn: process.env.EXPO_PUBLIC_SENTRY_DNS,
  enableInExpoDevelopment: true,
  debug: executionEnvironment === "com.necterine.app.dev" ? true : false,
  environment:
    executionEnvironment === "com.necterine.app.dev"
      ? "development"
      : "production",
});

SplashScreen.preventAutoHideAsync();

const App = () => {
  const [isLoaded] = useFonts({
    "esbuild-regular": require("../assets/fonts/ESBuild-Regular.ttf"),
    "esbuild-medium": require("../assets/fonts/ESBuild-Medium.ttf"),
    "esbuild-semibold": require("../assets/fonts/ESBuild-Semibold.ttf"),
  });

  const handleOnLayout = useCallback(async () => {
    if (isLoaded) {
      await SplashScreen.hideAsync(); //hide the splashscreen
    }
  }, [isLoaded]);

  if (!isLoaded) {
    return null;
  }

  return (
    <View
      className="flex-1 justify-center items-center bg-lightPurple-500"
      onLayout={handleOnLayout}
    >
      <NecterineImage />
    </View>
  );
};

export default App;
