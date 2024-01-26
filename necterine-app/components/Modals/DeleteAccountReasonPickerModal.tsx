import { useState } from "react";
import CloseButton from "../Modals/CloseButton";
import Text from "../Text";
import { Modal, ScrollView, View } from "react-native";
import RadioButtonExtended from "../Inputs/RadioButtonExtended";
import PrimaryButton from "../Buttons/PrimaryButton";

const DELETE_ACCOUNT_REASONS = [
  {
    id: 0,
    title: "I found love",
    description: "I’m in a new relationship, and leaving Necterine behind",
  },
  {
    id: 1,
    title: "Too few connections",
    description:
      "The chemistry’s missing; I haven’t found my type on Necterine",
  },
  {
    id: 2,
    title: "Feature fatigue",
    description:
      "The tools on Necterine didn’t resonate; I’m exploring new avenues for self-awareness",
  },
  {
    id: 3,
    title: "Dating App overload",
    description:
      "I’m on too many dating apps, it’s time to declutter and Necterine didn’t make the list",
  },
  {
    id: 4,
    title: "Taking some me-time",
    description: "I’m hitting pause on dating to concentrate on me.",
  },
  {
    id: 5,
    title: "Reason not listed",
    description: "",
  },
];

interface Props {
  showModal: boolean;
  closeModal: () => void;
  onSave: (reason: string) => void;
}

const DeleteAccountReasonPickerModal = ({
  onSave,
  showModal,
  closeModal,
}: Props) => {
  const [selectedReason, setSelectedReason] = useState<string>("");

  return (
    <Modal
      animationType="slide"
      visible={showModal}
      presentationStyle="formSheet"
    >
      <View className="pt-6 pr-5 items-end mb-5">
        <CloseButton
          closeModal={() => {
            setSelectedReason("");
            closeModal();
          }}
        />
      </View>

      <View className="flex-1 px-5 mb-4">
        <View className="flex-1">
          <Text className="text-2xl font-esbuild-semibold mb-2 text-darkPurple-600">
            Are you sure you want to delete your account?
          </Text>
          <Text className="text-base text-darkPurple-900 opacity-60">
            Please select a reason
          </Text>
          <ScrollView className="mt-6" showsVerticalScrollIndicator={false}>
            {DELETE_ACCOUNT_REASONS.map((reason) => (
              <RadioButtonExtended
                key={reason.id}
                title={reason.title}
                description={reason.description}
                value={reason.title}
                checked={selectedReason === reason.title}
                onChange={() => setSelectedReason(reason.title)}
              />
            ))}
          </ScrollView>
        </View>
        <View className="flex-2 justify-end pt-6 items-center">
          <PrimaryButton
            title="Save"
            onPress={() => onSave(selectedReason)}
            disabled={selectedReason === ""}
            isLoading={false}
            className="mb-4"
          />
        </View>
      </View>
    </Modal>
  );
};

export default DeleteAccountReasonPickerModal;
