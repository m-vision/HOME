import { Octicons } from "@expo/vector-icons";
import { cn } from "../utils/helpers";
import isVideo from "../utils/is-video";
import theme from "../utils/theme";
import { memo, useCallback } from "react";
import { TouchableOpacity, View } from "react-native";
import * as Progress from "react-native-progress";
import * as ImagePicker from "expo-image-picker";
import ShimmerImageLoader from "./ShimmerImageLoader";
import ShimmerVideoThumbnailLoader from "./ShimmerVideoThumbnailLoader";

interface Props {
  file?: ImagePicker.ImagePickerAsset;
  imgUrl?: string;
  onSelectFile: () => void;
  containerClassName?: string;
  isLoading?: boolean;
  showDeleteButton?: boolean;
  showEditButton?: boolean;
}

const ProfileMediaPicker: React.FC<Props> = ({
  file,
  imgUrl,
  onSelectFile,
  containerClassName = "",
  isLoading = false,
  showDeleteButton = false,
  showEditButton = false,
}) => {
  const handleOnSelectFile = useCallback(() => {
    onSelectFile();
  }, [onSelectFile]);

  return (
    <View>
      <TouchableOpacity onPress={handleOnSelectFile}>
        <View
          className={cn(
            `rounded-2xl flex justify-center items-center bg-lightPurple-100 ${
              file === undefined && ""
            }`,
            containerClassName
          )}
        >
          {isLoading ? (
            <Progress.Circle
              size={28}
              indeterminate={true}
              color={theme.extend.colors.lightPurple[600]}
              borderWidth={3}
            />
          ) : imgUrl && !isVideo(imgUrl) ? (
            <ShimmerImageLoader
              source={{ uri: imgUrl as string, cache: "force-cache" }}
              customClassName="w-full h-full rounded-3xl"
            />
          ) : imgUrl && isVideo(imgUrl) ? (
            <ShimmerVideoThumbnailLoader
              source={{ uri: imgUrl as string, cache: "force-cache" }}
              customClassName="w-full h-full rounded-3xl"
            />
          ) : (
            <Octicons
              name="plus"
              size={28}
              color={theme.extend.colors.lightPurple[600]}
            />
          )}
        </View>
      </TouchableOpacity>

      {showDeleteButton && imgUrl && (
        <TouchableOpacity
          onPress={handleOnSelectFile}
          className="absolute right-[-10px] top-[-10px] bg-white px-2.5 py-[7px] rounded-full"
        >
          <Octicons
            name="x"
            size={12}
            color={theme.extend.colors.darkPurple[900]}
          />
        </TouchableOpacity>
      )}

      {showEditButton && imgUrl && (
        <TouchableOpacity
          onPress={handleOnSelectFile}
          className="absolute right-[-10px] top-[-10px] bg-white px-2 py-[7px] rounded-full border border-zinc-200"
        >
          <Octicons
            name="pencil"
            size={16}
            color={theme.extend.colors.darkPurple[900]}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default memo(ProfileMediaPicker);
