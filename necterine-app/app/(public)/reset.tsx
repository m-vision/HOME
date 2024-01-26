import { useSignIn } from "@clerk/clerk-expo";
import { zodResolver } from "@hookform/resolvers/zod";
import ArrowBack from "../../components/Buttons/ArrowBack";
import PrimaryButton from "../../components/Buttons/PrimaryButton";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../../components/Form";
import TextInput from "../../components/Inputs/TextInput";
import ScreenLayout from "../../components/ScreenLayout";
import Text from "../../components/Text";
import { useForm } from "react-hook-form";
import * as Sentry from "sentry-expo";
import * as zod from "zod";
import React, { useState } from "react";
import { View } from "react-native";
import { useToast } from "react-native-toast-notifications";
import { useRouter } from "expo-router";

const PwReset = () => {
  const { signIn, isLoaded } = useSignIn();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const toast = useToast();

  const FormSchema = zod.object({
    email: zod.string().email("Enter your email"),
  });

  const form = useForm<zod.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
    },
  });

  // Request a passowrd reset code by email
  const onRequestReset = async () => {
    if (!isLoaded) {
      return;
    }

    await form.trigger();

    if (!form.formState.isValid) {
      return;
    }

    setLoading(true);

    try {
      await signIn.create({
        strategy: "reset_password_email_code",
        identifier: form.getValues("email"),
      });

      router.push({
        pathname: "/reset_confirmation",
        params: { email: form.getValues("email") },
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
        <Text className="mt-8 mb-3 text-3xl">🔑</Text>
        <Text className="text-2xl font-esbuild-semibold mb-3 text-darkPurple-600">
          Reset your password
        </Text>
        <Text className="text-base mb-6 text-darkPurple-900 opacity-60">
          We’ll send you a verification code for you to enter before creating a
          new password
        </Text>
        <Form {...form}>
          <FormField
            control={form.control}
            name="email"
            render={({ field, fieldState }) => {
              return (
                <FormItem>
                  <FormControl>
                    <TextInput
                      onChangeText={(value) => field.onChange(value)}
                      value={field.value}
                      ref={field.ref}
                      autoCapitalize="none"
                      label="Email Address"
                      hasErrors={!!fieldState.error}
                    />
                  </FormControl>
                  <FormMessage>{fieldState.error?.message}</FormMessage>
                </FormItem>
              );
            }}
          />
        </Form>
        <View className="flex-1 justify-end">
          <PrimaryButton
            isLoading={loading}
            disabled={loading || !form.formState.isValid}
            onPress={onRequestReset}
            title="Send verification code"
          />
        </View>
      </View>
    </ScreenLayout>
  );
};

export default PwReset;
