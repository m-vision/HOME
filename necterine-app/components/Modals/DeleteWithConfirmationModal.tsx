import PrimaryButton from "../Buttons/PrimaryButton";
import TextButton from "../Buttons/TextButton";
import CloseButtonModal from "./CloseButton";
import Text from "../Text";
import {
  Animated,
  KeyboardAvoidingView,
  Modal,
  Platform,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { useEffect, useRef } from "react";
import * as zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormMessage } from "../Form";
import TextInput from "../Inputs/TextInput";

export interface DeleteWithConfirmationModalProps {
  showModal: boolean;
  title: string;
  description: string;
  confirmationHint: string;
  isLoading: boolean;
  primaryButtonTitle: string;
  secondaryButtonTitle: string;
  expectedCode: string;
  inputLabel: string;
  inputErrorMsg: string;
  primaryButtonOnPress: () => void;
  secondaryButtonOnPress: () => void;
  closeModal: () => void;
}

const DeleteWithConfirmationModal = ({
  showModal,
  title,
  description,
  confirmationHint,
  isLoading,
  primaryButtonTitle,
  secondaryButtonTitle,
  expectedCode,
  inputLabel,
  inputErrorMsg,
  primaryButtonOnPress,
  secondaryButtonOnPress,
  closeModal,
}: DeleteWithConfirmationModalProps) => {
  const FormSchema = zod.object({
    code: zod
      .string()
      .min(1, inputErrorMsg)
      .refine((value) => {
        return value === expectedCode;
      }, inputErrorMsg),
  });

  const form = useForm<zod.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    mode: "onChange",
    defaultValues: {
      code: "",
    },
  });

  const fadeAnim = useRef(new Animated.Value(0)).current;

  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 0.5,
      duration: 2000,
      useNativeDriver: true,
    }).start();
  };

  const fadeOut = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const backgroundColorInterpolated = fadeAnim.interpolate({
    inputRange: [0, 0.5],
    outputRange: ["rgba(0,0,0,0)", "rgba(0,0,0,0.5)"],
  });

  useEffect(() => {
    if (showModal) {
      fadeIn();
    } else {
      fadeOut();
    }
  }, [showModal]);

  return (
    <Modal animationType="slide" transparent={true} visible={showModal}>
      <TouchableWithoutFeedback disabled={isLoading} onPress={closeModal}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1, justifyContent: "center" }}
        >
          <Animated.View
            className="flex-1 justify-end items-center"
            style={{ backgroundColor: backgroundColorInterpolated }}
          >
            <TouchableWithoutFeedback onPress={(e) => e.stopPropagation()}>
              <View className="bg-white py-6 w-full rounded-t-[16px] px-5">
                <View className="items-end mb-2">
                  <CloseButtonModal
                    closeModal={() => {
                      if (!isLoading) {
                        closeModal();
                      }
                    }}
                  />
                </View>
                <Text className="text-2xl font-esbuild-semibold text-darkPurple-600 mb-2">
                  {title}
                </Text>
                <Text className="text-base mb-6 text-darkPurple-900 opacity-60">
                  {description}
                </Text>
                <Text className="text-base mb-6 text-darkPurple-900 opacity-60">
                  {confirmationHint}
                </Text>
                <View className="mb-7">
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
                                label={inputLabel}
                                hasErrors={!!fieldState.error}
                              />
                            </FormControl>
                            <FormMessage>
                              {fieldState.error?.message}
                            </FormMessage>
                          </FormItem>
                        );
                      }}
                    />
                  </Form>
                </View>
                <View className="w-full items-center">
                  <PrimaryButton
                    classname="w-full mb-4"
                    title={primaryButtonTitle}
                    onPress={primaryButtonOnPress}
                    isLoading={isLoading}
                    disabled={!form.formState.isValid || isLoading}
                  />
                  <TextButton
                    title={secondaryButtonTitle}
                    onPress={() => {
                      if (!isLoading) {
                        secondaryButtonOnPress();
                      }
                    }}
                  />
                </View>
              </View>
            </TouchableWithoutFeedback>
          </Animated.View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default DeleteWithConfirmationModal;
