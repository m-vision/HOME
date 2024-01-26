import ArrowBack from "../../../components/Buttons/ArrowBack";
import PrimaryButton from "../../../components/Buttons/PrimaryButton";
import IconContainer from "../../../components/IconContainer";
import RequestPermission from "../../../components/RequestPermission";
import ScreenLayout from "../../../components/ScreenLayout";
import Text from "../../../components/Text";
import * as Sentry from "sentry-expo";
import { useEffect, useState } from "react";
import { AppState, View } from "react-native";
import { useToast } from "react-native-toast-notifications";
import * as Linking from "expo-linking";
import * as Location from "expo-location";
import { useRouter } from "expo-router";
import { useUpdateLocationMutation } from "../../../graphql-types/src/graphql";

const UserLocation = () => {
  const router = useRouter();
  const [permissionDenied, setPermissionDenied] = useState(false);
  const [updateLocation] = useUpdateLocationMutation();
  const [isLoading, setIsLoading] = useState(false);
  const [appState, setAppState] = useState(AppState.currentState);
  const toast = useToast();

  const onContinue = async () => {
    try {
      setIsLoading(true);
      // Request permission to access location
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        // Permission denied
        setIsLoading(false);
        setPermissionDenied(true);
        return;
      }

      // Get the current location
      const { coords } = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = coords;

      const result = await updateLocation({
        variables: {
          latitude,
          longitude,
        },
      });

      if (result.errors || result.data?.updateLocation === undefined) {
        toast.show("", {
          type: "error",
        });
        setIsLoading(false);
        Sentry.Native.captureException(result.errors);
        return;
      }
      setIsLoading(false);
      router.push("/onboarding/optional_onboarding_start");
    } catch (error) {
      toast.show("", {
        type: "error",
      });
      setIsLoading(false);
      Sentry.Native.captureException(error);
    }
  };

  const openSettings = () => {
    Linking.openSettings();
  };

  const handleAppStateChange = (
    nextAppState: "active" | "background" | "inactive" | "unknown" | "extension"
  ) => {
    if (appState.match(/inactive|background/) && nextAppState === "active") {
      // App has come to the foreground, check permissions again
      onContinue();
    }
    setAppState(nextAppState);
  };

  useEffect(() => {
    AppState.addEventListener("change", handleAppStateChange);
  }, [appState]);

  return (
    <ScreenLayout>
      <>
        <View className="flex-1">
          <View className="my-8">
            <ArrowBack onBack={() => router.back()} />
          </View>
          {permissionDenied ? (
            <RequestPermission
              icon="📍"
              title="We need your location"
              description="Hey there! To help you discover great matches nearby, we need
          access to your location. Tap “Open Settings” so we can make your
          dating experience even better!"
              buttonLabel="Open settings"
              onAction={openSettings}
              isLoading={isLoading}
            />
          ) : (
            <>
              <View className="flex-1">
                <View className="mb-4 mt-20">
                  <IconContainer
                    containerClassName="bg-lightPurple-500 w-16 h-16 items-center justify-center"
                    icon="🗺️"
                    iconClassName="text-4xl"
                  />
                </View>
                <Text className="text-2xl font-esbuild-semibold mb-2 text-darkPurple-600">
                  We use your location to show you potential matches in your
                  area. Tap to allow access.
                </Text>
                <Text className="text-base text-darkPurple-900 opacity-60 mb-6">
                  Don’t worry, we only use this information to get you set up
                  with people nearby, so you can go on dates IRL.
                </Text>
              </View>

              <View className="flex-2 justify-end">
                <PrimaryButton
                  isLoading={isLoading}
                  disabled={isLoading}
                  title="Enable location"
                  onPress={onContinue}
                />
              </View>
            </>
          )}
        </View>
      </>
    </ScreenLayout>
  );
};

export default UserLocation;
