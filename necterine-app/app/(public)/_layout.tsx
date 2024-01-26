import theme from "../../utils/theme";
import React from "react";
import { Stack } from "expo-router";

const PublicLayout = () => {
  return (
    <Stack
      screenOptions={{
        contentStyle: {
          paddingHorizontal: 20,
          backgroundColor: theme.extend.colors.lightPurple[50],
        },
      }}
    >
      <Stack.Screen
        name="landing"
        options={{
          headerShown: false,
          contentStyle: {
            paddingHorizontal: 0,
          },
        }}
      />
      <Stack.Screen
        name="login"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="register"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="email_confirmation"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="reset"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="reset_confirmation"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="terms_of_use"
        options={{
          headerShown: true,
          headerTitle: "Terms of use",
          headerTintColor: theme.extend.colors.darkPurple[500],
          contentStyle: {
            paddingHorizontal: 0,
          },
        }}
      />
      <Stack.Screen
        name="privacy_policy"
        options={{
          headerShown: true,
          headerTitle: "Privacy Policy",
          headerTintColor: theme.extend.colors.darkPurple[500],
          contentStyle: {
            paddingHorizontal: 0,
          },
        }}
      />
    </Stack>
  );
};

export default PublicLayout;
