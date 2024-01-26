import { Connection_Type, User } from "graphql-types/src/graphql";
import { View, TouchableOpacity } from "react-native";
import ShimmerImageLoader from "../ShimmerImageLoader";
import Chip from "../Chip";
import Text from "../Text";
import PersonIcon from "../../assets/svg/person-icon.svg";
import SparklesIcon from "../../assets/svg/sparkles-icon.svg";
import ChatIcon from "../../assets/svg/chat-icon.svg";
import CakeIcon from "../../assets/svg/cake-icon.svg";
import HeartIcon from "../../assets/svg/heart-icon.svg";
import DislikeButton from "../../assets/svg/dislike-button.svg";
import LikeButton from "../../assets/svg/like-button.svg";
import {
  getAgeFromBirthdate,
  getReadableConnectionTypes,
  getReadablePronoun,
} from "../../utils/helpers";
import BackgroundShapeOne from "../../assets/svg/background-shape-one.svg";
import BackgroundShapeTwo from "../../assets/svg/background-shape-two.svg";
import BackgroundShapeThree from "../../assets/svg/background-shape-three.svg";
import BackgroundShapeFour from "../../assets/svg/background-shape-four.svg";
import ProfilePresentationMedia from "./ProfilePresentationMedia";

interface Props {
  user: User;
  allowActions: boolean;
}

const ProfilePresentation = ({ user, allowActions }: Props) => {
  const { profile, matchPreferences, gender } = user ?? {};

  const {
    questionnaireAnswers,
    sexualOrientation,
    displaySexualOrientation,
    pronouns,
    displayPronouns,
    photos,
  } = profile ?? {};

  const answers = questionnaireAnswers ?? [];

  const { preferredConnectionType } = matchPreferences ?? {};

  const photosWithoutCover = photos?.slice(1);

  const maxLength = Math.max(photosWithoutCover.length, answers.length);

  const renderContent = () => {
    let content = [];

    for (let i = 0; i < maxLength; i++) {
      const photo = photosWithoutCover[i];
      const answer = answers[i];

      if (photo || answer) {
        content.push(
          <View key={`item-${i}`} className="my-5">
            {i === 0 && (
              <BackgroundShapeOne
                width={window.innerWidth}
                style={{
                  zIndex: -1,
                  position: "absolute",
                  top: 100,
                }}
              />
            )}
            {i === 1 && (
              <BackgroundShapeTwo
                width={window.innerWidth}
                style={{
                  zIndex: -1,
                  position: "absolute",
                  top: 200,
                }}
              />
            )}
            {i === 2 && (
              <BackgroundShapeThree
                width={window.innerWidth}
                style={{
                  zIndex: -1,
                  position: "absolute",
                  top: 300,
                }}
              />
            )}
            {photo && (
              <View className="px-5">
                <ProfilePresentationMedia
                  fileUrl={photosWithoutCover[i]}
                  addMarginTop={!!answer}
                />
              </View>
            )}
            {answer && (
              <Text className="text-darkPurple-800 text-2xl font-esbuild-semibold px-5">
                {answer.questionnaireQuestion?.affirmativeForm.replace(
                  "{response}",
                  answer.title
                )}
              </Text>
            )}
          </View>
        );
      }
    }

    return content;
  };

  const onDislike = () => {
    if (!allowActions) {
      return;
    }
  };

  const onLike = () => {
    if (!allowActions) {
      return;
    }
  };

  return (
    <View className="flex-1 mb-8">
      <View className="px-5 mt-3">
        <ShimmerImageLoader
          source={{ uri: photos[0], cache: "force-cache" }}
          customClassName="w-full h-[440px] rounded-3xl"
        />
        <View className="absolute px-2 py-1 left-4 bottom-4 flex-row rounded-md text-xs">
          <Text className="text-4xl text-white font-esbuild-semibold ml-4">
            {user.name?.split(" ")[0]}
          </Text>
        </View>
      </View>
      <View className="mt-10 px-5">
        <Text className="text-[18px] text-darkPurple-900 font-esbuild-semibold mb-3">
          About me
        </Text>
        <View className="flex-row flex-wrap gap-3">
          <Chip title={gender ?? ""} Icon={PersonIcon} />
          {displaySexualOrientation && (
            <Chip title={sexualOrientation ?? ""} Icon={SparklesIcon} />
          )}
          {displayPronouns &&
            pronouns?.map((pronoun) => {
              return (
                <Chip
                  key={pronoun}
                  title={getReadablePronoun(pronoun)}
                  Icon={ChatIcon}
                />
              );
            })}
          <Chip
            title={getReadableConnectionTypes(
              preferredConnectionType as Connection_Type
            )}
            Icon={HeartIcon}
          />
          <Chip
            title={getAgeFromBirthdate(user.dateOfBirth).toString()}
            Icon={CakeIcon}
          />
        </View>
        {profile.bio && (
          <Text className="text-darkPurple-900 text-base mt-6">
            {profile.bio}
          </Text>
        )}
      </View>
      <View className="mt-5">{renderContent()}</View>
      <BackgroundShapeFour
        width={window.innerWidth}
        style={{ zIndex: -1, position: "absolute", top: 500 }}
      />
      <View className="flex-row flex-wrap justify-center gap-6 mt-1">
        <TouchableOpacity
          onPress={() => onDislike()}
          className="bg-white rounded-full p-3 justify-center items-center"
        >
          <DislikeButton width={36} height={36} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => onLike()}
          className="bg-darkPurple-500 rounded-full p-3 justify-center items-center"
        >
          <LikeButton width={36} height={36} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProfilePresentation;
