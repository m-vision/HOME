import ProfileModal from "./ProfileModal";
import SexualOrientationSelection from "./SexualOrientationSelection";
import PrimaryButton from "../Buttons/PrimaryButton";
import CloseButton from "../Modals/CloseButton";
import * as Sentry from "sentry-expo";
import React, { useState } from "react";
import { Modal, View } from "react-native";
import { useToast } from "react-native-toast-notifications";
import {
  Sexual_Orientation,
  useUpdateSexualOrientationMutation,
} from "../../graphql-types/src/graphql";

interface Props {
  initialSelectedOrientation?: Sexual_Orientation | null;
  initialDisplaySexualOrientation: boolean;
  onSuccess: () => void;
  onClose: () => void;
}

const SexualOrientationSelectionModal = ({
  initialSelectedOrientation,
  initialDisplaySexualOrientation,
  onSuccess,
  onClose,
}: Props) => {
  const [selectedOrientation, setSelectedOrientation] = useState<
    Sexual_Orientation | undefined | null
  >(initialSelectedOrientation);
  const [displaySexualOrientation, setDisplaySexualOrientation] = useState(
    initialDisplaySexualOrientation
  );
  const [hasErrors, setHasErrors] = useState(false);
  const [updateSexualOrientation] = useUpdateSexualOrientationMutation();
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const onSave = async () => {
    setHasErrors(false);

    if (selectedOrientation === undefined) {
      setHasErrors(true);
      return;
    }
    try {
      setIsLoading(true);
      const result = await updateSexualOrientation({
        variables: {
          sexualOrientation: selectedOrientation as Sexual_Orientation,
          displaySexualOrientation,
        },
      });

      if (result.errors || result.data?.updateSexualOrientation === undefined) {
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
      disabled={selectedOrientation === undefined}
      isLoading={isLoading}
    >
      <SexualOrientationSelection
        selectedOrientation={selectedOrientation as Sexual_Orientation}
        onSelectOrientation={setSelectedOrientation}
        displaySexualOrientation={displaySexualOrientation}
        onSelectDisplaySexualOrientation={setDisplaySexualOrientation}
        hasErrors={hasErrors}
      />
    </ProfileModal>
  );
};

export default SexualOrientationSelectionModal;
