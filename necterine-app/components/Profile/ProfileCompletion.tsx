import { Text, View } from "react-native";
import { Bar as ProgressBar } from "react-native-progress";
import theme from "../../utils/theme";

export interface Props {
  profileCompletionRate: number;
}

const ProfileCompletion = ({ profileCompletionRate }: Props) => {
  return (
    <View className="px-5 py-6 bg-violet-100 rounded-lg flex-col justify-start items-start inline-flex">
      <View className="flex-row justify-between mb-2">
        <View className="flex-col justify-center">
          <View className="flex-row mb-0.5">
            <Text className="text-[10px] mt-0.5 mr-1">✅</Text>
            <Text className="text-neutral-900 opacity-60 text-xs font-esbuild-regular">
              You’re almost there!
            </Text>
          </View>
          <Text className="text-darkPurple-900 text-[18px] font-esbuild-semibold">
            Complete your profile
          </Text>
        </View>
        <View className="grow shrink basis-0 flex-col justify-start items-end">
          <Text className="text-neutral-900 opacity-60 text-xs font-esbuild-regular mb-2">
            {profileCompletionRate}% complete
          </Text>
          <View className="w-[107px] h-2 relative bg-violet-200 rounded-xl">
            <ProgressBar
              progress={profileCompletionRate / 100}
              width={null}
              borderRadius={12}
              borderWidth={0}
              unfilledColor={theme.extend.colors.lightPurple[400]}
              color={theme.extend.colors.darkPurple[500]}
              height={8}
              animated
            />
          </View>
        </View>
      </View>
      <Text className="self-stretch text-darkPurple-900 opacity-50 text-base font-esbuild-regular">
        Completing your profile helps you get better matches
      </Text>
    </View>
  );
};

export default ProfileCompletion;
