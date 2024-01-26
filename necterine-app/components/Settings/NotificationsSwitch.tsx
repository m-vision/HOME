import { SettingsItem } from "../../app/(auth)/(app)/constants";
import { useState, useEffect } from "react";
import { AppState, Linking, View, Switch } from "react-native";
import * as Notifications from "expo-notifications";
import Text from "../Text";

const NotificationsSwitch = ({ item }: { item: SettingsItem }) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [appState, setAppState] = useState(AppState.currentState);

  const checkNotificationSettings = async () => {
    const permissions = await Notifications.getPermissionsAsync();

    setIsEnabled(
      permissions.granted ||
        permissions.ios?.status ===
          Notifications.IosAuthorizationStatus.PROVISIONAL
    );
  };

  useEffect(() => {
    checkNotificationSettings();
  }, []);

  useEffect(() => {
    const subscription = AppState.addEventListener("change", (nextAppState) => {
      if (appState.match(/inactive|background/) && nextAppState === "active") {
        checkNotificationSettings();
      }
      setAppState(nextAppState);
    });

    return () => {
      subscription.remove();
    };
  }, [appState, checkNotificationSettings]);

  const toggleSwitch = async () => {
    if (isEnabled) {
      // TODO: If notifications are enabled, explain user how to disable them and open settings
      Linking.openSettings();
    } else {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status === "denied") {
        // TODO: Display dialog to user to enable notifications
        Linking.openSettings();
      }
    }
    await checkNotificationSettings();
  };

  return (
    <View className="bg-white flex-row px-5 py-4 items-center">
      <View className="flex-row flex-1 items-center">
        {item.icon}
        <Text className="text-darkPurple-900 text-base ml-4">{item.title}</Text>
      </View>
      <Switch
        className="justify-self-end"
        onChange={() => toggleSwitch()}
        value={isEnabled}
      />
    </View>
  );
};

export default NotificationsSwitch;
