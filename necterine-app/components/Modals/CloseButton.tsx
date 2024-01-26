import { Octicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";

export interface CloseButtonModalProps {
  closeModal: () => void;
}

const CloseButtonModal = ({ closeModal }: CloseButtonModalProps) => {
  return (
    <TouchableOpacity
      className="bg-lightPurple-200 py-1.5 px-2.5 rounded-full"
      onPress={closeModal}
    >
      <Octicons name="x" size={16} color="#111827" />
    </TouchableOpacity>
  );
};

export default CloseButtonModal;
