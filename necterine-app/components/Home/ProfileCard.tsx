import { LinearGradient } from "expo-linear-gradient";
import { TouchableOpacity, View } from "react-native";
import Text from "../Text";
import ShimmerImageLoader from "../ShimmerImageLoader";
import DislikeButton from "../../assets/svg/dislike-button.svg";
import LikeButton from "../../assets/svg/like-button.svg";
import { getAgeFromBirthdate } from "../../utils/helpers";
import { User } from "graphql-types/src/graphql";
import CircularScore from "./CircularScore";

interface ProfileCardProps {
  user: User;
}

const ProfileCard = ({ user }: ProfileCardProps) => {
  return (
    <View className="relative h-full">
      <ShimmerImageLoader
        source={{
          uri: user.profile?.photos[0] ?? "",
          cache: "force-cache",
        }}
        customClassName="w-full h-full rounded-3xl"
      />

      {/* Distance Chip */}
      <View className="absolute top-4 left-4 bg-black/30 rounded-full px-3 py-1.5">
        <Text className="text-base font-esbuild-medium text-white">
          2.5 Mi away
        </Text>
      </View>

      {/* Match Percentage Chip */}
      <View className="absolute top-4 right-4">
        <CircularScore size={45} strokeWidth={3} percentage={85} />
      </View>

      <LinearGradient
        className="rounded-3xl"
        colors={["transparent", "rgba(0,0,0,0.65)", "rgba(0,0,0,0.80)"]}
        start={{ x: 0.5, y: 0.6 }}
        end={{ x: 0.5, y: 1 }}
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          height: "100%",
        }}
      />
      {/* Absolute positioned overlay */}
      <View className="absolute inset-x-0 bottom-0 pb-4 px-5">
        {/* Centered content container */}
        <View className="flex flex-col items-center">
          {/* Name and Age */}
          <Text className="text-2xl text-white font-esbuild-semibold">
            {user.name}, {getAgeFromBirthdate(user.dateOfBirth).toString()}
          </Text>
          {/* Location */}
          <Text className="text-lg text-white">Los Angeles</Text>
          {/* Action buttons */}
          <View className="flex-row justify-center gap-4 mt-2">
            <TouchableOpacity className="bg-white p-3 rounded-full">
              <DislikeButton width={26} height={26} />
            </TouchableOpacity>
            <TouchableOpacity className="bg-darkPurple-500 p-3 rounded-full">
              <LikeButton width={26} height={26} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ProfileCard;
