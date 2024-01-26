import ArrowBack from "../../../components/Buttons/ArrowBack";
import PrimaryButton from "../../../components/Buttons/PrimaryButton";
import GenderSelection from "../../../components/Profile/GenderSelection";
import ScreenLayout from "../../../components/ScreenLayout";
import Text from "../../../components/Text";
import * as Sentry from "sentry-expo";
import React, { useState } from "react";
import { View } from "react-native";
import { useToast } from "react-native-toast-notifications";
import { useRouter } from "expo-router";
import {
  Gender,
  useUpdateGenderMutation,
} from "../../../graphql-types/src/graphql";

const UserGender = () => {
  const [selectedGender, setSelectedGender] = useState<Gender>();
  const [hasErrors, setHasErrors] = useState(false);
  const [updateGender] = useUpdateGenderMutation();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const onContinue = async () => {
    setHasErrors(false);

    if (selectedGender === undefined) {
      setHasErrors(true);
      return;
    }

    try {
      setIsLoading(true);
      const result = await updateGender({
        variables: {
          gender: selectedGender,
        },
      });

      if (result.errors || result.data?.updateGender === undefined) {
        toast.show("", {
          type: "error",
        });
        Sentry.Native.captureException(result.errors);
        setIsLoading(false);
        return;
      }
      setIsLoading(false);
      router.push("/onboarding/user_sexual_orientation");
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
        <View className="flex-2">
          <View className="my-8">
            <ArrowBack onBack={() => router.back()} />
          </View>
          <GenderSelection
            selectedGender={selectedGender}
            onSelectGender={setSelectedGender}
            hasErrors={hasErrors}
          />
        </View>
        <View className="flex-1 justify-end">
          <Text className="text-base text-darkPurple-900 opacity-60 mb-4 text-center">
            You can always update this later
          </Text>
          <PrimaryButton
            title="Continue"
            isLoading={isLoading}
            disabled={!selectedGender || isLoading}
            onPress={onContinue}
          />
        </View>
      </>
    </ScreenLayout>
  );
};

export default UserGender;
