import { Octicons } from "@expo/vector-icons";
import theme from "../../utils/theme";
import { forwardRef, useState } from "react";
import type {
  TextInput as RNTextInput,
  TextInputProps as RNTextInputProps,
} from "react-native";
import { FloatingLabelInput } from "react-native-floating-label-input";

interface PasswordInputProps extends RNTextInputProps {
  label: string;
  hasErrors: boolean;
}

const PasswordInput = forwardRef<RNTextInput, PasswordInputProps>(
  ({ label, hasErrors, ...props }, ref) => {
    const [isFocused, setIsFocused] = useState(false);

    return (
      <FloatingLabelInput
        label={label}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        isFocused={isFocused}
        isPassword
        customHidePasswordComponent={
          <Octicons
            name="eye"
            size={24}
            color="#8F8F8F"
            style={{ paddingBottom: 10 }}
          />
        }
        customShowPasswordComponent={
          <Octicons
            name="eye-closed"
            size={24}
            color="#8F8F8F"
            style={{ paddingBottom: 10 }}
          />
        }
        ref={ref}
        inputStyles={{
          color: theme.extend.colors.darkPurple[900],
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
          colorBlurred: theme.extend.colors.darkPurple[900],
          colorFocused: theme.extend.colors.darkPurple[500],
        }}
        labelStyles={{
          color: isFocused
            ? theme.extend.colors.darkPurple[500]
            : theme.extend.colors.darkPurple[900],
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

PasswordInput.displayName = "PasswordInput";

export default PasswordInput;
