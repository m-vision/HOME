import { Octicons } from "@expo/vector-icons";
import RadioButton from "../Inputs/RadioButton";
import CloseButtonModal from "../Modals/CloseButton";
import Text from "../Text";
import { getReadableGender } from "../../utils/helpers";
import theme from "../../utils/theme";
import React, { useState } from "react";
import { Modal, ScrollView, TouchableOpacity, View } from "react-native";
import { Gender } from "../../graphql-types/src/graphql";

const firstOptions = [
  {
    label: Gender.Male,
    value: Gender.Male,
  },
  {
    label: Gender.Female,
    value: Gender.Female,
  },
  {
    label: getReadableGender(Gender.NonBinary),
    value: Gender.NonBinary,
  },
];
const otherGenderOptions = Object.values(Gender).filter(
  (gender) =>
    ![Gender.Male, Gender.Female, Gender.NonBinary].includes(gender as Gender)
);

interface Props {
  selectedGender: Gender | undefined;
  onSelectGender: (gender: Gender) => void;
  hasErrors: boolean;
}

const GenderSelection = ({
  selectedGender,
  onSelectGender,
  hasErrors,
}: Props) => {
  const [displayBottomSheet, setDisplayBottomSheet] = useState(false);

  const otherOptionSelected =
    selectedGender !== undefined &&
    !firstOptions.some((option) => option.value === selectedGender);

  return (
    <>
      <Modal
        animationType="slide"
        transparent={true}
        visible={displayBottomSheet}
      >
        <View
          className="pt-28 flex-1 justify-end"
          style={{ backgroundColor: "rgba(0,0,0,0.7)" }}
        >
          <View className="bg-lightPurple-50 p-4 rounded-t-3xl">
            <View className="px-2 pt-2 pb-4">
              <View className="items-end">
                <CloseButtonModal
                  closeModal={() => setDisplayBottomSheet(false)}
                />
              </View>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
              {otherGenderOptions.map((gender) => (
                <View key={gender}>
                  <TouchableOpacity
                    className="flex-row items-center mb-2 px-2 py-4 border-b border-lightPurple-200 rounded-xl "
                    onPress={() => {
                      onSelectGender(gender);
                      setDisplayBottomSheet(false);
                    }}
                  >
                    <Text className="text-base capitalize text-darkPurple-900 flex-1">
                      {getReadableGender(gender)}
                    </Text>
                    <View
                      className={`justify-end ${
                        gender === selectedGender
                          ? ""
                          : "border-2 rounded-full border-lightPurple-700"
                      }  ml-2`}
                    >
                      <View
                        className={`w-5 h-5 rounded-full ${
                          gender === selectedGender
                            ? "bg-darkPurple-500 w-[24px] h-[24px]"
                            : ""
                        }`}
                      >
                        <Octicons
                          name="check"
                          color="white"
                          size={18}
                          style={{
                            paddingLeft: 5,
                            paddingTop: 2.5,
                          }}
                        />
                      </View>
                    </View>
                  </TouchableOpacity>
                </View>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>
      <View className="flex-2">
        <Text className="text-2xl font-esbuild-semibold mb-2 text-darkPurple-600">
          Which gender best describes you?
        </Text>
        <Text className="text-base text-darkPurple-900 opacity-60 mb-6">
          You’ll be able to include more information about your gender identity
          later on.
        </Text>
        {firstOptions.map((option) => (
          <RadioButton
            key={option.value}
            label={option.label}
            value={option.value}
            checked={selectedGender === option.value}
            onChange={() => onSelectGender(option.value)}
          />
        ))}
        <TouchableOpacity
          key="other"
          className={`flex-row items-center mb-4 px-6 py-5 border border-neutral-300 rounded-xl bg-white ${
            otherOptionSelected ? "border-darkPurple-500 border-2" : ""
          }`}
          onPress={() => setDisplayBottomSheet(true)}
        >
          <Text className="text-base flex-1 capitalize text-darkPurple-900">
            {otherOptionSelected ? getReadableGender(selectedGender) : "Other"}
          </Text>
          <Octicons
            name="chevron-down"
            size={24}
            color={theme.extend.colors.lightPurple[700]}
          />
        </TouchableOpacity>
        {hasErrors && (
          <Text className="p-1 text-error-500">Please select one gender</Text>
        )}
      </View>
    </>
  );
};

export default GenderSelection;
