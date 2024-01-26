import CustomCheckbox from "../CustomCheckbox";
import Checkbox from "../Inputs/Checkbox";
import Text from "../Text";
import { getReadablePronoun } from "../../utils/helpers";
import { ScrollView, TouchableOpacity, View } from "react-native";
import { Pronoun } from "../../graphql-types/src/graphql";

interface Props {
  selectedPronouns: Pronoun[];
  displayPronouns: boolean;
  onSelectPronouns: (pronouns: Pronoun[]) => void;
  onChangeDisplayPronouns: (display: boolean) => void;
  hasErrors?: boolean;
}

const PronounsSelection = ({
  selectedPronouns,
  displayPronouns,
  hasErrors,
  onSelectPronouns,
  onChangeDisplayPronouns,
}: Props) => {
  const togglePronoun = (pronoun: Pronoun) => {
    if (selectedPronouns.includes(pronoun)) {
      onSelectPronouns(selectedPronouns.filter((item) => item !== pronoun));
    } else {
      if (selectedPronouns.length < 3) {
        onSelectPronouns([...selectedPronouns, pronoun]);
      }
    }
  };

  return (
    <>
      <View className="flex-1">
        <Text className="text-2xl font-esbuild-semibold mb-2 text-darkPurple-600">
          {"What are your pronouns?"}
        </Text>
        <Text className="text-base text-darkPurple-900 opacity-60 mb-6">
          You can choose more than one option
        </Text>
        <ScrollView showsVerticalScrollIndicator={false}>
          {Object.values(Pronoun).map((option) => (
            <Checkbox
              key={option}
              label={getReadablePronoun(option)}
              checked={selectedPronouns.includes(option)}
              onChange={() => togglePronoun(option)}
            />
          ))}
          {hasErrors && (
            <Text className="p-1 text-error-500">
              Please select at least one pronoun
            </Text>
          )}
        </ScrollView>
      </View>
      <View className="flex-2 justify-end">
        <TouchableOpacity
          className="flex-row items-center justify-center"
          onPress={() => onChangeDisplayPronouns(!displayPronouns)}
        >
          <CustomCheckbox
            onChange={() => onChangeDisplayPronouns(!displayPronouns)}
            checked={displayPronouns}
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

export default PronounsSelection;
