import CloseButton from "../Modals/CloseButton";
import OptionalOnboardingQuestion from "../OptionalOnboardingQuestion";
import { Modal, View } from "react-native";

interface Props {
  questionId?: string | null;
  selectedAnswerId?: string;
  onSuccess: () => void;
  onClose: () => void;
}

const OptionalQuestionModal = (props: Props) => {
  const { questionId, onSuccess, selectedAnswerId, onClose } = props;

  return (
    <Modal
      presentationStyle="formSheet"
      animationType="slide"
      visible={!!questionId}
    >
      <View className="pt-6 pr-5 items-end mb-5">
        <CloseButton closeModal={onClose} />
      </View>

      <View className="flex-1 px-5 mb-4">
        <OptionalOnboardingQuestion
          questionId={questionId as string}
          selectedAnswerId={selectedAnswerId}
          onSuccessCallback={onSuccess}
          primaryButtonLabel="Save"
          hideBackButton
        />
      </View>
    </Modal>
  );
};

export default OptionalQuestionModal;
