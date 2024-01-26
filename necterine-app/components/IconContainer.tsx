import Text from "./Text";
import { cn } from "../utils/helpers";
import { View, ViewProps } from "react-native";

export interface IconContainerProps extends ViewProps {
  icon: string;
  containerClassName?: string;
  iconClassName?: string;
}
const IconContainer = ({
  icon,
  containerClassName,
  iconClassName,
  ...props
}: IconContainerProps) => {
  return (
    <View
      className={cn(
        `mr-4 bg-lightPurple-100 p-2 w-9 h-9 rounded-lg`,
        containerClassName,
      )}
      {...props}
    >
      <Text className={cn(`text-base`, iconClassName)}>{icon}</Text>
    </View>
  );
};

export default IconContainer;
