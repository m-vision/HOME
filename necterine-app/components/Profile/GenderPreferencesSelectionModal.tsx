import GenderPreferencesSelection from "./GenderPreferencesSelection";
import ProfileModal from "./ProfileModal";
import * as Sentry from "sentry-expo";
import { useState } from "react";
import { useToast } from "react-native-toast-notifications";
import {
  Gender,
  useUpdateGenderPreferencesMutation,
} from "../../graphql-types/src/graphql";

interface Props {
  initialGenderPreferences?: Gender[] | null;
  initialDisplayGenderPreferences?: boolean;
  onSuccess: () => void;
  onClose: () => void;
}

const GenderPreferencesSelectionModal = ({
  initialGenderPreferences,
  initialDisplayGenderPreferences,
  onSuccess,
  onClose,
}: Props) => {
  const [selectedGenders, setSelectedGenders] = useState<Gender[]>(
    initialGenderPreferences ?? []
  );
  const [updateGenderPreferences] = useUpdateGenderPreferencesMutation();
  const [hasErrors, setHasErrors] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [displayGenderPreferences, setDisplayGenderPreferences] = useState(
    !!initialDisplayGenderPreferences
  );
  const toast = useToast();

  const onSave = async () => {
    setHasErrors(false);

    if (selectedGenders.length === 0) {
      setHasErrors(true);
      return;
    }
    try {
      setIsLoading(true);
      const result = await updateGenderPreferences({
        variables: {
          genderPreferences: selectedGenders,
          displayGenderPreferences,
        },
      });

      if (result.errors || result.data?.updateGenderPreferences === undefined) {
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
      disabled={selectedGenders.length === 0}
      isLoading={isLoading}
    >
      <GenderPreferencesSelection
        selectedGenders={selectedGenders}
        onSelectGenders={setSelectedGenders}
        displayGenderPreferences={displayGenderPreferences}
        onChangeDisplayGenderPreferences={setDisplayGenderPreferences}
        hasErrors={hasErrors}
      />
    </ProfileModal>
  );
};
export default GenderPreferencesSelectionModal;
