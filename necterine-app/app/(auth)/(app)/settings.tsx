import React from "react";
import { SectionList, View } from "react-native";
import Text from "../../../components/Text";
import {
  SETTINGS_DATA,
  SettingsItem,
  SettingsSection,
} from "../../../components/Settings/constants";
import NotificationsSwitch from "../../../components/Settings/NotificationsSwitch";
import NavigationItem from "../../../components/Settings/NavigationItem";
import FooterSection from "../../../components/Settings/FooterSection";

const Settings = () => {
  const renderSectionHeader = ({ section }: { section: SettingsSection }) => (
    <View className="px-6 pt-6 pb-2">
      <Text className="text-lightPurple-700 text-sm">{section.title}</Text>
    </View>
  );

  const renderItem = ({ item }: { item: SettingsItem }) => {
    switch (item.type) {
      case "notifications-switch":
        return <NotificationsSwitch item={item} />;
      case "navigation":
        return <NavigationItem item={item} />;
      default:
        return <NavigationItem item={item} />;
    }
  };

  return (
    <SectionList
      className="bg-lightPurple-50"
      sections={SETTINGS_DATA}
      renderSectionHeader={renderSectionHeader}
      renderItem={renderItem}
      keyExtractor={(item) => item.key}
      ListFooterComponent={FooterSection}
    />
  );
};

export default Settings;
