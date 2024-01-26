import AgeRangeSelection from "./AgeRangeSelection";
import ProfileModal from "./ProfileModal";
import * as Sentry from "sentry-expo";
import { useState } from "react";
import { useToast } from "react-native-toast-notifications";
import { useUpdateAgeRangeMutation } from "../../graphql-types/src/graphql";

interface Props {
  initialAgeRange?: [number, number];
  onClose: () => void;
  onSuccess: () => void;
}

const AgeRangeSelectionModal = ({
  initialAgeRange,
  onClose,
  onSuccess,
}: Props) => {
  const [ageRange, setAgeRange] = useState(initialAgeRange);
  const [updateAgeRange] = useUpdateAgeRangeMutation();
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const onSave = async () => {
    try {
      setIsLoading(true);
      const result = await updateAgeRange({
        variables: {
          minAge: ageRange![0],
          maxAge: ageRange![1]!,
        },
      });

      if (result.errors || result.data?.updateAgeRange === undefined) {
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
      disabled={ageRange === undefined}
      isLoading={isLoading}
    >
      <AgeRangeSelection
        ageRange={ageRange as [number, number]}
        onChange={setAgeRange}
      />
    </ProfileModal>
  );
};

export default AgeRangeSelectionModal;
