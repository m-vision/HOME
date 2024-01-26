import MultiSlider from "@ptomasroos/react-native-multi-slider";
import Text from "../Text";
import theme from "../../utils/theme";
import { useWindowDimensions, View } from "react-native";

interface RangeSliderInterface {
  ageRange: number[];
  setAgeRange: (ageRange: [number, number]) => void;
  minValue?: number;
  maxValue?: number;
  sliderLength?: number;
}

const RangeSlider = ({
  ageRange,
  setAgeRange,
  minValue = 18,
  maxValue = 100,
  sliderLength = useWindowDimensions().width - 75,
}: RangeSliderInterface) => {
  return (
    <MultiSlider
      sliderLength={sliderLength}
      containerStyle={{ height: 55 }}
      trackStyle={{
        height: 40,
        backgroundColor: theme.extend.colors.lightPurple[500],
      }}
      markerStyle={{
        height: 30,
        width: 30,
      }}
      selectedStyle={{
        backgroundColor: theme.extend.colors.darkPurple[300],
      }}
      markerContainerStyle={{
        marginTop: 24,
        height: 40,
        backgroundColor: theme.extend.colors.darkPurple[300],
        borderRadius: 20,
      }}
      unselectedStyle={{
        borderRadius: 20,
      }}
      values={[ageRange[0], ageRange[1]]}
      onValuesChange={(values) => setAgeRange(values as [number, number])}
      min={minValue}
      max={maxValue}
      enableLabel={true}
      allowOverlap={false}
      minMarkerOverlapDistance={35}
      customLabel={(props) => {
        return (
          <View className="flex-row">
            <Text
              className="text-xl font-esbuild-semibold text-darkPurple-700"
              style={{ left: props.oneMarkerLeftPosition - 15 }}
            >
              {props.oneMarkerValue}
            </Text>
            <Text
              className="text-xl font-esbuild-semibold text-darkPurple-700"
              style={{ left: props.twoMarkerLeftPosition - 40 }}
            >
              {props.twoMarkerValue}
            </Text>
          </View>
        );
      }}
    />
  );
};

export default RangeSlider;
