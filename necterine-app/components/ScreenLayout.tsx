import { cn } from "../utils/helpers";
import React, { createContext, useContext, useEffect, useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  KeyboardAvoidingViewProps,
  Platform,
  SafeAreaView,
  TouchableWithoutFeedback,
  View,
} from "react-native";

// TODO: review why is not working. Even thouht the context is created, the value is
// not being updated in the child components
const KeyboardVisibilityContext = createContext(false);

export const useKeyboardVisibility = () => {
  return useContext(KeyboardVisibilityContext);
};

export interface ScreenLayourProps extends KeyboardAvoidingViewProps {
  useSafeAreaView?: boolean;
}

const ScreenLayout = ({
  children,
  useSafeAreaView = true,
  className,
  ...props
}: ScreenLayourProps) => {
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setKeyboardVisible(true);
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardVisible(false);
      },
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  return (
    <KeyboardVisibilityContext.Provider value={isKeyboardVisible}>
      {useSafeAreaView ? (
        <SafeAreaView className="flex-1">
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            className={cn("flex-1", className)}
            {...props}
          >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              {children}
            </TouchableWithoutFeedback>
          </KeyboardAvoidingView>
        </SafeAreaView>
      ) : (
        <View className="flex-1">
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            className={cn("flex-1", className)}
            {...props}
          >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              {children}
            </TouchableWithoutFeedback>
          </KeyboardAvoidingView>
        </View>
      )}
    </KeyboardVisibilityContext.Provider>
  );
};

export default ScreenLayout;
