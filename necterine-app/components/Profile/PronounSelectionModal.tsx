import ProfileModal from "./ProfileModal";
import PronounsSelection from "./PronounsSelection";
import * as Sentry from "sentry-expo";
import { useState } from "react";
import { useToast } from "react-native-toast-notifications";
import {
  Pronoun,
  useUpdatePronounsMutation,
} from "../../graphql-types/src/graphql";

interface Props {
  initialPronouns?: Pronoun[] | null;
  initialDisplayPronouns?: boolean;
  onSuccess: () => void;
  onClose: () => void;
}

const PronounSelectionModal = ({
  initialPronouns,
  initialDisplayPronouns,
  onSuccess,
  onClose,
}: Props) => {
  const [selectedPronouns, setSelectedPronouns] = useState<Pronoun[]>(
    initialPronouns ?? []
  );
  const [displayPronouns, setDisplayPronouns] = useState(
    !!initialDisplayPronouns
  );
  const [updatePronouns] = useUpdatePronounsMutation();
  const [hasErrors, setHasErrors] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const onSave = async () => {
    setHasErrors(false);

    if (selectedPronouns.length === 0) {
      setHasErrors(true);
      return;
    }
    try {
      setIsLoading(true);
      const result = await updatePronouns({
        variables: {
          pronouns: selectedPronouns,
          displayPronouns,
        },
      });

      if (result.errors || result.data?.updatePronouns === undefined) {
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
      disabled={selectedPronouns.length === 0}
      isLoading={isLoading}
    >
      <PronounsSelection
        selectedPronouns={selectedPronouns as Pronoun[]}
        onSelectPronouns={setSelectedPronouns}
        displayPronouns={displayPronouns}
        onChangeDisplayPronouns={setDisplayPronouns}
        hasErrors={hasErrors}
      />
    </ProfileModal>
  );
};

export default PronounSelectionModal;
