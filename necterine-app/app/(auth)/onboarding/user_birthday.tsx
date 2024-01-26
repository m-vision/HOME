import { zodResolver } from "@hookform/resolvers/zod";
import ArrowBack from "../../../components/Buttons/ArrowBack";
import PrimaryButton from "../../../components/Buttons/PrimaryButton";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
} from "../../../components/Form";
import TextInput from "../../../components/Inputs/TextInput";
import ConfirmationModal from "../../../components/Modals/ConfirmationModal";
import ScreenLayout from "../../../components/ScreenLayout";
import Text from "../../../components/Text";
import { useForm } from "react-hook-form";
import * as Sentry from "sentry-expo";
import * as zod from "zod";
import { useState } from "react";
import { View } from "react-native";
import { useToast } from "react-native-toast-notifications";
import { useRouter } from "expo-router";
import { useUpdateDateOfBirthMutation } from "../../../graphql-types/src/graphql";

const UserBirthday = () => {
  const [showModal, setShowModal] = useState(false);
  const [userAge, setUserAge] = useState(0);
  const router = useRouter();
  const [updateUserDateOfBirth] = useUpdateDateOfBirthMutation();
  const [isLoading, setIsLoading] = useState(false);
  const [underAgeError, setUnderAgeError] = useState(false);
  const toast = useToast();

  const FormSchema = zod
    .object({
      day: zod
        .number()
        .min(1, "Enter a valid day")
        .max(31, "Day cannot exceed 31"),
      month: zod
        .number()
        .min(1, "Enter a valid month")
        .max(12, "Month cannot exceed 12"),
      year: zod
        .number()
        .min(1900, "Enter a valid year")
        .max(new Date().getFullYear(), "Future year not allowed"),
    })
    .refine(
      (data) => {
        const { day, month, year } = data;
        if (!day || !month || !year) return false;

        const date = new Date(year, month - 1, day); // month is 0-indexed
        return (
          date &&
          date.getDate() === day &&
          date.getMonth() === month - 1 &&
          date.getFullYear() === year
        );
      },
      {
        message: "Enter a valid date",
      }
    )
    .refine(
      (data) => {
        const { day, month, year } = data;
        const today = new Date();
        const eighteenYearsAgo = new Date(
          today.getFullYear() - 18,
          today.getMonth(),
          today.getDate()
        );

        const inputDate = new Date(year, month - 1, day);
        setUnderAgeError(inputDate > eighteenYearsAgo);

        return inputDate <= eighteenYearsAgo;
      },
      {
        message: "You must be +18",
      }
    );

  const form = useForm<zod.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    mode: "onChange",
    defaultValues: {
      day: undefined,
      month: undefined,
      year: undefined,
    },
  });

  const onContinue = async () => {
    await form.trigger();

    if (!form.formState.isValid) {
      return;
    }

    setShowModal(true);
    setUserAge(new Date().getFullYear() - form.getValues("year"));
  };

  const onConfirmation = async () => {
    try {
      setIsLoading(true);
      setShowModal(false);

      if (userAge < 18) {
        setUnderAgeError(true);
        setIsLoading(false);
        return;
      }

      const dateOfBirth = new Date(
        form.getValues("year"),
        form.getValues("month") - 1,
        form.getValues("day")
      );

      const result = await updateUserDateOfBirth({
        variables: {
          dateOfBirth: dateOfBirth,
        },
      });

      if (result.errors || result.data?.updateDateOfBirth === undefined) {
        toast.show("", {
          type: "error",
        });
        Sentry.Native.captureException(result.errors);
        setIsLoading(false);
        return;
      }
      setIsLoading(false);
      router.push("/onboarding/user_gender");
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
        <ConfirmationModal
          isLoading={isLoading}
          closeModal={() => setShowModal(false)}
          showModal={showModal}
          title={`Are you ${userAge} years old?`}
          description="Make sure the date entered is correct, you won’t be able to change this later."
          primaryButtonTitle="Confirm"
          secondaryButtonTitle="Edit"
          primaryButtonOnPress={onConfirmation}
          secondaryButtonOnPress={() => setShowModal(false)}
        />
        <View className="flex-1 mt-14">
          <View className="my-8">
            <ArrowBack onBack={() => router.back()} />
          </View>
          <Text className="text-2xl font-esbuild-semibold mb-2 text-darkPurple-600">
            When’s your birthday?
          </Text>
          <Text className="text-sm text-darkPurple-900 opacity-60 mb-6">
            We won’t show the actual date on your profile, just your age.
          </Text>
          <Form {...form}>
            <View className="flex-row">
              <View className="flex-1 mr-4">
                <FormField
                  control={form.control}
                  name="day"
                  render={({ field, fieldState }) => {
                    return (
                      <FormItem>
                        <FormControl>
                          <TextInput
                            onChangeText={(value) =>
                              field.onChange(
                                value ? parseInt(value) : undefined
                              )
                            }
                            value={field.value?.toString() || ""}
                            ref={field.ref}
                            keyboardType="numeric"
                            returnKeyType="done"
                            label="Day"
                            hasErrors={!!fieldState.error}
                            autoFocus
                          />
                        </FormControl>
                      </FormItem>
                    );
                  }}
                />
              </View>
              <View className="flex-1 mr-4">
                <FormField
                  control={form.control}
                  name="month"
                  render={({ field, fieldState }) => {
                    return (
                      <FormItem>
                        <FormControl>
                          <TextInput
                            onChangeText={(value) =>
                              field.onChange(
                                value ? parseInt(value) : undefined
                              )
                            }
                            value={field.value?.toString() || ""}
                            ref={field.ref}
                            label="Month"
                            keyboardType="numeric"
                            returnKeyType="done"
                            hasErrors={!!fieldState.error}
                          />
                        </FormControl>
                      </FormItem>
                    );
                  }}
                />
              </View>
              <View className="flex-1">
                <FormField
                  control={form.control}
                  name="year"
                  render={({ field, fieldState }) => {
                    return (
                      <FormItem>
                        <FormControl>
                          <TextInput
                            onChangeText={(value) =>
                              field.onChange(
                                value ? parseInt(value) : undefined
                              )
                            }
                            value={field.value?.toString() || ""}
                            ref={field.ref}
                            keyboardType="numeric"
                            label="Year"
                            returnKeyType="done"
                            hasErrors={!!fieldState.error}
                          />
                        </FormControl>
                      </FormItem>
                    );
                  }}
                />
              </View>
            </View>
            {underAgeError &&
              Object.keys(form.formState.errors).length === 0 && (
                <Text className="p-1 text-error-500">You must be +18</Text>
              )}
            {!underAgeError &&
              Object.keys(form.formState.errors).length > 0 && (
                <Text className="p-1 text-error-500">
                  {form.formState.errors.day?.message ||
                    form.formState.errors.month?.message ||
                    form.formState.errors.year?.message}
                </Text>
              )}
          </Form>
        </View>
        <View className="flex-2 justify-end pb-6">
          <Text className="text-base text-darkPurple-900 opacity-60 mb-4 text-center">
            Keep in mind, you won’t be able to change this later.
          </Text>
          <PrimaryButton
            title="Continue"
            disabled={!form.formState.isValid || isLoading}
            isLoading={isLoading}
            onPress={() => onContinue()}
          />
        </View>
      </>
    </ScreenLayout>
  );
};

export default UserBirthday;
