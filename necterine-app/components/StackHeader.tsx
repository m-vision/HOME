import { SafeAreaView, View } from "react-native";
import ArrowBack from "./Buttons/ArrowBack";
import Text from "./Text";
import { NativeStackHeaderProps } from "@react-navigation/native-stack/lib/typescript/src/types";

interface StackHeaderProps {
  props: NativeStackHeaderProps;
  onCustomBack?: () => void;
}

const StackHeader = ({ props, onCustomBack }: StackHeaderProps) => {
  return (
    <SafeAreaView className="bg-white">
      <View className="flex-row items-center h-14 justify-between px-4">
        {props.options.headerBackVisible && (
          <View>
            <ArrowBack
              size={24}
              onBack={() =>
                onCustomBack ? onCustomBack() : props.navigation.goBack()
              }
            />
          </View>
        )}
        <View className="flex-1 items-center justify-center">
          <Text className="text-[18px] text-darkPurple-500 font-esbuild-semibold">
            {props.options.headerTitle?.toString()}
          </Text>
        </View>
        {/* Invisible Placeholder to balance */}
        {props.options.headerBackVisible && (
          <View className="opacity-0">
            <ArrowBack size={24} onBack={() => {}} />
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default StackHeader;
