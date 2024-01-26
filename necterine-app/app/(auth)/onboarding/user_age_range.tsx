import ArrowBack from "../../../components/Buttons/ArrowBack";
import PrimaryButton from "../../../components/Buttons/PrimaryButton";
import RangeSlider from "../../../components/Inputs/RangeSlider";
import AgeRangeSelection from "../../../components/Profile/AgeRangeSelection";
import ScreenLayout from "../../../components/ScreenLayout";
import Text from "../../../components/Text";
import * as Sentry from "sentry-expo";
import { useState } from "react";
import { View } from "react-native";
import { useToast } from "react-native-toast-notifications";
import { useRouter } from "expo-router";
import { useUpdateAgeRangeMutation } from "../../../graphql-types/src/graphql";

const UserAgeRange = () => {
  const [ageRange, setAgeRange] = useState([25, 40]);
  const router = useRouter();
  const [updateAgeRange] = useUpdateAgeRangeMutation();
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const onContinue = async () => {
    try {
      setIsLoading(true);
      const result = await updateAgeRange({
        variables: {
          minAge: ageRange[0],
          maxAge: ageRange[1],
        },
      });

      if (result.errors || result.data?.updateAgeRange === undefined) {
        toast.show("", {
          type: "error",
        });
        Sentry.Native.captureException(result.errors);
        setIsLoading(false);
        return;
      }
      setIsLoading(false);
      router.push("/onboarding/user_photos");
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
          <AgeRangeSelection
            ageRange={ageRange as [number, number]}
            onChange={setAgeRange}
          />
        </View>
        <View className="flex-2 justify-end">
          <Text className="text-base text-darkPurple-900 opacity-60 mb-4 text-center">
            We will only show you people in this age range.
          </Text>
          <PrimaryButton
            title="Continue"
            onPress={onContinue}
            isLoading={isLoading}
            disabled={isLoading}
          />
        </View>
      </>
    </ScreenLayout>
  );
};

export default UserAgeRange;
