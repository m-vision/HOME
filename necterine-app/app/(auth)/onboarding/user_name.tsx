import { zodResolver } from "@hookform/resolvers/zod";
import PrimaryButton from "../../../components/Buttons/PrimaryButton";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../../../components/Form";
import TextInput from "../../../components/Inputs/TextInput";
import ScreenLayout from "../../../components/ScreenLayout";
import Text from "../../../components/Text";
import { useForm } from "react-hook-form";
import * as Sentry from "sentry-expo";
import * as zod from "zod";
import { useState } from "react";
import { View } from "react-native";
import { useToast } from "react-native-toast-notifications";
import { useRouter } from "expo-router";
import { useUpdateUserNameMutation } from "../../../graphql-types/src/graphql";

const UserName = () => {
  const router = useRouter();
  const [updateUserName] = useUpdateUserNameMutation();
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const FormSchema = zod.object({
    name: zod.string().min(1, "Enter your name"),
  });

  const form = useForm<zod.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
    },
  });

  const onContinue = async () => {
    await form.trigger();

    if (!form.formState.isValid) {
      return;
    }

    try {
      setIsLoading(true);
      const result = await updateUserName({
        variables: {
          name: form.getValues().name,
        },
      });

      if (result.errors || result.data?.updateUserName === undefined) {
        toast.show("", {
          type: "error",
        });
        Sentry.Native.captureException(result.errors);
        setIsLoading(false);
        return;
      }
      setIsLoading(false);
      router.push("/onboarding/user_birthday");
    } catch (error) {
      toast.show("", {
        type: "error",
      });
      Sentry.Native.captureException(error);
      setIsLoading(false);
    }
  };

  return (
    <ScreenLayout useSafeAreaView={false}>
      <>
        <View className="flex-1 mt-36">
          <Text className="text-2xl font-esbuild-semibold mb-2 text-darkPurple-600">
            First thing’s first. What do your friends call you?
          </Text>
          <Text className="text-base text-darkPurple-900 opacity-60 mb-6">
            This is shown on your profile to everyone.
          </Text>
          <Form {...form}>
            <FormField
              control={form.control}
              name="name"
              render={({ field, fieldState }) => {
                return (
                  <FormItem>
                    <FormControl>
                      <TextInput
                        onChangeText={(value) => field.onChange(value)}
                        value={field.value}
                        ref={field.ref}
                        autoCapitalize="words"
                        label="Full Name"
                        hasErrors={!!fieldState.error}
                        autoFocus
                      />
                    </FormControl>
                    <FormMessage>{fieldState.error?.message}</FormMessage>
                  </FormItem>
                );
              }}
            />
          </Form>
        </View>
        <View className={`flex-2 bg-lightPurple-50 justify-end pb-6`}>
          <Text className="text-base text-darkPurple-900 opacity-60 mb-4 text-center">
            Double check your spelling, because you can’t change this later.
          </Text>
          <PrimaryButton
            title="Continue"
            isLoading={isLoading}
            disabled={!form.formState.isValid || isLoading}
            onPress={() => onContinue()}
          />
        </View>
      </>
    </ScreenLayout>
  );
};

export default UserName;
