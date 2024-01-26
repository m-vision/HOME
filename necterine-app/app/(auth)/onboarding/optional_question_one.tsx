import OptionalOnboardingQuestion from "../../../components/OptionalOnboardingQuestion";
import ScreenLayout from "../../../components/ScreenLayout";
import { ONBOARDING_QUESTIONNAIRE_QUESTION_ONE_ID } from "../../../utils/constants";
import { useRouter } from "expo-router";

const OptionalQuestionOne = () => {
  const router = useRouter();

  const nextStep = () => {
    router.push("/onboarding/optional_question_two");
  };

  return (
    <ScreenLayout>
      <OptionalOnboardingQuestion
        questionId={ONBOARDING_QUESTIONNAIRE_QUESTION_ONE_ID}
        onSuccessCallback={nextStep}
        primaryButtonLabel="Continue"
        secondaryButtonLabel="Skip this question"
        secondaryButtonAction={nextStep}
      />
    </ScreenLayout>
  );
};

export default OptionalQuestionOne;
