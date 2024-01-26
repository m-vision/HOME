import Text from "../Text";
import { cn } from "../../utils/helpers";
import { TouchableOpacity, TouchableOpacityProps } from "react-native";

interface TextButtonProps extends TouchableOpacityProps {
  title: string;
  classname?: string;
}

const TextButton = ({
  title,
  classname,
  ...touchableProps
}: TextButtonProps) => {
  return (
    <TouchableOpacity {...touchableProps}>
      <Text
        className={cn(
          `text-darkPurple-500 font-esbuild-semibold text-base`,
          classname
        )}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default TextButton;
