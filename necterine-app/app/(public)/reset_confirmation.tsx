import { useSignIn } from "@clerk/clerk-expo";
import { zodResolver } from "@hookform/resolvers/zod";
import ArrowBack from "../../components/Buttons/ArrowBack";
import PrimaryButton from "../../components/Buttons/PrimaryButton";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "../../components/Form";
import PasswordInput from "../../components/Inputs/PasswordInput";
import TextInput from "../../components/Inputs/TextInput";
import ScreenLayout from "../../components/ScreenLayout";
import Text from "../../components/Text";
import { useForm } from "react-hook-form";
import * as Sentry from "sentry-expo";
import * as zod from "zod";
import { useState } from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";
import { useToast } from "react-native-toast-notifications";
import { useLocalSearchParams, useRouter } from "expo-router";

const PwResetConfirmation = () => {
  const { signIn, setActive, isLoaded } = useSignIn();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const params = useLocalSearchParams();
  const { email = "" } = params;
  const toast = useToast();

  const FormSchema = zod.object({
    code: zod.string().min(6, "Enter the code"),
    password: zod.string().min(8, "Enter your password"),
  });

  const form = useForm<zod.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      code: "",
      password: "",
    },
  });

  const onReset = async () => {
    if (!isLoaded) {
      return;
    }

    await form.trigger();

    if (!form.formState.isValid) {
      return;
    }

    setLoading(true);

    try {
      const result = await signIn?.attemptFirstFactor({
        strategy: "reset_password_email_code",
        code: form.getValues("code"),
        password: form.getValues("password"),
      });

      toast.show("Password updated.", {
        type: "success",
      });

      // Set the user session active, which will log in the user automatically
      await setActive({ session: result.createdSessionId });
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
      await signIn.create({
        strategy: "reset_password_email_code",
        identifier: email as string,
      });
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
        <Text className="text-2xl font-esbuild-semibold mb-3 mt-8 text-darkPurple-600">
          Change password
        </Text>
        <Text className="text-base mb-6 text-darkPurple-900 opacity-60">
          Create your new password below.
        </Text>
        <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
          <Form {...form}>
            <FormField
              control={form.control}
              name="code"
              render={({ field, fieldState }) => {
                return (
                  <FormItem>
                    <FormControl>
                      <TextInput
                        onChangeText={(value) => field.onChange(value)}
                        value={field.value}
                        ref={field.ref}
                        autoCapitalize="none"
                        label="Enter code"
                        hasErrors={!!fieldState.error}
                      />
                      <FormDescription>
                        <Text>
                          We sent a code to your email. Enter that code to
                          confirm your account
                        </Text>
                      </FormDescription>
                    </FormControl>
                    <FormMessage>{fieldState.error?.message}</FormMessage>
                  </FormItem>
                );
              }}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field, fieldState }) => (
                <FormItem className="mt-2">
                  <FormControl>
                    <PasswordInput
                      onChangeText={(value) => field.onChange(value)}
                      value={field.value}
                      ref={field.ref}
                      label="Password"
                      hasErrors={!!fieldState.error}
                    />
                    <FormDescription>
                      <Text>Password must have a minimum of 8 characters </Text>
                    </FormDescription>
                  </FormControl>
                  <FormMessage>{fieldState.error?.message}</FormMessage>
                </FormItem>
              )}
            />
          </Form>
        </ScrollView>
        <View className="flex-2 justify-end pt-4 bg-lightPurple-50 opacity-100">
          <PrimaryButton
            isLoading={loading}
            disabled={loading || !form.formState.isValid}
            onPress={onReset}
            title="Change Password"
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

export default PwResetConfirmation;
