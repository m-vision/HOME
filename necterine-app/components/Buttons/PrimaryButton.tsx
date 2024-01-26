import { cn } from "../../utils/helpers";
import theme from "../../utils/theme";
import React from "react";
import { Text, TouchableOpacity, TouchableOpacityProps } from "react-native";
import * as Progress from "react-native-progress";

interface PrimaryButtonProps extends TouchableOpacityProps {
  title: string;
  onPress: () => void;
  isLoading?: boolean;
  classname?: string;
  disabled?: boolean;
}

const PrimaryButton = ({
  title,
  onPress,
  classname,
  isLoading = false,
  disabled = false,
  ...touchableProps
}: PrimaryButtonProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      className={cn(
        `flex py-4 px-8 justify-center items-center rounded-full bg-green-500 w-full ${
          disabled ? "opacity-50" : ""
        } ${isLoading && "pb-3 pt-5"}`,
        classname
      )}
      {...touchableProps}
    >
      <Text className="text-darkPurple-500 font-esbuild-semibold text-base">
        {!isLoading ? (
          title
        ) : (
          <Progress.Circle
            size={24}
            indeterminate={true}
            color={theme.extend.colors.darkPurple[500]}
            borderWidth={2}
          />
        )}
      </Text>
    </TouchableOpacity>
  );
};

export default PrimaryButton;
