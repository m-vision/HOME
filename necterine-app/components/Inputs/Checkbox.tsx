import CustomCheckbox from "../CustomCheckbox";
import Text from "../Text";
import { TouchableOpacity, type TouchableOpacityProps } from "react-native";

export interface CheckboxProps extends TouchableOpacityProps {
  label: string;
  onChange: () => void;
  checked: boolean;
}

const Checkbox: React.FC<CheckboxProps> = ({
  label,
  onChange,
  checked,
  ...touchableProps
}) => {
  return (
    <TouchableOpacity
      key={label}
      className={`bg-white flex-row items-center mb-4 px-6 py-5 border border-gray-300 rounded-xl ${
        checked ? "border-darkPurple-500 " : ""
      }`}
      onPress={onChange}
      {...touchableProps}
    >
      <Text className="text-base flex-1 capitalize text-darkPurple-900">
        {label}
      </Text>
      <CustomCheckbox onChange={onChange} checked={checked} />
    </TouchableOpacity>
  );
};

export default Checkbox;
