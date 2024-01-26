import RadioButton from "../Inputs/RadioButton";
import Text from "../Text";
import { getReadableConnectionTypes } from "../../utils/helpers";
import { ScrollView, View } from "react-native";
import { Connection_Type } from "../../graphql-types/src/graphql";

interface Props {
  selectedConnectionType?: Connection_Type;
  onSelectConnectionType: (connectionType: Connection_Type) => void;
  hasErrors: boolean;
}

const ConnectionTypeSelection = ({
  selectedConnectionType,
  onSelectConnectionType,
  hasErrors,
}: Props) => {
  return (
    <>
      <View className="flex-1">
        <Text className="text-2xl font-esbuild-semibold mb-2 text-darkPurple-600">
          On to the juicy stuff. What are you looking for?
        </Text>
        <Text className="text-base text-darkPurple-900 opacity-60 mb-6">
          Necterine is designed to facilitate all types of relationships.
          Honesty helps everyone on Necterine find the type of connection
          they’re looking for.
        </Text>
        <ScrollView showsVerticalScrollIndicator={false}>
          {Object.values(Connection_Type).map((option) => (
            <RadioButton
              key={option}
              label={getReadableConnectionTypes(option)}
              value={option}
              checked={selectedConnectionType === option}
              onChange={() => onSelectConnectionType(option)}
            />
          ))}
          {hasErrors && (
            <Text className="p-1 text-error-500">
              Please select one sexual orientation
            </Text>
          )}
        </ScrollView>
      </View>
    </>
  );
};

export default ConnectionTypeSelection;
