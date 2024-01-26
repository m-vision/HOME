import PrimaryButton from "../Buttons/PrimaryButton";
import TextButton from "../Buttons/TextButton";
import CloseButtonModal from "./CloseButton";
import Text from "../Text";
import { Animated, Modal, TouchableWithoutFeedback, View } from "react-native";
import { useEffect, useRef } from "react";

export interface ConfirmationModalProps {
  showModal: boolean;
  title: string;
  description: string;
  isLoading: boolean;
  primaryButtonTitle: string;
  secondaryButtonTitle: string;
  primaryButtonOnPress: () => void;
  secondaryButtonOnPress: () => void;
  closeModal: () => void;
}

const ConfirmationModal = ({
  showModal,
  title,
  description,
  isLoading,
  primaryButtonTitle,
  secondaryButtonTitle,
  primaryButtonOnPress,
  secondaryButtonOnPress,
  closeModal,
}: ConfirmationModalProps) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 0.5,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };

  const fadeOut = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const backgroundColorInterpolated = fadeAnim.interpolate({
    inputRange: [0, 0.5],
    outputRange: ["rgba(0,0,0,0)", "rgba(0,0,0,0.5)"],
  });

  useEffect(() => {
    if (showModal) {
      fadeIn();
    } else {
      fadeOut();
    }
  }, [showModal]);

  return (
    <Modal animationType="slide" transparent={true} visible={showModal}>
      <TouchableWithoutFeedback onPress={closeModal}>
        <Animated.View
          className="flex-1 justify-end items-center mb-3"
          style={{ backgroundColor: backgroundColorInterpolated }}
        >
          <TouchableWithoutFeedback onPress={(e) => e.stopPropagation()}>
            <View className="bg-white py-6 w-full rounded-[16px] px-5">
              <View className="items-end mb-2">
                <CloseButtonModal closeModal={closeModal} />
              </View>
              <Text className="text-2xl font-esbuild-semibold text-darkPurple-600 mb-2">
                {title}
              </Text>
              <Text className="text-base mb-6 text-darkPurple-900 opacity-60">
                {description}
              </Text>
              <View className="w-full items-center">
                <PrimaryButton
                  classname="w-full mb-4"
                  title={primaryButtonTitle}
                  onPress={primaryButtonOnPress}
                  isLoading={isLoading}
                  disabled={isLoading}
                />
                <TextButton
                  title={secondaryButtonTitle}
                  onPress={secondaryButtonOnPress}
                />
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Animated.View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default ConfirmationModal;
