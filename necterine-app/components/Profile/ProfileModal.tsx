import PrimaryButton from "../Buttons/PrimaryButton";
import CloseButton from "../Modals/CloseButton";
import React from "react";
import { Modal, View } from "react-native";

interface Props {
  onClose: () => void;
  onSave: () => void;
  disabled: boolean;
  isLoading: boolean;
  children: React.ReactNode;
}

const ProfileModal = ({
  onClose,
  onSave,
  disabled,
  isLoading,
  children,
}: Props) => {
  return (
    <Modal presentationStyle="formSheet" animationType="slide" visible>
      <View className="pt-6 pr-5 items-end mb-5">
        <CloseButton closeModal={onClose} />
      </View>
      <View className="flex-1 px-5">{children}</View>
      <View className="flex-2 px-5 pt-4 items-center mb-8">
        <PrimaryButton
          title="Save"
          onPress={onSave}
          disabled={disabled || isLoading}
          isLoading={isLoading}
        />
      </View>
    </Modal>
  );
};

export default ProfileModal;
