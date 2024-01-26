import { useWamUpBrowser } from "../../hooks/useWarmUpBrowser";
import Text from "../Text";
import { useOAuth } from "@clerk/clerk-expo";
import AppleIcon from "../../assets/svg/apple-icon.svg";
import GoogleIcon from "../../assets/svg/google-icon.svg";
import * as Sentry from "sentry-expo";
import React, { useState } from "react";
import { TouchableOpacity, View } from "react-native";
import * as WebBrowser from "expo-web-browser";
import theme from "../../utils/theme";
import * as Progress from "react-native-progress";

WebBrowser.maybeCompleteAuthSession();

export function OAuthButtons() {
  const [isAppleLoading, setIsAppleLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  // Warm up the android browser to improve UX
  // https://docs.expo.dev/guides/authentication/#improving-user-experience
  useWamUpBrowser();
  const { startOAuthFlow: startOAuthFlowGoogle } = useOAuth({
    strategy: "oauth_google",
  });
  const { startOAuthFlow: startOAuthFlowApple } = useOAuth({
    strategy: "oauth_apple",
  });

  const onPress = React.useCallback(
    async (type: "google" | "apple") => {
      try {
        let createdSessionId, setActive;

        if (type === "google") {
          setIsGoogleLoading(true);
          const result = await startOAuthFlowGoogle();
          createdSessionId = result.createdSessionId;
          setActive = result.setActive;
        } else {
          setIsAppleLoading(true);
          const result = await startOAuthFlowApple();
          createdSessionId = result.createdSessionId;
          setActive = result.setActive;
        }

        if (createdSessionId && setActive) {
          await setActive({ session: createdSessionId });
        }
      } catch (err) {
        Sentry.Native.captureException(err);
        // TODO: handle error
      } finally {
        setIsAppleLoading(false);
        setIsGoogleLoading(false);
      }
    },
    [startOAuthFlowGoogle, startOAuthFlowApple]
  );

  return (
    <>
      <TouchableOpacity
        className="flex py-5 px-8 justify-center items-center rounded-full bg-black border border-gray-300 mb-4 w-full flex-row"
        onPress={() => onPress("apple")}
      >
        {!isAppleLoading ? (
          <>
            <View className="mr-2">
              <AppleIcon width={16} height={16} />
            </View>
            <Text className="text-white font-esbuild-semibold text-base">
              Continue with Apple
            </Text>
          </>
        ) : (
          <Progress.Circle
            size={24}
            indeterminate={true}
            color={theme.extend.colors.lightPurple[50]}
            borderWidth={2}
          />
        )}
      </TouchableOpacity>

      <TouchableOpacity
        className="flex py-5 px-8 justify-center items-center rounded-full bg-white border border-gray-300 w-full flex-row"
        onPress={() => onPress("google")}
      >
        {!isGoogleLoading ? (
          <>
            <View className="mr-2">
              <GoogleIcon width={16} height={16} />
            </View>
            <Text className="text-darkPurple-900 font-esbuild-semibold text-base">
              Continue with Google
            </Text>
          </>
        ) : (
          <Progress.Circle
            size={24}
            indeterminate={true}
            color={theme.extend.colors.darkPurple[900]}
            borderWidth={2}
          />
        )}
      </TouchableOpacity>
    </>
  );
}
