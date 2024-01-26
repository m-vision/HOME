import { Octicons } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";

interface Props {
  title?: string | null;
  subtitle?: string | null;
  onPress?: () => void;
}

const CardChevron: React.FC<Props> = ({ title, subtitle, onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="flex-row p-4 rounded-xl border border-zinc-200 justify-between items-center bg-white mb-2"
    >
      <View className="w-[95%] gap-1">
        <Text className="text-base font-esbuild-semibold" numberOfLines={1}>
          {title}
        </Text>
        <Text className="text-darkPurple-900 opacity-60 font-esbuild-regular text-base">
          {subtitle}
        </Text>
      </View>
      <View className="w-100">
        <Octicons
          name="chevron-right"
          size={20}
          className="px-4"
          color="#D6D6D6"
        />
      </View>
    </TouchableOpacity>
  );
};

export default CardChevron;
