import ArrowBack from "../../../components/Buttons/ArrowBack";
import PrimaryButton from "../../../components/Buttons/PrimaryButton";
import GenderPreferencesSelection from "../../../components/Profile/GenderPreferencesSelection";
import ScreenLayout from "../../../components/ScreenLayout";
import * as Sentry from "sentry-expo";
import { useState } from "react";
import { View } from "react-native";
import { useToast } from "react-native-toast-notifications";
import { useRouter } from "expo-router";
import {
  Gender,
  useUpdateGenderPreferencesMutation,
} from "../../../graphql-types/src/graphql";

const UserGenderPreferences = () => {
  const [selectedGenders, setSelectedGenders] = useState<Gender[]>([]);
  const router = useRouter();
  const [updateGenderPreferences] = useUpdateGenderPreferencesMutation();
  const [hasErrors, setHasErrors] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [displayGenderPreferences, setDisplayGenderPreferences] =
    useState(false);
  const toast = useToast();

  const onContinue = async () => {
    setHasErrors(false);

    if (selectedGenders.length === 0) {
      setHasErrors(true);
      return;
    }
    try {
      setIsLoading(true);
      const result = await updateGenderPreferences({
        variables: {
          genderPreferences: selectedGenders,
          displayGenderPreferences,
        },
      });

      if (result.errors || result.data?.updateGenderPreferences === undefined) {
        toast.show("", {
          type: "error",
        });
        Sentry.Native.captureException(result.errors);
        setIsLoading(false);
        return;
      }
      setIsLoading(false);
      router.push("/onboarding/user_connection_type");
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
          <GenderPreferencesSelection
            selectedGenders={selectedGenders}
            displayGenderPreferences={displayGenderPreferences}
            onSelectGenders={setSelectedGenders}
            onChangeDisplayGenderPreferences={setDisplayGenderPreferences}
            hasErrors={hasErrors}
          />
          <PrimaryButton
            title="Continue"
            disabled={selectedGenders.length === 0 || isLoading}
            isLoading={isLoading}
            onPress={onContinue}
          />
        </View>
      </>
    </ScreenLayout>
  );
};

export default UserGenderPreferences;
