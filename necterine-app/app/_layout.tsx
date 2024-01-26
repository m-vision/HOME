import { ApolloProvider } from "@apollo/client";
import { ClerkProvider, useAuth } from "@clerk/clerk-expo";
import CheckCircleImage from "../assets/svg/check-circle.svg";
import ExclamationImage from "../assets/svg/exclamation.svg";
import XCircleImage from "../assets/svg/x-circle.svg";
import Text from "../components/Text";
import { tokenCache } from "../config/auth";
import { getApolloClient } from "../graphql/client";
import { TOASTER_DURATION } from "../utils/constants";
import theme from "../utils/theme";
import * as Sentry from "sentry-expo";
import React, { useEffect, useMemo } from "react";
import { View } from "react-native";
import { ToastProvider, useToast } from "react-native-toast-notifications";
import { ToastProps } from "react-native-toast-notifications/lib/typescript/toast";
import { Logs } from "expo";
import { Slot, useRouter, useSegments } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useValidateUserAndUpdateDeviceTokenMutation } from "../graphql-types/src/graphql";

const InitialLayout = () => {
  const { isLoaded, isSignedIn } = useAuth();
  const segments = useSegments();
  const router = useRouter();
  const [validateUserAndUpdateDeviceToken] =
    useValidateUserAndUpdateDeviceTokenMutation();
  const toast = useToast();

  const validateUser = async () => {
    //  TODO: fetch user real device token
    const result = await validateUserAndUpdateDeviceToken({
      variables: { deviceToken: "test" },
    });

    const inTabsGroup = segments[0] === "(auth)";

    if (result.errors) {
      toast.show("", {
        type: "error",
      });
      Sentry.Native.captureException(result.errors);
      return;
    }

    if (
      result.data?.validateUserAndUpdateDeviceToken.onboardingCompleted &&
      !inTabsGroup
    ) {
      router.replace("/home");
    } else if (
      !result.data?.validateUserAndUpdateDeviceToken.onboardingCompleted &&
      !inTabsGroup
    ) {
      router.replace("/onboarding/welcome");
    }
  };

  useEffect(() => {
    if (!isLoaded) return;

    if (isSignedIn) {
      void validateUser();
    } else if (!isSignedIn) {
      router.replace("/landing");
    }
  }, [isSignedIn]);

  return <Slot />;
};

const ApolloInitialization = () => {
  const { getToken } = useAuth();
  const client = useMemo(() => {
    return getApolloClient(getToken);
  }, [getToken]);

  return (
    <ApolloProvider client={client}>
      <ToastProvider
        duration={TOASTER_DURATION}
        dangerColor={theme.extend.colors.error[50]}
        successColor={theme.extend.colors.green[100]}
        warningColor={theme.extend.colors.warning[50]}
        renderToast={(props: ToastProps) => {
          switch (props.type) {
            case "error":
              return (
                <View
                  className="w-[90%] bg-error-50 p-4 rounded-md shadow-lg flex-row items-center"
                  style={props.style}
                >
                  <XCircleImage height={22} width={22} />
                  <Text className="text-sm text-error-900 ml-2 pr-4">
                    {props.message || "Something went wrong. Please try again"}
                  </Text>
                </View>
              );
            case "success":
              return (
                <View
                  className="w-[90%] bg-green-100 p-4 rounded-md shadow-lg flex-row items-center"
                  style={props.style}
                >
                  <CheckCircleImage height={22} width={22} />
                  <Text className="text-sm text-green-900 ml-2 pr-4">
                    {props.message || "Success"}
                  </Text>
                </View>
              );
            case "warning":
              return (
                <View
                  className="w-[90%] bg-warning-50 p-4 rounded-md shadow-lg flex-row items-center"
                  style={props.style}
                >
                  <ExclamationImage height={22} width={22} />
                  <Text className="text-sm text-warning-900 ml-2 pr-4">
                    {props.message || "Warning"}
                  </Text>
                </View>
              );
            default:
              return (
                <View
                  className="w-[90%] bg-blue-50 p-4 rounded-md shadow-lg flex-row items-center"
                  style={props.style}
                >
                  <Text className="text-sm text-blue-900 pr-4">
                    {props.message || "Info message"}
                  </Text>
                </View>
              );
          }
        }}
      >
        <InitialLayout />
      </ToastProvider>
    </ApolloProvider>
  );
};

export default function Layout() {
  // For development purposes only
  Logs.enableExpoCliLogging();

  return (
    <ClerkProvider
      publishableKey={process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY ?? ""}
      tokenCache={tokenCache}
    >
      <StatusBar style="dark" />
      <ApolloInitialization />
    </ClerkProvider>
  );
}
