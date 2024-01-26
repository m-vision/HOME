import OptionalOnboardingQuestion from "../../../components/OptionalOnboardingQuestion";
import ScreenLayout from "../../../components/ScreenLayout";
import { ONBOARDING_QUESTIONNAIRE_QUESTION_SIX_ID } from "../../../utils/constants";
import * as Sentry from "sentry-expo";
import { useToast } from "react-native-toast-notifications";
import { useRouter } from "expo-router";
import { useSetOnboardingCompletedMutation } from "../../../graphql-types/src/graphql";

const OptionalQuestionSix = () => {
  const router = useRouter();
  const [setOnboardingCompleted] = useSetOnboardingCompletedMutation();
  const toast = useToast();

  const onFinish = async () => {
    try {
      const result = await setOnboardingCompleted();

      if (result.errors) {
        toast.show("", {
          type: "error",
        });
        Sentry.Native.captureException(result.errors);
        return;
      }
      router.push("/home");
    } catch (error) {
      toast.show("", {
        type: "error",
      });
      Sentry.Native.captureException(error);
    }
  };

  return (
    <ScreenLayout>
      <OptionalOnboardingQuestion
        questionId={ONBOARDING_QUESTIONNAIRE_QUESTION_SIX_ID}
        onSuccessCallback={onFinish}
        primaryButtonLabel="Continue"
        secondaryButtonLabel="Skip this question"
        secondaryButtonAction={onFinish}
      />
    </ScreenLayout>
  );
};

export default OptionalQuestionSix;
