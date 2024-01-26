import theme from "../../utils/theme";
import { SafeAreaView } from "react-native";
import * as Progress from "react-native-progress";

export const ScreenLoader = () => {
  return (
    <SafeAreaView className="flex-1 justify-center items-center">
      <Progress.Circle
        size={32}
        indeterminate={true}
        color={theme.extend.colors.darkPurple[500]}
        borderWidth={2}
      />
    </SafeAreaView>
  );
};

export default ScreenLoader;
