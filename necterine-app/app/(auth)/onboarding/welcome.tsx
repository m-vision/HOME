import PrimaryButton from "../../../components/Buttons/PrimaryButton";
import IconContainer from "../../../components/IconContainer";
import ScreenLayout from "../../../components/ScreenLayout";
import Text from "../../../components/Text";
import { View } from "react-native";
import { useRouter } from "expo-router";
import { ScrollView } from "react-native-gesture-handler";

const items = [
  {
    title: "Keep It Real",
    description:
      "Leading with authenticity helps connect you with others who vibe with the real, amazing person that you are.",
    icon: "🧑‍🎤",
  },
  {
    title: "Relish the Ride",
    description:
      "There’s no rush. Take things at your pace, and let connections bloom in their own time, in their own way.",
    extraParagraph:
      "Trees that are slow to grow bear the best fruit. Let your connections bloom in their own time.",
    icon: "🫶🏽",
  },
  {
    title: "Your Secrets Are Safe",
    description:
      "Dating apps can be a vulnerable place. Know that your privacy is sacred to us. Trust that we’re keeping your data secure, and committed to respecting your personal information.",
    icon: "🔒",
  },
  {
    title: "Stay Open",
    description:
      "Incredible folks are just a tap away, waiting to connect with someone just like you. Open your heart to possibility—you never know what beautiful things await.",
    extraParagraph:
      "Ready to take the first step towards finding—and keeping—healthy, lasting love? Let’s get started.",
    icon: "🧡",
  },
];

const Welcome = () => {
  const router = useRouter();

  return (
    <ScreenLayout>
      <>
        <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
          <View className="flex-1">
            <Text className="text-3xl font-esbuild-semibold mt-8 text-darkPurple-600">
              Hi there,
            </Text>
            <Text className="text-3xl font-esbuild-semibold text-darkPurple-600">
              We’re Necterine, and we’re so glad you found us.
            </Text>
            <Text className="text-base mt-2 text-lightPurple-800">
              Here, authenticity reigns and meaningful connections are the norm.
            </Text>
            <Text className="text-base mt-2 text-lightPurple-800">
              We’re here to provide you tools and support as you navigate your
              unique relationship journey, encouraging self-awareness, fostering
              curiosity, and helping you weather the challenges (and celebrate
              the triumphs!) that come with dating in the digital age.
            </Text>
            <Text className="text-base mt-2 mb-8 text-lightPurple-800">
              A few things to keep in mind before we dive in:
            </Text>
            {items.map((item, index) => (
              <View className="mb-4 flex-row" key={index}>
                <IconContainer icon={item.icon} />
                <View className="flex-1">
                  <Text className="text-[18px] font-esbuild-semibold text-darkPurple-600">
                    {item.title}
                  </Text>
                  <Text className="text-base text-lightPurple-800">
                    {item.description}
                  </Text>
                  {item.extraParagraph && (
                    <Text className="text-base text-lightPurple-800 mt-2">
                      {item.extraParagraph}
                    </Text>
                  )}
                </View>
              </View>
            ))}
          </View>
        </ScrollView>
        <View className="py-4">
          <PrimaryButton
            title="Continue"
            onPress={() => router.replace("/onboarding/user_name")}
          />
        </View>
      </>
    </ScreenLayout>
  );
};

export default Welcome;
