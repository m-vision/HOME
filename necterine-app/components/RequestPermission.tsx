import PrimaryButton from "./Buttons/PrimaryButton";
import IconContainer from "./IconContainer";
import Text from "./Text";
import { View } from "react-native";

export interface RequestPermissionProps {
  icon: string;
  title: string;
  description: string;
  isLoading: boolean;
  buttonLabel: string;
  onAction: () => void;
}

const RequestPermission = ({
  icon,
  title,
  description,
  isLoading,
  buttonLabel,
  onAction,
}: RequestPermissionProps) => {
  return (
    <>
      <View className="flex-1">
        <View className="mt-20 mb-4">
          <IconContainer
            containerClassName="bg-lightPurple-500 w-16 h-16 items-center justify-center"
            icon={icon}
            iconClassName="text-4xl"
          />
        </View>

        <Text className="text-3xl font-esbuild-semibold mb-2 text-darkPurple-600">
          {title}
        </Text>
        <Text className="text-base text-darkPurple-900 opacity-60 mb-2">
          {description}
        </Text>
      </View>

      <View className="flex-2 justify-end">
        <PrimaryButton
          isLoading={isLoading}
          disabled={isLoading}
          title={buttonLabel}
          onPress={onAction}
        />
      </View>
    </>
  );
};

export default RequestPermission;
