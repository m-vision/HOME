import RangeSlider from "../Inputs/RangeSlider";
import Text from "../Text";
import { View } from "react-native";

interface Props {
  ageRange: [number, number];
  onChange: (ageRange: [number, number]) => void;
}

const AgeRangeSelection = ({ ageRange, onChange }: Props) => {
  return (
    <View className="flex-1">
      <Text className="text-2xl font-esbuild-semibold text-darkPurple-600 mb-28">
        We’re all adults here. What age range are you interested in?
      </Text>

      <View className="px-4">
        <RangeSlider ageRange={ageRange} setAgeRange={onChange} />
      </View>
    </View>
  );
};

export default AgeRangeSelection;
