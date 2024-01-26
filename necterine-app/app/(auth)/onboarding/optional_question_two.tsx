import OptionalOnboardingQuestion from "../../../components/OptionalOnboardingQuestion";
import ScreenLayout from "../../../components/ScreenLayout";
import { ONBOARDING_QUESTIONNAIRE_QUESTION_TWO_ID } from "../../../utils/constants";
import { useRouter } from "expo-router";

const OptionalQuestionTwo = () => {
  const router = useRouter();

  const nextStep = () => {
    router.push("/onboarding/optional_question_three");
  };

  return (
    <ScreenLayout>
      <OptionalOnboardingQuestion
        questionId={ONBOARDING_QUESTIONNAIRE_QUESTION_TWO_ID}
        onSuccessCallback={nextStep}
        primaryButtonLabel="Continue"
        secondaryButtonLabel="Skip this question"
        secondaryButtonAction={nextStep}
      />
    </ScreenLayout>
  );
};

export default OptionalQuestionTwo;
