import { Octicons } from "@expo/vector-icons";
import { cn } from "../utils/helpers";
import { TouchableOpacity, TouchableOpacityProps } from "react-native";

export interface CustomCheckboxProps extends TouchableOpacityProps {
  onChange: () => void;
  checked: boolean;
  className?: string;
}

const CustomCheckbox: React.FC<CustomCheckboxProps> = ({
  onChange,
  checked,
  className,
  ...props
}) => {
  return (
    <TouchableOpacity
      className={cn(
        `bg-white w-5 h-5 border-2 border-lightPurple-700 rounded mr-2 ${
          checked ? "bg-darkPurple-500 border-0" : ""
        }`,
        className
      )}
      onPress={onChange}
      {...props}
    >
      <Octicons
        name="check"
        color="white"
        size={18}
        style={{
          paddingLeft: 3,
        }}
      />
    </TouchableOpacity>
  );
};

export default CustomCheckbox;
