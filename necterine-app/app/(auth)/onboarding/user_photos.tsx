import ArrowBack from "../../../components/Buttons/ArrowBack";
import PrimaryButton from "../../../components/Buttons/PrimaryButton";
import MediaPicker from "../../../components/MediaPicker";
import MediaUploadTipsModal from "../../../components/Modals/MediaUploadTips";
import RequestPermission from "../../../components/RequestPermission";
import ScreenLayout from "../../../components/ScreenLayout";
import Text from "../../../components/Text";
import {
  convertMediaToBuffer,
  getContentTypeFromFilePath,
  getUniqueFileName,
} from "../../../utils/helpers";
import {
  getPresignedUrl,
  getS3FileUrl,
  uploadFileToS3,
} from "../../../utils/s3";
import * as Sentry from "sentry-expo";
import { useEffect, useState } from "react";
import { AppState, Linking, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useToast } from "react-native-toast-notifications";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import {
  useCurrentUserQuery,
  useUpdatePhotosMutation,
} from "../../../graphql-types/src/graphql";

const UserPhotos = () => {
  const router = useRouter();
  const [updatePhotos] = useUpdatePhotosMutation();
  const { data } = useCurrentUserQuery();
  const [mainPhoto, setMainPhoto] = useState<ImagePicker.ImagePickerAsset>();
  const [secondaryPhoto, setSecondaryPhoto] =
    useState<ImagePicker.ImagePickerAsset>();
  const [photoLoading, setPhotoLoading] = useState({ 0: false, 1: false });
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [permissionDenied, setPermissionDenied] = useState(false);
  const [appState, setAppState] = useState(AppState.currentState);
  const toast = useToast();

  const onSelectImage = async (index: 0 | 1) => {
    setPhotoLoading({ ...photoLoading, [index]: true });

    // Request permission to access location
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== "granted") {
      // Permission denied
      setPermissionDenied(true);
      setPhotoLoading({ ...photoLoading, [index]: false });
      return;
    }

    setPermissionDenied(false);

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: false,
      allowsEditing: true,
    });

    setPhotoLoading({ ...photoLoading, [index]: false });
    if (!result.canceled) {
      index === 0
        ? setMainPhoto(result.assets[0])
        : setSecondaryPhoto(result.assets[0]);
    }
  };

  const onContinue = async () => {
    if (mainPhoto === undefined) {
      setHasError(true);
      return;
    }
    try {
      setIsLoading(true);
      let photos = [];

      const fileName = getUniqueFileName(mainPhoto.fileName as string);
      const mainPhotoContentType = getContentTypeFromFilePath(mainPhoto.uri);

      const presignedUrl = await getPresignedUrl({
        userId: data?.me.id as string,
        fileName,
        contentType: mainPhotoContentType,
      });

      const imageBuffer = await convertMediaToBuffer(mainPhoto.uri);

      await uploadFileToS3({
        presignedUrl,
        file: imageBuffer,
        contentType: mainPhotoContentType,
      });

      photos = [getS3FileUrl({ fileName, userId: data?.me.id as string })];

      if (secondaryPhoto) {
        const secondaryPhotoFileName = getUniqueFileName(
          secondaryPhoto.fileName as string
        );
        const secondaryPhotoContentType = getContentTypeFromFilePath(
          secondaryPhoto.uri
        );

        const secondaryPresignedUrl = await getPresignedUrl({
          userId: data?.me.id as string,
          fileName: secondaryPhotoFileName,
          contentType: secondaryPhotoContentType,
        });

        const secondaryImageBuffer = await convertMediaToBuffer(
          secondaryPhoto.uri
        );

        await uploadFileToS3({
          presignedUrl: secondaryPresignedUrl,
          file: secondaryImageBuffer,
          contentType: secondaryPhotoContentType,
        });

        photos.push(
          getS3FileUrl({
            fileName: secondaryPhotoFileName,
            userId: data?.me.id as string,
          })
        );
      }

      const result = await updatePhotos({
        variables: {
          photos,
        },
      });

      if (result.errors || result.data?.updatePhotos === undefined) {
        toast.show("", {
          type: "error",
        });
        Sentry.Native.captureException(result.errors);
        setIsLoading(false);
        return;
      }

      setIsLoading(false);
      router.push("/onboarding/user_location");
    } catch (error) {
      toast.show("", {
        type: "error",
      });
      Sentry.Native.captureException(error);
      setIsLoading(false);
    }
  };

  const openSettings = () => {
    Linking.openSettings();
  };

  const handleAppStateChange = async (
    nextAppState: "active" | "background" | "inactive" | "unknown" | "extension"
  ) => {
    if (appState.match(/inactive|background/) && nextAppState === "active") {
      // App has come to the foreground, check permissions again
      const { status } = await ImagePicker.getMediaLibraryPermissionsAsync();

      if (status !== "granted") {
        // Permission denied
        setPermissionDenied(true);
      } else {
        // Permission granted
        setPermissionDenied(false);
      }
    }
    setAppState(nextAppState);
  };

  useEffect(() => {
    AppState.addEventListener("change", handleAppStateChange);
  }, [appState]);

  return (
    <ScreenLayout>
      <>
        <MediaUploadTipsModal
          closeModal={() => setShowModal(false)}
          showModal={showModal}
        />
        <View className="flex-1">
          <View className="my-8">
            <ArrowBack onBack={() => router.back()} />
          </View>
          {permissionDenied ? (
            <RequestPermission
              icon="📸️"
              title="We need access to your photos"
              description="To help you choose the perfect profile pics, please grant
          Necterine access to your photos. Let's make your profile shine!"
              buttonLabel="Open settings"
              onAction={openSettings}
              isLoading={isLoading}
            />
          ) : (
            <>
              <Text className="text-2xl font-esbuild-semibold mb-2 text-darkPurple-600">
                Add at least two photos of yourself.
              </Text>
              <Text className="text-base text-darkPurple-900 opacity-60 mb-6">
                Whether it’s a cute candid or saucy selfie, including a variety
                of photos helps potential matches get a feel for who you are.
              </Text>
              <View className="flex-row">
                <MediaPicker
                  onSelectFile={() => onSelectImage(0)}
                  file={mainPhoto}
                  isLoading={photoLoading[0]}
                />
                <MediaPicker
                  onSelectFile={() => onSelectImage(1)}
                  file={secondaryPhoto}
                  isLoading={photoLoading[1]}
                />
                {hasError && (
                  <Text className="p-1 mt-2 text-error-500">
                    Please add a main photo
                  </Text>
                )}
              </View>
            </>
          )}
        </View>
        {!permissionDenied && (
          <View className="flex-2 justify-end">
            <View className="flex-row bg-blue-500 px-4 py-3 rounded-lg mb-6">
              <View className="flex mr-4 bg-blue-300 px-2 py-1.5 rounded-lg">
                <Text className="text-2xl">📷</Text>
              </View>
              <View className="flex">
                <Text className="text-base text-blue-900">
                  Do you need help with your photos?
                </Text>
                <TouchableOpacity onPress={() => setShowModal(true)}>
                  <Text className="text-base text-darkPurple-500 underline">
                    Here are some tips
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <PrimaryButton
              title="Continue"
              onPress={onContinue}
              isLoading={isLoading}
              disabled={mainPhoto === undefined || isLoading}
            />
          </View>
        )}
      </>
    </ScreenLayout>
  );
};

export default UserPhotos;
