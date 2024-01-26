import { SafeAreaView, TextInput, TouchableOpacity, View } from "react-native";
import Text from "../../../components/Text";
import PrimaryButton from "../../../components/Buttons/PrimaryButton";
import { Ionicons } from "@expo/vector-icons";
import theme from "../../../utils/theme";
import * as Clipboard from "expo-clipboard";
import { useToast } from "react-native-toast-notifications";
import * as MailComposer from "expo-mail-composer";
import { openComposer } from "react-native-email-link";
import * as Sentry from "sentry-expo";

const SendComment = () => {
  const toast = useToast();

  const copyToClipboard = async () => {
    await Clipboard.setStringAsync("support@necterine.com");
    toast.show("Email copied to clipboard", {
      type: "success",
      style: {
        bottom: 70,
      },
    });
  };

  const onSendEmail = async () => {
    try {
      await MailComposer.composeAsync({
        recipients: ["support@necterine.com"],
        subject: "Necterine App - Support",
        body: "Hi, I need help with Necterine App.",
      });
    } catch (error) {
      try {
        await openComposer({
          to: "support@necterine.com",
          subject: "Necterine App - Support",
          body: "Hi, I need help with Necterine App.",
        });
      } catch (error) {
        Sentry.Native.captureException(error);
      }
    }
  };

  return (
    <SafeAreaView className="bg-lightPurple-50 flex-1">
      <View className="flex-1 justify-between px-4 pt-4">
        <View>
          <Text className="text-darkPurple-900 text-[18px] font-esbuild-semibold">
            How can we help?
          </Text>
          <Text className="text-darkPurple-900 text-base opacity-60 mt-6">
            We're here to answer any questions about Necterine.
          </Text>
          <Text className="text-darkPurple-900 text-base opacity-60 mt-6">
            If you want to contact us directly, you can send us an email using
            the email below.
          </Text>
          <View className="flex-row items-center mt-6 bg-white rounded-lg border border-gray-300 h-14">
            <TextInput
              className="flex-1 text-darkPurple-900 font-esbuild-regular p-5"
              value="support@necterine.com"
              editable={false}
              selectTextOnFocus={false}
            />
            <TouchableOpacity onPress={copyToClipboard}>
              <View className="bg-lightPurple-50 px-4 flex-row items-center h-full">
                <Ionicons
                  name="copy-outline"
                  size={24}
                  color={theme.extend.colors.darkPurple[900]}
                />
                <Text className="pl-2">Copy</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <View>
          <PrimaryButton title="Send an Email" onPress={onSendEmail} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SendComment;
