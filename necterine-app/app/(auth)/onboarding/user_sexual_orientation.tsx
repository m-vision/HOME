import ArrowBack from "../../../components/Buttons/ArrowBack";
import PrimaryButton from "../../../components/Buttons/PrimaryButton";
import SexualOrientationSelection from "../../../components/Profile/SexualOrientationSelection";
import ScreenLayout from "../../../components/ScreenLayout";
import * as Sentry from "sentry-expo";
import { useState } from "react";
import { View } from "react-native";
import { useToast } from "react-native-toast-notifications";
import { useRouter } from "expo-router";
import {
  Sexual_Orientation,
  useUpdateSexualOrientationMutation,
} from "../../../graphql-types/src/graphql";

const UserSexualOrientation = () => {
  const [selectedOrientation, setSelectedOrientation] =
    useState<Sexual_Orientation>();
  const [displaySexualOrientation, setDisplaySexualOrientation] =
    useState(false);
  const router = useRouter();
  const [updateSexualOrientation] = useUpdateSexualOrientationMutation();
  const [hasErrors, setHasErrors] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const onContinue = async () => {
    setHasErrors(false);

    if (selectedOrientation === undefined) {
      setHasErrors(true);
      return;
    }
    try {
      setIsLoading(true);
      const result = await updateSexualOrientation({
        variables: {
          sexualOrientation: selectedOrientation,
          displaySexualOrientation,
        },
      });

      if (result.errors || result.data?.updateSexualOrientation === undefined) {
        toast.show("", {
          type: "error",
        });
        Sentry.Native.captureException(result.errors);
        setIsLoading(false);
        return;
      }
      setIsLoading(false);
      router.push("/onboarding/user_pronouns");
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
          <SexualOrientationSelection
            selectedOrientation={selectedOrientation}
            onSelectOrientation={setSelectedOrientation}
            displaySexualOrientation={displaySexualOrientation}
            onSelectDisplaySexualOrientation={setDisplaySexualOrientation}
            hasErrors={hasErrors}
          />
          <PrimaryButton
            title="Continue"
            disabled={!selectedOrientation || isLoading}
            isLoading={isLoading}
            onPress={onContinue}
          />
        </View>
      </>
    </ScreenLayout>
  );
};

export default UserSexualOrientation;
