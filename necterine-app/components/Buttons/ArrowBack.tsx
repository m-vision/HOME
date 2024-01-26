import { Feather } from "@expo/vector-icons";
import theme from "../../utils/theme";

export interface ArrowBackProps {
  onBack: () => void;
  size?: number;
}

const ArrowBack = ({ onBack, size = 32 }: ArrowBackProps) => {
  return (
    <Feather
      name="arrow-left"
      size={size}
      color={theme.extend.colors.darkPurple[500]}
      onPress={onBack}
      suppressHighlighting
      style={{ marginLeft: -5 }}
    />
  );
};

export default ArrowBack;
