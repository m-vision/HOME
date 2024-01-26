import theme from "../../utils/theme";
import React, { forwardRef, useState } from "react";
import type {
  TextInput as RNTextInput,
  TextInputProps as RNTextInputProps,
} from "react-native";
import { FloatingLabelInput } from "react-native-floating-label-input";

interface TextInputProps extends RNTextInputProps {
  label?: string;
  hasErrors?: boolean;
}

const TextInput = forwardRef<RNTextInput, TextInputProps>(
  ({ label = "", hasErrors = false, ...props }, ref) => {
    const [isFocused, setIsFocused] = useState(false);

    return (
      <FloatingLabelInput
        label={label}
        ref={ref}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        isFocused={isFocused}
        inputStyles={{
          color: theme.extend.colors.darkPurple[900],
          height: 55,
        }}
        containerStyles={{
          borderWidth: 1,
          height: 55,
          borderRadius: 12,
          paddingHorizontal: 10,
          paddingTop: 10,
          backgroundColor: "#FFFFFF",
          borderColor: hasErrors
            ? theme.extend.colors.error[500]
            : isFocused
            ? theme.extend.colors.darkPurple[500]
            : "#F0F0F0",
        }}
        customLabelStyles={{
          colorBlurred: hasErrors
            ? theme.extend.colors.error[500]
            : theme.extend.colors.darkPurple[900],
          colorFocused: hasErrors
            ? theme.extend.colors.error[500]
            : theme.extend.colors.darkPurple[500],
          fontSizeFocused: 14,
          fontSizeBlurred: 14,
        }}
        labelStyles={{
          color: theme.extend.colors.darkPurple[900],
          fontSize: 16,
          justifyContent: "center",
          alignItems: "center",
          paddingBottom: 10,
          fontFamily: "esbuild-regular",
        }}
        {...props}
      />
    );
  }
);

TextInput.displayName = "TextInput";

export default TextInput;
