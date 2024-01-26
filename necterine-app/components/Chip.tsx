import { View, ViewProps } from "react-native";
import Text from "./Text";
import { SvgProps } from "react-native-svg";
import { Octicons } from "@expo/vector-icons";
import theme from "../utils/theme";

interface ChipProps extends ViewProps {
  title: string;
  Icon?: React.FC<SvgProps>;
  octiconIconName?: any;
}

const Chip = ({ title, Icon, octiconIconName, ...props }: ChipProps) => {
  return (
    <View
      className="rounded-full text-xs bg-darkPurple-50 py-[10px] px-3 flex-row justify-center items-center"
      {...props}
    >
      {Icon && (
        <Icon
          width={16}
          height={16}
          color={theme.extend.colors.darkPurple[500]}
        />
      )}
      {octiconIconName && !Icon && (
        <Octicons
          name={octiconIconName}
          color={theme.extend.colors.darkPurple[500]}
          size={16}
        />
      )}
      <Text className="text-sm text-darkPurple-900 font-esbuild-regular ml-1.5 capitalize">
        {title}
      </Text>
    </View>
  );
};

export default Chip;
