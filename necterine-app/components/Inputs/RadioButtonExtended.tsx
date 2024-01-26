import { Octicons } from "@expo/vector-icons";
import Text from "../Text";
import {
  TouchableOpacity,
  View,
  type TouchableOpacityProps,
} from "react-native";

export interface RadioButtonExtendedProps extends TouchableOpacityProps {
  title: string;
  description?: string;
  value: string;
  onChange: (value: string) => void;
  checked: boolean;
}

const RadioButtonExtended: React.FC<RadioButtonExtendedProps> = ({
  title,
  description,
  value,
  onChange,
  checked,
  ...touchableProps
}: RadioButtonExtendedProps) => {
  return (
    <TouchableOpacity
      key={value}
      className={`flex-row items-center mb-4 px-6 py-5 border border-neutral-300 rounded-xl bg-white ${
        checked ? "border-darkPurple-500 border-2" : ""
      }
      `}
      onPress={() => onChange(value)}
      {...touchableProps}
    >
      <View className="w-[70%] min-w-[70%] mr-4">
        <Text className="text-base flex-1 text-darkPurple-900">{title}</Text>
        {description && (
          <Text className="text-base flex-1 text-darkPurple-900 opacity-60">
            {description}
          </Text>
        )}
      </View>
      <View
        className={` ${
          checked ? "" : "border-2 rounded-full border-lightPurple-700"
        }  ml-2`}
      >
        <View
          className={`w-5 h-5 rounded-full ${
            checked ? "bg-darkPurple-500 w-[24px] h-[24px]" : ""
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
  );
};

export default RadioButtonExtended;
