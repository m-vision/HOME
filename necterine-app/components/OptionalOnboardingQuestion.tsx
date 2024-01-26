import ArrowBack from "./Buttons/ArrowBack";
import TextButton from "./Buttons/TextButton";
import PrimaryButton from "./Buttons/PrimaryButton";
import RadioButton from "./Inputs/RadioButton";
import ScreenLoader from "./Loaders/ScreenLoader";
import Text from "./Text";
import * as Sentry from "sentry-expo";
import { useState } from "react";
import { ScrollView, View } from "react-native";
import { useToast } from "react-native-toast-notifications";
import { useRouter } from "expo-router";
import {
  useGetQuestionnaireQuestionQuery,
  useUpdateQuestionnaireAnswerMutation,
} from "../graphql-types/src/graphql";

interface OptionalOnboardingQuestionProps {
  onSuccessCallback: () => void;
  questionId: string;
  selectedAnswerId?: string;
  primaryButtonLabel: string;
  secondaryButtonLabel?: string;
  secondaryButtonAction?: () => void;
  hideBackButton?: boolean;
}

const OptionalOnboardingQuestion = ({
  onSuccessCallback,
  questionId,
  selectedAnswerId,
  primaryButtonLabel,
  secondaryButtonLabel,
  secondaryButtonAction,
  hideBackButton,
}: OptionalOnboardingQuestionProps) => {
  const router = useRouter();
  const [selectedAnswer, setSelectedAnswer] = useState<string>(
    selectedAnswerId || ""
  );

  const { data, loading, error } = useGetQuestionnaireQuestionQuery({
    variables: {
      questionnaireQuestionId: questionId,
    },
  });
  const [updateQuestionnaireAnswer] = useUpdateQuestionnaireAnswerMutation();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const toast = useToast();

  const onContinue = async () => {
    try {
      setIsLoading(true);
      const result = await updateQuestionnaireAnswer({
        variables: {
          questionnaireAnswerId: selectedAnswer,
        },
      });

      if (result.errors) {
        toast.show("", {
          type: "error",
        });
        Sentry.Native.captureException(result.errors);
        setIsLoading(false);
        return;
      }
      setIsLoading(false);
      onSuccessCallback();
    } catch (error) {
      toast.show("", {
        type: "error",
      });
      Sentry.Native.captureException(error);
      setIsLoading(false);
    }
  };

  if (loading) {
    return <ScreenLoader />;
  }

  if (error) {
    Sentry.Native.captureException(error);
    toast.show("", {
      type: "error",
    });
    router.back();
  }

  return (
    <>
      <View className="flex-1">
        {!hideBackButton && (
          <View className="my-8">
            <ArrowBack onBack={() => router.back()} />
          </View>
        )}
        <Text className="text-2xl font-esbuild-semibold mb-2 text-darkPurple-600">
          {data?.getQuestionnaireQuestion.title}
        </Text>
        <ScrollView className="mt-6" showsVerticalScrollIndicator={false}>
          {(data?.getQuestionnaireQuestion.questionnaireAnswers ?? []).map(
            (answer) => (
              <RadioButton
                key={answer.id}
                label={answer.title}
                value={answer.id}
                checked={selectedAnswer === answer.id}
                onChange={() => setSelectedAnswer(answer.id)}
              />
            )
          )}
        </ScrollView>
      </View>
      <View className="flex-2 justify-end pt-6 items-center">
        <PrimaryButton
          title={primaryButtonLabel}
          onPress={onContinue}
          disabled={selectedAnswer === "" || isLoading}
          isLoading={isLoading}
          className="mb-4"
        />
        {secondaryButtonLabel && (
          <TextButton
            title={secondaryButtonLabel}
            onPress={secondaryButtonAction}
          />
        )}
      </View>
    </>
  );
};

export default OptionalOnboardingQuestion;
