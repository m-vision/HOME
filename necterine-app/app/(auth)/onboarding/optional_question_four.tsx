import OptionalOnboardingQuestion from "../../../components/OptionalOnboardingQuestion";
import ScreenLayout from "../../../components/ScreenLayout";
import { ONBOARDING_QUESTIONNAIRE_QUESTION_FOUR_ID } from "../../../utils/constants";
import { useRouter } from "expo-router";

const OptionalQuestionFour = () => {
  const router = useRouter();

  const nextStep = () => {
    router.push("/onboarding/optional_question_five");
  };

  return (
    <ScreenLayout>
      <OptionalOnboardingQuestion
        questionId={ONBOARDING_QUESTIONNAIRE_QUESTION_FOUR_ID}
        onSuccessCallback={nextStep}
        primaryButtonLabel="Continue"
        secondaryButtonLabel="Skip this question"
        secondaryButtonAction={nextStep}
      />
    </ScreenLayout>
  );
};

export default OptionalQuestionFour;
