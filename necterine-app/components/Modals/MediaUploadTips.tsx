import PrimaryButton from "../Buttons/PrimaryButton";
import IconContainer from "../IconContainer";
import CloseButtonModal from "./CloseButton";
import CheckCircleImage from "../../assets/svg/check-circle.svg";
import Text from "../Text";
import {
  Animated,
  Image,
  Modal,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { useEffect, useRef } from "react";

const items = [
  {
    title: "Let your true self shine",
    description:
      "Choose a clear, well-lit photo that captures your essence. Smile with authenticity!",
    icon: "🤳",
  },
  {
    title: "Share your journey with others",
    description:
      "Add a group photo that shows meaningful moments and others that reflect your path of self-awareness and the passions that drive you.",
    icon: "✨",
  },
];

export interface MediaUploadTipsModalProps {
  showModal: boolean;
  closeModal: () => void;
}

const MediaUploadTipsModal = ({
  showModal,
  closeModal,
}: MediaUploadTipsModalProps) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 0.5,
      duration: 500,
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
          className="flex-1 justify-end items-center"
          style={{ backgroundColor: backgroundColorInterpolated }}
        >
          <TouchableWithoutFeedback onPress={(e) => e.stopPropagation()}>
            <View className="bg-white py-6 w-full rounded-[16px] px-5">
              <View className="items-end mb-4">
                <CloseButtonModal closeModal={closeModal} />
              </View>
              <View className="flex-row justify-between">
                <View className="flex-1 mr-2">
                  <Image
                    source={require("../../assets/media-example-one.jpeg")}
                    className="h-44 w-full rounded-2xl"
                  />
                  <View className="relative -top-4 items-center">
                    <CheckCircleImage width={30} height={30} />
                  </View>
                </View>
                <View className="flex-1 ml-2">
                  <Image
                    source={require("../../assets/media-example-two.jpeg")}
                    className="h-44 w-full rounded-2xl"
                  />
                  <View className="relative -top-4 items-center">
                    <CheckCircleImage width={30} height={30} />
                  </View>
                </View>
              </View>
              {items.map((item, index) => (
                <View className="mb-4 flex-row" key={index}>
                  <IconContainer
                    containerClassName="bg-lightPurple-200"
                    icon={item.icon}
                  />
                  <View className="flex-1">
                    <Text className="text-[18px] font-esbuild-semibold text-darkPurple-600">
                      {item.title}
                    </Text>
                    <Text className="text-base text-lightPurple-800">
                      {item.description}
                    </Text>
                  </View>
                </View>
              ))}
              <View className="w-full items-center mt-3">
                <PrimaryButton
                  classname="w-full mb-4"
                  title="Got it"
                  onPress={closeModal}
                />
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Animated.View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default MediaUploadTipsModal;
