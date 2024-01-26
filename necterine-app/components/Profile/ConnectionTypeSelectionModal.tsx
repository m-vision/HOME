import ConnectionTypeSelection from "./ConnectionTypeSelection";
import ProfileModal from "./ProfileModal";
import * as Sentry from "sentry-expo";
import { useState } from "react";
import { useToast } from "react-native-toast-notifications";
import {
  Connection_Type,
  useUpdatePreferredConnectionTypeMutation,
} from "../../graphql-types/src/graphql";

interface Props {
  initialConnectionType: Connection_Type | undefined;
  onClose: () => void;
  onSuccess: () => void;
}

const ConnectionTypeSelectionModal = ({
  initialConnectionType,
  onClose,
  onSuccess,
}: Props) => {
  const [selectedConnectionType, setSelectedConnectionType] = useState<
    Connection_Type | undefined
  >(initialConnectionType);
  const [updatePreferredConnectionType] =
    useUpdatePreferredConnectionTypeMutation();
  const [hasErrors, setHasErrors] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const onSave = async () => {
    setHasErrors(false);

    if (selectedConnectionType === undefined) {
      setHasErrors(true);
      return;
    }
    try {
      setIsLoading(true);
      const result = await updatePreferredConnectionType({
        variables: {
          preferredConnectionType: selectedConnectionType,
        },
      });

      if (
        result.errors ||
        result.data?.updatePreferredConnectionType === undefined
      ) {
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
      disabled={selectedConnectionType === undefined}
      isLoading={isLoading}
      onSave={onSave}
      onClose={onClose}
    >
      <ConnectionTypeSelection
        selectedConnectionType={selectedConnectionType}
        onSelectConnectionType={setSelectedConnectionType}
        hasErrors={hasErrors}
      />
    </ProfileModal>
  );
};

export default ConnectionTypeSelectionModal;
