import { Ionicons } from "@expo/vector-icons";

export interface SettingsSection {
  title: string;
  data: SettingsItem[];
}

export interface SettingsItem {
  key: string;
  title: string;
  type: string;
  icon: React.ReactNode;
  navigateTo?: string;
}

export const SETTINGS_DATA: SettingsSection[] = [
  {
    title: "Notifications",
    data: [
      {
        key: "push_notifications",
        title: "Push Notifications",
        type: "notifications-switch",
        icon: (
          <Ionicons
            name="ios-notifications-outline"
            size={24}
            color="#111827"
          />
        ),
      },
    ],
  },
  {
    title: "Help & Feedback",
    data: [
      {
        key: "send_a_comment",
        title: "Send a comment",
        type: "navigation",
        navigateTo: "/settings/send_a_comment",
        icon: (
          <Ionicons
            name="ios-chatbubble-ellipses-outline"
            size={24}
            color="#111827"
          />
        ),
      },
    ],
  },
  {
    title: "Legal",
    data: [
      {
        key: "terms_of_use",
        title: "Terms of use",
        type: "navigation",
        navigateTo: "/settings/terms_of_use",
        icon: (
          <Ionicons
            name="ios-document-text-outline"
            size={24}
            color="#111827"
          />
        ),
      },
      {
        key: "privacy_policy",
        title: "Privacy Policy",
        type: "navigation",
        navigateTo: "/settings/privacy_policy",
        icon: (
          <Ionicons
            name="ios-shield-checkmark-outline"
            size={24}
            color="#111827"
          />
        ),
      },
    ],
  },
  {
    title: "Community",
    data: [
      {
        key: "community_guidelines",
        title: "Community Guidelines",
        type: "navigation",
        navigateTo: "/settings/community_guidelines",
        icon: <Ionicons name="ios-people-outline" size={24} color="#111827" />,
      },
    ],
  },
];
