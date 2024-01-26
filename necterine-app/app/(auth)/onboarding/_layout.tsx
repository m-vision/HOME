import theme from "../../../utils/theme";
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
        name="welcome"
        options={{
          headerShown: false,
          contentStyle: {
            paddingHorizontal: 20,
            backgroundColor: theme.extend.colors.lightPurple[300],
          },
        }}
      />
      <Stack.Screen
        name="user_name"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="user_birthday"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="user_gender"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="user_sexual_orientation"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="user_pronouns"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="user_gender_preferences"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="user_connection_type"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="user_age_range"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="user_photos"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="user_location"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="optional_onboarding_start"
        options={{
          headerShown: false,
          contentStyle: {
            paddingHorizontal: 20,
            backgroundColor: theme.extend.colors.lightPurple[300],
          },
        }}
      />
      <Stack.Screen
        name="optional_question_one"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="optional_question_two"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="optional_question_three"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="optional_question_four"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="optional_question_five"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="optional_question_six"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
};

export default PublicLayout;
