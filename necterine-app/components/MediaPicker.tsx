import { Octicons } from "@expo/vector-icons";
import { cn } from "../utils/helpers";
import theme from "../utils/theme";
import { Image, TouchableOpacity, View } from "react-native";
import * as Progress from "react-native-progress";
import * as ImagePicker from "expo-image-picker";

interface Props {
  file?: ImagePicker.ImagePickerAsset;
  onSelectFile: () => void;
  containerClassName?: string;
  imageClassName?: string;
  isLoading?: boolean;
}

const MediaPicker: React.FC<Props> = ({
  file,
  onSelectFile,
  containerClassName = "",
  imageClassName = "",
  isLoading = false,
}) => {
  return (
    <TouchableOpacity onPress={onSelectFile}>
      <View
        className={cn(
          `mr-6 w-40 h-40 rounded-3xl flex justify-center items-center bg-white ${
            file === undefined && "border-2 border-darkPurple-200 border-dashed"
          }`,
          containerClassName,
        )}
      >
        {file !== undefined ? (
          <Image
            source={{ uri: file.uri }}
            className={cn(`w-full h-full rounded-3xl`, imageClassName)}
          />
        ) : isLoading ? (
          <Progress.Circle
            size={34}
            indeterminate={true}
            color={theme.extend.colors.darkPurple[300]}
            borderWidth={3}
          />
        ) : (
          <Octicons
            name="plus"
            size={34}
            color={theme.extend.colors.darkPurple[300]}
          />
        )}
      </View>
    </TouchableOpacity>
  );
};

export default MediaPicker;
