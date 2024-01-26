import { Octicons } from "@expo/vector-icons";
import { Text, TouchableOpacity } from "react-native";
import { useRouter, type Route } from "expo-router";

interface Props {
  label: string | null;
  value?: string | null;
  path?: string;
  onPress?: () => void;
  hideChevron?: boolean;
}

const InfoChevronLink: React.FC<Props> = ({
  label,
  value,
  path,
  hideChevron,
  onPress,
}) => {
  const router = useRouter();
  return (
    <TouchableOpacity
      onPress={
        !hideChevron
          ? onPress || (() => router.push(path as Route<string>))
          : () => {}
      }
      className="py-4 border-b border-neutral-100 bg-white px-5 justify-between items-center flex-row"
    >
      <Text className="text-base font-esbuild-regular">{label}</Text>
      <Text
        className="text-darkPurple-900 opacity-60 capitalize max-w-[200px] font-esbuild-regular"
        numberOfLines={1}
      >
        <Text className="font-esbuild-regular text-base">
          {value} {"  "}
        </Text>
        {hideChevron ? null : <Octicons name="chevron-right" size={14} />}
      </Text>
    </TouchableOpacity>
  );
};

export default InfoChevronLink;
