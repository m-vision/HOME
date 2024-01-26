import * as Sentry from "sentry-expo";
import { useEffect, useState } from "react";
import {
  NativeSyntheticEvent,
  Text,
  TextInput,
  TextInputChangeEventData,
  View,
} from "react-native";
import { useUpdateBioMutation } from "../graphql-types/src/graphql";

const MAX_BIO_LENGTH = 500;

const DEBOUCE_TIME_MILLISECONDS = 500;

interface Props {
  initialValue?: string | null;
  onSuccessCallback?: () => void;
}

const BioInput: React.FC<Props> = ({ initialValue, onSuccessCallback }) => {
  const [inputValue, setInputValue] = useState(initialValue || "");

  const [updateBio] = useUpdateBioMutation();

  const handleInputChange = (
    event: NativeSyntheticEvent<TextInputChangeEventData>
  ) => {
    setInputValue(event.nativeEvent.text);
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (inputValue === initialValue) return;
      save(inputValue);
    }, DEBOUCE_TIME_MILLISECONDS);
    return () => clearTimeout(timeoutId);
  }, [inputValue]);

  const save = async (inputValue: string) => {
    try {
      const result = await updateBio({ variables: { bio: inputValue } });

      if (result.errors) {
        Sentry.Native.captureException(result.errors);
        return;
      }

      onSuccessCallback?.();
    } catch (error) {
      Sentry.Native.captureException(error);
    }
  };

  return (
    <View>
      <TextInput
        placeholder="A little bit about you..."
        value={inputValue}
        onChange={handleInputChange}
        className="font-esbuild-regular text-sm border border-zinc-300 rounded-[14.55px] px-4 py-2 mb-4 min-h-[116px] bg-white"
        multiline
        maxLength={MAX_BIO_LENGTH}
      />
      <Text className="absolute right-3 bottom-6 text-zinc-300 text-sm">
        {MAX_BIO_LENGTH - inputValue.length}
      </Text>
    </View>
  );
};

export default BioInput;
