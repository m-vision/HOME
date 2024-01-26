import ArrowBack from "../../../components/Buttons/ArrowBack";
import PrimaryButton from "../../../components/Buttons/PrimaryButton";
import TextButton from "../../../components/Buttons/TextButton";
import IconContainer from "../../../components/IconContainer";
import ScreenLayout from "../../../components/ScreenLayout";
import Text from "../../../components/Text";
import { View } from "react-native";
import { useRouter } from "expo-router";
import { useSetOnboardingCompletedMutation } from "../../../graphql-types/src/graphql";

const items = [
  {
    title: "Necterine is all about meaningful connections",
    description:
      "Sharing a bit more about yourself can lead to even more meaningful matches.",
    icon: "💞",
  },
  {
    title: "This is the chance to express your unique self.",
    description:
      "We'd love to ask you some optional questions to get a better understanding of who you are so we select the right person for you.",
    icon: "🗣️",
  },
];

const OptionalOnboardingStart = () => {
  const router = useRouter();
  const [setOnboardingCompleted] = useSetOnboardingCompletedMutation();

  const onSkip = async () => {
    await setOnboardingCompleted();
    router.push("/home");
  };

  return (
    <ScreenLayout>
      <>
        <View className="flex-1">
          <View className="my-8">
            <ArrowBack onBack={() => router.back()} />
          </View>
          <Text className="text-3xl font-esbuild-semibold text-darkPurple-600 mb-6">
            Deepen Your Connection
          </Text>
          {items.map((item, index) => (
            <View className="mb-4 flex-row" key={index}>
              <IconContainer icon={item.icon} />
              <View className="flex-1">
                <Text className="text-[18px] font-esbuild-semibold text-darkPurple-600 mb-1">
                  {item.title}
                </Text>
                <Text className="text-base text-lightPurple-800">
                  {item.description}
                </Text>
              </View>
            </View>
          ))}
          <Text className="text-base mt-2 mb-8 text-lightPurple-800">
            Feel free to skip this for now if you prefer. You can always answer
            these questions later. Ready to dive in, or would you like to skip?
          </Text>
        </View>
        <View className="flex-1 justify-end items-center">
          <PrimaryButton
            title="Let's do this"
            onPress={() => router.push("/onboarding/optional_question_one")}
            className="mb-4"
          />
          <TextButton
            title="I’ll do it later"
            onPress={() => onSkip()}
            classname="text-darkPurple-500"
          />
        </View>
      </>
    </ScreenLayout>
  );
};

export default OptionalOnboardingStart;
