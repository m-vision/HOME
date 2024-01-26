import GenderSelection from "./GenderSelection";
import ProfileModal from "./ProfileModal";
import * as Sentry from "sentry-expo";
import React, { useState } from "react";
import { useToast } from "react-native-toast-notifications";
import {
  Gender,
  useUpdateGenderMutation,
} from "../../graphql-types/src/graphql";

interface Props {
  initialSelectedGender?: Gender;
  onSuccess: () => void;
  onClose: () => void;
}

const GenderSelectionModal = ({
  initialSelectedGender,
  onSuccess,
  onClose,
}: Props) => {
  const [selectedGender, setSelectedGender] = useState<Gender | undefined>(
    initialSelectedGender
  );
  const [hasErrors, setHasErrors] = useState(false);
  const [updateGender] = useUpdateGenderMutation();
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const onSave = async () => {
    setHasErrors(false);

    if (selectedGender === undefined) {
      setHasErrors(true);
      return;
    }

    try {
      setIsLoading(true);
      const result = await updateGender({
        variables: {
          gender: selectedGender,
        },
      });

      if (result.errors || result.data?.updateGender === undefined) {
        toast.show("", {
          type: "error",
        });
        Sentry.Native.captureException(result.errors);
        setIsLoading(false);
        return;
      }
      setIsLoading(false);
      onSuccess();
    } catch (error) {
      toast.show("", {
        type: "error",
      });
      Sentry.Native.captureException(error);
      setIsLoading(false);
    }
  };

  return (
    <ProfileModal
      onClose={onClose}
      onSave={onSave}
      disabled={selectedGender === undefined}
      isLoading={isLoading}
    >
      <GenderSelection
        onSelectGender={setSelectedGender}
        selectedGender={selectedGender}
        hasErrors={hasErrors}
      />
    </ProfileModal>
  );
};

export default GenderSelectionModal;
