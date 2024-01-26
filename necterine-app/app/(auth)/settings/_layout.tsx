import theme from "../../../utils/theme";
import React from "react";
import { Stack, useRouter } from "expo-router";
import StackHeader from "../../../components/StackHeader";

const SettingsLayout = () => {
  const router = useRouter();
  return (
    <Stack
      screenOptions={{
        contentStyle: {
          backgroundColor: theme.extend.colors.lightPurple[50],
        },
        headerStyle: {
          backgroundColor: "#ffffff",
        },
        header(props) {
          return (
            <StackHeader
              props={props}
              onCustomBack={() => router.replace("/settings")}
            />
          );
        },
      }}
    >
      <Stack.Screen
        name="privacy_policy"
        options={{
          headerTitle: "Privacy Policy",
          headerBackVisible: true,
        }}
      />
      <Stack.Screen
        name="terms_of_use"
        options={{
          headerTitle: "Terms of use",
          headerBackVisible: true,
        }}
      />
      <Stack.Screen
        name="community_guidelines"
        options={{
          headerTitle: "Community Guidelines",
          headerBackVisible: true,
        }}
      />
      <Stack.Screen
        name="send_a_comment"
        options={{
          headerTitle: "Send a comment",
          headerBackVisible: true,
        }}
      />
    </Stack>
  );
};

export default SettingsLayout;
