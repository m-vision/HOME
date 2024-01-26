import ArrowBack from "../../../components/Buttons/ArrowBack";
import PrimaryButton from "../../../components/Buttons/PrimaryButton";
import PronounsSelection from "../../../components/Profile/PronounsSelection";
import ScreenLayout from "../../../components/ScreenLayout";
import * as Sentry from "sentry-expo";
import { useState } from "react";
import { View } from "react-native";
import { useToast } from "react-native-toast-notifications";
import { useRouter } from "expo-router";
import {
  Pronoun,
  useUpdatePronounsMutation,
} from "../../../graphql-types/src/graphql";

const UserSexualOrientation = () => {
  const [selectedPronouns, setSelectedPronouns] = useState<Pronoun[]>([]);
  const [displayPronouns, setDisplayPronouns] = useState(false);
  const router = useRouter();
  const [updatePronouns] = useUpdatePronounsMutation();
  const [hasErrors, setHasErrors] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const onContinue = async () => {
    setHasErrors(false);

    if (selectedPronouns.length === 0) {
      setHasErrors(true);
      return;
    }
    try {
      setIsLoading(true);
      const result = await updatePronouns({
        variables: {
          pronouns: selectedPronouns,
          displayPronouns,
        },
      });

      if (result.errors || result.data?.updatePronouns === undefined) {
        toast.show("", {
          type: "error",
        });
        Sentry.Native.captureException(result.errors);
        setIsLoading(false);
        return;
      }
      setIsLoading(false);
      router.push("/onboarding/user_gender_preferences");
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
          <PronounsSelection
            selectedPronouns={selectedPronouns}
            displayPronouns={displayPronouns}
            onSelectPronouns={setSelectedPronouns}
            onChangeDisplayPronouns={setDisplayPronouns}
            hasErrors={hasErrors}
          />
          <PrimaryButton
            title="Continue"
            disabled={selectedPronouns.length === 0 || isLoading}
            isLoading={isLoading}
            onPress={onContinue}
          />
        </View>
      </>
    </ScreenLayout>
  );
};

export default UserSexualOrientation;
