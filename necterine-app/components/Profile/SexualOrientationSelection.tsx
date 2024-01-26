import CustomCheckbox from "../CustomCheckbox";
import RadioButton from "../Inputs/RadioButton";
import Text from "../Text";
import {
  getReadableSexualOrientation,
  orderedSexualOrientationOptions,
} from "../../utils/helpers";
import { ScrollView, TouchableOpacity, View } from "react-native";
import { Sexual_Orientation } from "../../graphql-types/src/graphql";

interface Props {
  selectedOrientation?: Sexual_Orientation | undefined;
  onSelectOrientation: (orientation: Sexual_Orientation) => void;
  displaySexualOrientation: boolean;
  onSelectDisplaySexualOrientation: (display: boolean) => void;
  hasErrors: boolean;
}

const SexualOrientationSelection = ({
  selectedOrientation,
  onSelectOrientation,
  displaySexualOrientation,
  onSelectDisplaySexualOrientation,
  hasErrors,
}: Props) => {
  return (
    <>
      <View className="flex-1">
        <Text className="text-2xl font-esbuild-semibold mb-6 text-darkPurple-600">
          What sexual orientation do you identify with?
        </Text>
        <Text className="text-base text-darkPurple-900 opacity-60 mb-6">
          Let us know if you feel included in our options—or if you don’t. We’re
          always looking for more ways to make our community a more inclusive
          space.
        </Text>
        <ScrollView showsVerticalScrollIndicator={false}>
          {orderedSexualOrientationOptions.map((option) => (
            <RadioButton
              key={option}
              label={getReadableSexualOrientation(option)}
              value={option}
              checked={selectedOrientation === option}
              onChange={() => onSelectOrientation(option)}
            />
          ))}
          {hasErrors && (
            <Text className="p-1 text-error-500">
              Please select one sexual orientation
            </Text>
          )}
        </ScrollView>
      </View>
      <View className="flex-2 justify-end">
        <TouchableOpacity
          className="flex-row items-center justify-center"
          onPress={() =>
            onSelectDisplaySexualOrientation(!displaySexualOrientation)
          }
        >
          <CustomCheckbox
            onChange={() =>
              onSelectDisplaySexualOrientation(!displaySexualOrientation)
            }
            checked={displaySexualOrientation}
            className="border-gray-500"
          />
          <Text className="text-base text-gray-500 py-6 text-center">
            Visible on profile
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default SexualOrientationSelection;
