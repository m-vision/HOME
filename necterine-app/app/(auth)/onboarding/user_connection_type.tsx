import ArrowBack from "../../../components/Buttons/ArrowBack";
import PrimaryButton from "../../../components/Buttons/PrimaryButton";
import ConnectionTypeSelection from "../../../components/Profile/ConnectionTypeSelection";
import ScreenLayout from "../../../components/ScreenLayout";
import Text from "../../../components/Text";
import * as Sentry from "sentry-expo";
import { useState } from "react";
import { View } from "react-native";
import { useToast } from "react-native-toast-notifications";
import { useRouter } from "expo-router";
import {
  Connection_Type,
  useUpdatePreferredConnectionTypeMutation,
} from "../../../graphql-types/src/graphql";

const UserConnectionType = () => {
  const [selectedConnectionType, setSelectedConnectionType] =
    useState<Connection_Type>();
  const router = useRouter();
  const [updatePreferredConnectionType] =
    useUpdatePreferredConnectionTypeMutation();
  const [hasErrors, setHasErrors] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const onContinue = async () => {
    setHasErrors(false);

    if (selectedConnectionType === undefined) {
      setHasErrors(true);
      return;
    }
    try {
      setIsLoading(true);
      const result = await updatePreferredConnectionType({
        variables: {
          preferredConnectionType: selectedConnectionType,
        },
      });

      if (
        result.errors ||
        result.data?.updatePreferredConnectionType === undefined
      ) {
        toast.show("", {
          type: "error",
        });
        Sentry.Native.captureException(result.errors);
        setIsLoading(false);
        return;
      }
      setIsLoading(false);
      router.push("/onboarding/user_age_range");
    } catch (error) {
      toast.show("", {
        type: "error",
      });
      Sentry.Native.captureException(error);
      setIsLoading(false);
    }
  };

  return (
    <ScreenLayout>
      <>
        <View className="flex-1">
          <View className="my-8">
            <ArrowBack onBack={() => router.back()} />
          </View>
          <ConnectionTypeSelection
            selectedConnectionType={selectedConnectionType}
            onSelectConnectionType={setSelectedConnectionType}
            hasErrors={hasErrors}
          />
        </View>
        <View className="flex-2 justify-end">
          <Text className="text-base text-darkPurple-900 opacity-60 mb-4 pt-4 text-center">
            As feelings change, you can also update this later on your profile.
          </Text>
          <PrimaryButton
            title="Continue"
            disabled={!selectedConnectionType || isLoading}
            isLoading={isLoading}
            onPress={onContinue}
          />
        </View>
      </>
    </ScreenLayout>
  );
};

export default UserConnectionType;
