import { Ionicons } from "@expo/vector-icons";
import { SettingsItem } from "../../app/(auth)/(app)/constants";
import { useRouter } from "expo-router";
import { TouchableOpacity, View } from "react-native";
import Text from "../Text";

const NavigationItem = ({ item }: { item: SettingsItem }) => {
  const router = useRouter();
  return (
    <TouchableOpacity
      onPress={() => {
        router.push(`${item.navigateTo}`);
      }}
    >
      <View className="bg-white flex-row px-5 py-4 items-center">
        <View className="flex-row flex-1 items-center">
          {item.icon}
          <Text className="text-darkPurple-900 text-base ml-4">
            {item.title}
          </Text>
        </View>
        <Ionicons name="ios-chevron-forward" size={24} color="#D6D6D6" />
      </View>
    </TouchableOpacity>
  );
};

export default NavigationItem;
