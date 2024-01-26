import CustomCheckbox from "../CustomCheckbox";
import Checkbox from "../Inputs/Checkbox";
import Text from "../Text";
import { getReadableGender, orderedGenderOptions } from "../../utils/helpers";
import { useState } from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";
import { Gender } from "../../graphql-types/src/graphql";

interface Props {
  selectedGenders: Gender[];
  displayGenderPreferences: boolean;
  hasErrors: boolean;
  onSelectGenders: (genders: Gender[]) => void;
  onChangeDisplayGenderPreferences: (display: boolean) => void;
}

const GenderPreferencesSelection = ({
  selectedGenders,
  displayGenderPreferences,
  hasErrors,
  onSelectGenders,
  onChangeDisplayGenderPreferences,
}: Props) => {
  useState(false);

  const toggleGender = (gender: Gender) => {
    if (selectedGenders.includes(gender)) {
      onSelectGenders(selectedGenders.filter((item) => item !== gender));
    } else {
      if (selectedGenders.length < 3) {
        onSelectGenders([...selectedGenders, gender]);
      }
    }
  };

  const toggleCheckAll = () => {
    if (selectedGenders.length === Object.values(Gender).length) {
      onSelectGenders([]);
    } else {
      onSelectGenders(Object.values(Gender));
    }
  };

  return (
    <>
      <View className="flex-1">
        <Text className="text-2xl font-esbuild-semibold mb-2 text-darkPurple-600">
          Who would you like to connect with?
        </Text>
        <Text className="text-base text-darkPurple-900 opacity-60 mb-6">
          Select everyone you’d be open to meeting. You can change it at any
          time.
        </Text>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Checkbox
            key={"everyone"}
            label="Everyone"
            checked={selectedGenders.length === Object.values(Gender).length}
            onChange={() => toggleCheckAll()}
          />
          {orderedGenderOptions.map((option) => (
            <Checkbox
              key={option}
              label={getReadableGender(option)}
              checked={selectedGenders.includes(option)}
              onChange={() => toggleGender(option)}
            />
          ))}
          {hasErrors && (
            <Text className="p-1 text-error-500">
              Please select at least one preference
            </Text>
          )}
        </ScrollView>
      </View>
      <View className="flex-2 justify-end">
        <TouchableOpacity
          className="flex-row items-center justify-center"
          onPress={() =>
            onChangeDisplayGenderPreferences(!displayGenderPreferences)
          }
        >
          <CustomCheckbox
            onChange={() =>
              onChangeDisplayGenderPreferences(!displayGenderPreferences)
            }
            checked={displayGenderPreferences}
            className="border-gray-500"
          />
          <Text className="text-base text-darkPurple-900 opacity-60 py-6 text-center">
            Visible on profile
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default GenderPreferencesSelection;
