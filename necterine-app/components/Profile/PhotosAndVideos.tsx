import { Octicons } from "@expo/vector-icons";
import MediaPicker from "../ProfileMediaPicker";
import Text from "../Text";
import {
  convertMediaToBuffer,
  getContentTypeFromFilePath,
  getUniqueFileName,
} from "../../utils/helpers";
import isVideo from "../../utils/is-video";
import {
  deleteS3Object,
  getPresignedUrl,
  gets3FileKey,
  getS3FileUrl,
  uploadFileToS3,
} from "../../utils/s3";
import * as Sentry from "sentry-expo";
import { useCallback, useRef, useState } from "react";
import { useWindowDimensions, View } from "react-native";
import ActionSheet, { ActionSheetRef } from "react-native-actions-sheet";
import { Col, Grid, Row } from "react-native-easy-grid";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useToast } from "react-native-toast-notifications";
import * as ImagePicker from "expo-image-picker";
import { useUpdatePhotosMutation } from "../../graphql-types/src/graphql";

interface Props {
  userId: string;
  photos: string[];
  updateLoadingState: (value: React.SetStateAction<number[]>) => void;
  loadingState: number[];
  onUpdatePhotos: () => void;
}

const PhotosAndVideos = ({
  userId,
  photos,
  updateLoadingState,
  loadingState,
  onUpdatePhotos,
}: Props) => {
  const [updatePhotos] = useUpdatePhotosMutation();
  const [selectedFileIndex, setSelectedFileIndex] = useState<number | null>(
    null
  );
  const toast = useToast();
  const actionSheetRef = useRef<ActionSheetRef>(null);

  const windowDimensions = useWindowDimensions();
  const filesSectionHeight = Math.round(windowDimensions.width * 0.88);

  const onSelectFile = async (index: number) => {
    setSelectedFileIndex(index);
    if (photos[index]) {
      actionSheetRef.current?.show();
    } else {
      openPicker(index);
    }
  };

  const openPicker = async (index: number) => {
    if (loadingState.length > 0) {
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes:
        index === 0
          ? ImagePicker.MediaTypeOptions.Images
          : ImagePicker.MediaTypeOptions.All,
      allowsMultipleSelection: false,
      allowsEditing: true,
      videoExportPreset: ImagePicker.VideoExportPreset.H264_960x540,
      quality: 0.3,
    });

    if (!result.canceled) {
      try {
        updateLoadingState((prev) => [...prev, index]);
        actionSheetRef.current?.hide();

        const newFiles = [...photos];
        const oldFile = photos[index];
        const file = result.assets[0];
        const fileName = getUniqueFileName(file.fileName as string);

        if (isVideo(file.uri) && photos.filter((p) => isVideo(p)).length >= 2) {
          toast.show("You can only upload up to 2 videos", {
            type: "error",
          });
          updateLoadingState((prev) => prev.filter((i) => i !== index));
          return;
        }
        const mainPhotoContentType = getContentTypeFromFilePath(file.uri);

        const [presignedUrl, imageBuffer] = await Promise.all([
          getPresignedUrl({
            userId,
            fileName,
            contentType: getContentTypeFromFilePath(file.uri),
          }),
          convertMediaToBuffer(file.uri),
        ]);

        await uploadFileToS3({
          presignedUrl,
          file: imageBuffer,
          contentType: mainPhotoContentType,
        });

        const s3fileUrl = getS3FileUrl({ fileName, userId });
        if (newFiles[index]) {
          newFiles[index] = s3fileUrl;
        } else {
          newFiles.push(s3fileUrl);
        }

        const mutationResult = await updatePhotos({
          variables: {
            photos: newFiles,
          },
        });

        if (
          mutationResult.errors ||
          mutationResult.data?.updatePhotos === undefined
        ) {
          toast.show("Error updating photos", {
            type: "error",
          });
          Sentry.Native.captureException(mutationResult.errors);
        } else {
          if (oldFile) {
            await deleteS3Object(gets3FileKey(oldFile));
          }
          onUpdatePhotos();
          toast.show("Photos updated successfully", {
            type: "success",
          });
        }
      } catch (error) {
        Sentry.Native.captureException(error);
        toast.show("An error occurred", {
          type: "error",
        });
      } finally {
        updateLoadingState((prev) => prev.filter((i) => i !== index));
        setSelectedFileIndex(null);
      }
    } else {
      updateLoadingState((prev) => prev.filter((i) => i !== index));
    }
  };

  const deleteFile = async () => {
    if (selectedFileIndex === null || selectedFileIndex === undefined) return;

    try {
      const fileName = photos[selectedFileIndex];
      await deleteS3Object(gets3FileKey(fileName));

      const newFiles = photos.filter((p, i) => i !== selectedFileIndex);
      const mutationResult = await updatePhotos({
        variables: {
          photos: newFiles,
        },
      });

      if (
        mutationResult.errors ||
        mutationResult.data?.updatePhotos === undefined
      ) {
        toast.show("Error updating photos", {
          type: "error",
        });
        Sentry.Native.captureException(mutationResult.errors);
      } else {
        onUpdatePhotos();
        toast.show("Photos updated successfully", {
          type: "success",
        });
      }
    } catch (error) {
      Sentry.Native.captureException(error);
      toast.show("An error occurred", {
        type: "error",
      });
    } finally {
      setSelectedFileIndex(null);
      actionSheetRef.current?.hide();
    }
  };

  const renderMediaPicker = useCallback(
    (index: number, additionalStyles = "") => {
      const isMainPhoto = index === 0;
      const canDelete = photos.length > 1 || !isMainPhoto;
      const showEditButton = isMainPhoto && photos.length === 1;

      return (
        <MediaPicker
          onSelectFile={() => onSelectFile(index)}
          imgUrl={photos?.[index]}
          isLoading={loadingState.includes(index)}
          containerClassName={`mr-0 mb-0 h-full min-w-full rounded-[14.55px] bg-white ${additionalStyles}`}
          showEditButton={showEditButton}
          showDeleteButton={canDelete}
        />
      );
    },
    [photos, loadingState, onSelectFile]
  );

  return (
    <>
      {/* Photos & Videos */}
      <Text className="mb-2 text-[18px] font-esbuild-semibold">
        Your photos & Videos
      </Text>
      <Text className="mb-4 text-darkPurple-900 opacity-60 text-sm">
        Add a video or pic, pick some that show the true you
      </Text>

      <ActionSheet ref={actionSheetRef}>
        {photos.length > 1 && (
          <TouchableOpacity
            onPress={() => {
              deleteFile();
              actionSheetRef.current?.hide();
            }}
            className="flex items-center justify-center py-4 border-b-zinc-300 border-b mt-2"
          >
            <Text className="text-error-500 font-esbuild-semibold text-base">
              Delete
            </Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          onPress={() => {
            openPicker(selectedFileIndex!);
          }}
          className="flex items-center justify-center border-b-zinc-300 border-b py-4"
        >
          <Text className="font-esbuild-semibold text-base">Replace</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            actionSheetRef.current?.hide();
          }}
          className="flex items-center justify-center py-4 "
        >
          <Text className="font-esbuild-semibold text-base">Cancel</Text>
        </TouchableOpacity>
      </ActionSheet>

      <View className="">
        <Grid style={{ height: filesSectionHeight }}>
          <Col size={2 / 3} style={{ marginRight: 12 }}>
            <Row size={2 / 3} style={{ marginBottom: 10 }}>
              {renderMediaPicker(0)}
              <View
                className="absolute px-2 py-1 left-4 bottom-4 flex-row rounded-md text-xs"
                style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
              >
                <Octicons
                  name="check"
                  color="white"
                  size={16}
                  style={{
                    paddingRight: 4,
                  }}
                />
                <Text className="text-xs text-white font-esbuild-regular">
                  Cover
                </Text>
              </View>
            </Row>
            <Row size={1 / 3}>
              <Col size={1 / 2} style={{ marginRight: 12, marginTop: 6 }}>
                {renderMediaPicker(3)}
              </Col>
              <Col size={1 / 2} style={{ marginRight: 0, marginTop: 6 }}>
                {renderMediaPicker(4)}
              </Col>
            </Row>
          </Col>
          <Col size={1 / 3}>
            <Row style={{ paddingBottom: 6 }}>{renderMediaPicker(1)}</Row>
            <Row style={{ paddingTop: 6, paddingBottom: 6 }}>
              {renderMediaPicker(2)}
            </Row>
            <Row style={{ paddingTop: 6 }}>{renderMediaPicker(5)}</Row>
          </Col>
        </Grid>
      </View>
      <Text className="text-xs mt-4 text-darkPurple-900 opacity-60">
        You can only upload up to 2 videos.{" "}
      </Text>
    </>
  );
};

export default PhotosAndVideos;
