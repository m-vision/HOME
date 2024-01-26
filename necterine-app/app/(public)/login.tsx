import { useSignIn } from "@clerk/clerk-expo";
import { zodResolver } from "@hookform/resolvers/zod";
import NecterineImage from "../../assets/svg/necterine.svg";
import { OAuthButtons } from "../../components/Buttons/OAuthButtons";
import PrimaryButton from "../../components/Buttons/PrimaryButton";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../../components/Form";
import PasswordInput from "../../components/Inputs/PasswordInput";
import TextInput from "../../components/Inputs/TextInput";
import Text from "../../components/Text";
import { useForm } from "react-hook-form";
import * as Sentry from "sentry-expo";
import * as zod from "zod";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  View,
} from "react-native";
import { useToast } from "react-native-toast-notifications";
import { Link } from "expo-router";

const Login = () => {
  const { signIn, setActive, isLoaded } = useSignIn();
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const FormSchema = zod.object({
    email: zod.string().email("Enter your email"),
    password: zod.string().min(8, "Enter your password"),
  });

  const form = useForm<zod.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSignInPress = async () => {
    if (!isLoaded) {
      return;
    }

    await form.trigger();

    if (!form.formState.isValid) {
      return;
    }

    setLoading(true);

    try {
      const completeSignIn = await signIn.create({
        identifier: form.getValues("email"),
        password: form.getValues("password"),
      });

      // This indicates the user is signed in
      await setActive({ session: completeSignIn.createdSessionId });
    } catch (err: unknown) {
      toast.show("Incorrect email or password. Try again", {
        type: "error",
      });
      Sentry.Native.captureException(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <ScrollView
          className="flex-1 w-full"
          showsVerticalScrollIndicator={false}
        >
          <View className="items-center mt-6">
            <NecterineImage height={25} width={135} />
            <Text className="text-2xl text-darkPurple-600 font-esbuild-semibold mt-6">
              Welcome back
            </Text>
            <Text className="text-base font-normal mt-2 text-darkPurple-900 opacity-60">
              Log in to your Necterine account
            </Text>
          </View>
          <View className="w-full mt-6">
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
                          label="Email"
                          hasErrors={!!fieldState.error}
                        />
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
                    </FormControl>
                    <FormMessage>{fieldState.error?.message}</FormMessage>
                  </FormItem>
                )}
              />
            </Form>
            <View className="my-6 items-end">
              <Link href="/reset" suppressHighlighting>
                <Text className="text-left text-darkPurple-500 text-sm">
                  Forgot password?
                </Text>
              </Link>
            </View>
          </View>
          <PrimaryButton
            onPress={onSignInPress}
            disabled={loading || !form.formState.isValid}
            title="Login"
            isLoading={loading}
          />
          <View className="flex-row items-center justify-center my-8">
            <View className="flex-1 bg-black opacity-10 h-0.5" />
            <Text className="mx-2 text-black opacity-50">OR</Text>
            <View className="flex-1 bg-black opacity-10 h-0.5" />
          </View>
          <View className="items-center">
            <OAuthButtons />
          </View>
          <Text className="mt-14 text-base text-center">
            Don`t have an account?{" "}
            <Link href="/register">
              <Text className="underline text-darkPurple-500">
                Create account
              </Text>
            </Link>
          </Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Login;
