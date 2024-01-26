import { useSignUp } from "@clerk/clerk-expo";
import { zodResolver } from "@hookform/resolvers/zod";
import NecterineImage from "../../assets/svg/necterine.svg";
import { OAuthButtons } from "../../components/Buttons/OAuthButtons";
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
import Text from "../../components/Text";
import { useForm } from "react-hook-form";
import * as Sentry from "sentry-expo";
import * as zod from "zod";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  View,
} from "react-native";
import { useToast } from "react-native-toast-notifications";
import { Link, useRouter } from "expo-router";

const Register = () => {
  const { isLoaded, signUp } = useSignUp();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
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

  // Create the user and send the verification email
  const onSignUpPress = async () => {
    if (!isLoaded) {
      return;
    }

    await form.trigger();

    if (!form.formState.isValid) {
      return;
    }

    setLoading(true);

    try {
      // Create the user on Clerk
      await signUp.create({
        emailAddress: form.getValues("email"),
        password: form.getValues("password"),
      });

      // Send verification Email
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      // Navigate to the verification screen
      router.push("/email_confirmation");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      switch (err?.errors[0].code) {
        case "form_identifier_exists":
          toast.show("The Email is already in use, try to login.", {
            type: "error",
          });
          break;
        case "form_password_pwned":
          toast.show("Please use a different password.", {
            type: "error",
          });
          break;
        default:
          toast.show("", {
            type: "error",
          });
          break;
      }
      Sentry.Native.captureException(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 justify-center p-5">
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
            <Text className="text-base text-purple-900 mt-3 opacity-60">
              Set up your account
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
                      <FormDescription>
                        <Text>
                          Password must have a minimum of 8 characters{" "}
                        </Text>
                      </FormDescription>
                    </FormControl>
                    <FormMessage>{fieldState.error?.message}</FormMessage>
                  </FormItem>
                )}
              />
            </Form>
          </View>
          <PrimaryButton
            onPress={onSignUpPress}
            title="Sign Up"
            isLoading={loading}
            disabled={!form.formState.isValid || loading}
            classname="mt-6"
          />
          <View className="flex-row items-center justify-center my-8">
            <View className="flex-1 bg-black opacity-10 h-0.5" />
            <Text className="mx-2 text-black opacity-50">OR</Text>
            <View className="flex-1 bg-black opacity-10 h-0.5" />
          </View>
          <View className="items-center">
            <OAuthButtons />
          </View>
          <Text className="mt-14 text-base text-center text-darkPurple-900">
            Already have an account?{" "}
            <Link href="/login" suppressHighlighting>
              <Text className="underline text-darkPurple-500">Sign in</Text>
            </Link>
          </Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Register;
