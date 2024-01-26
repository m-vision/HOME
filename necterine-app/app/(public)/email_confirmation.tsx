import { useSignUp } from "@clerk/clerk-expo";
import ArrowBack from "../../components/Buttons/ArrowBack";
import PrimaryButton from "../../components/Buttons/PrimaryButton";
import TextInput from "../../components/Inputs/TextInput";
import ScreenLayout from "../../components/ScreenLayout";
import Text from "../../components/Text";
import * as Sentry from "sentry-expo";
import { useState } from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";
import { useToast } from "react-native-toast-notifications";
import { useRouter } from "expo-router";

const EmailConfirmation = () => {
  const { isLoaded, signUp, setActive } = useSignUp();
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const toast = useToast();

  const onPressVerify = async () => {
    if (!isLoaded) {
      return;
    }
    setLoading(true);

    try {
      // Verify the email address
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });

      // This indicates the user is signed in
      await setActive({ session: completeSignUp.createdSessionId });
    } catch (err: unknown) {
      toast.show("", {
        type: "error",
      });
      Sentry.Native.captureException(err);
    } finally {
      setLoading(false);
    }
  };

  const onPressResend = async () => {
    if (!isLoaded) {
      return;
    }
    setLoading(true);

    try {
      // Resend the verification email
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
    } catch (err: unknown) {
      toast.show("", {
        type: "error",
      });
      Sentry.Native.captureException(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScreenLayout>
      <View className="py-5 flex-1">
        <ArrowBack onBack={() => router.back()} />
        <Text className="text-3xl mt-8 mb-3">📥</Text>
        <Text className="text-3xl font-esbuild-semibold mb-3 text-darkPurple-600">
          Confirm your Email
        </Text>
        <Text className="text-base mb-6 text-darkPurple-900 opacity-60">
          We sent a code to your email. Enter that code to confirm your account.
        </Text>
        <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
          <View>
            <TextInput
              value={code}
              label="Code"
              onChangeText={setCode}
              hasErrors={false}
            />
          </View>
        </ScrollView>
        <View className="flex-2 bg-lightPurple-50 justify-end">
          <PrimaryButton
            isLoading={loading}
            disabled={loading || !code || code.length < 6}
            onPress={onPressVerify}
            title="Submit Code"
          />
          <Text className="mt-4 text-base text-center text-darkPurple-900">
            Didn’t receive the code?{" "}
            <TouchableOpacity onPress={onPressResend}>
              <Text className="underline text-darkPurple-500">
                Send code again
              </Text>
            </TouchableOpacity>
          </Text>
        </View>
      </View>
    </ScreenLayout>
  );
};

export default EmailConfirmation;
