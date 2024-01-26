import BioInput from "../../../components/BioInput";
import CardChevron from "../../../components/CardChevron";
import InfoChevronLink from "../../../components/InfoChevronLink";
import OptionalQuestionModal from "../../../components/Modals/OptionalQuestionModal";
import AgeRangeSelectionModal from "../../../components/Profile/AgeRangeSelectionModal";
import ConnectionTypeSelectionModal from "../../../components/Profile/ConnectionTypeSelectionModal";
import GenderPreferencesSelectionModal from "../../../components/Profile/GenderPreferencesSelectionModal";
import GenderSelectionModal from "../../../components/Profile/GenderSelectionModal";
import PhotosAndVideos from "../../../components/Profile/PhotosAndVideos";
import ProfileCompletion from "../../../components/Profile/ProfileCompletion";
import PronounSelectionModal from "../../../components/Profile/PronounSelectionModal";
import SexualOrientationSelectionModal from "../../../components/Profile/SexualOrientationSelectionModal";
import { ONBOARDING_QUESTIONNAIRE_ID } from "../../../utils/constants";
import {
  getReadableConnectionTypes,
  getReadableGender,
  getReadablePronoun,
} from "../../../utils/helpers";
import { useMemo, useState } from "react";
import { ScrollView, View } from "react-native";
import { useToast } from "react-native-toast-notifications";
import {
  Connection_Type,
  Gender,
  useCurrentUserQuery,
  useGetQuestionnaireQuery,
} from "../../../graphql-types/src/graphql";
import Text from "../../../components/Text";

const ProfileTab = ({
  updateLoadingState,
  loadingState,
}: {
  updateLoadingState: (value: React.SetStateAction<number[]>) => void;
  loadingState: number[];
}) => {
  const { data, refetch } = useCurrentUserQuery();
  const questionnaireResult = useGetQuestionnaireQuery({
    variables: { questionnaireId: ONBOARDING_QUESTIONNAIRE_ID },
  });
  const [editingQuestionId, setEditingQuestionId] = useState<string | null>();
  const [showGenderSelectionModal, setShowGenderSelectionModal] =
    useState(false);
  const [showSexualOrientationModal, setShowSexualOrientationModal] =
    useState(false);
  const [showPronounsModal, setShowPronounsModal] = useState(false);
  const [showGenderPreferencesModal, setShowGenderPreferencesModal] =
    useState(false);
  const [showConnectionTypeModal, setShowConnectionTypeModal] = useState(false);
  const [showAgeRangeModal, setShowAgeRangeModal] = useState(false);

  const toast = useToast();

  const { profile, matchPreferences, id } = data?.me ?? {};

  const {
    questionnaireAnswers,
    sexualOrientation,
    displaySexualOrientation,
    pronouns,
    displayPronouns,
    photos,
  } = profile ?? {};

  const gender = data?.me.gender;
  const answers = questionnaireAnswers ?? [];

  const {
    genderPreferences,
    displayGenderPreferences,
    preferredConnectionType,
    maxAge,
    minAge,
  } = matchPreferences ?? {};

  const initialProfileCompletion = 50;

  const profileCompletionRate = useMemo(
    () =>
      initialProfileCompletion + answers.length * 5 + (!!profile?.bio ? 20 : 0),
    [profile]
  );

  const questionaireProfileLinks =
    questionnaireResult.data?.getQuestionnaire?.questionnaireQuestions?.map(
      (q) => ({
        id: q.id,
        title: q.title,
      })
    ) || [];

  const showSuccessToast = () => {
    toast.show("Profile updated successfully", {
      type: "success",
    });
  };

  return (
    <ScrollView className="flex-1 p-5 bg-neutral-50">
      {/* Profile completion */}
      {profileCompletionRate < 100 && (
        <View className="mb-8">
          <ProfileCompletion profileCompletionRate={profileCompletionRate} />
        </View>
      )}

      <View className="mb-14">
        {id && photos && (
          <PhotosAndVideos
            userId={id}
            photos={photos}
            onUpdatePhotos={refetch}
            updateLoadingState={(isLoading) => updateLoadingState(isLoading)}
            loadingState={loadingState}
          />
        )}
      </View>

      {/* Your bio */}
      <View className="mb-14">
        <Text className="mb-2 text-[18px] font-esbuild-semibold text-darkPurple-900">
          Your bio
        </Text>
        <BioInput initialValue={profile?.bio} onSuccessCallback={refetch} />
      </View>

      {/* Personal information */}
      <View className="mb-14 mx-[-20px]">
        <Text className="text-[18px] font-esbuild-semibold text-darkPurple-900 mb-4 px-5">
          Personal Information
        </Text>

        <InfoChevronLink
          label="Gender"
          value={gender && getReadableGender(gender)}
          onPress={() => setShowGenderSelectionModal(true)}
        />

        <InfoChevronLink
          label="Sexual orientation"
          value={sexualOrientation}
          onPress={() => setShowSexualOrientationModal(true)}
        />
        <InfoChevronLink label="Location" value="Los Angeles" hideChevron />
        <InfoChevronLink
          label="Pronouns"
          value={
            !!pronouns?.length
              ? pronouns.map((p) => getReadablePronoun(p)).join(", ")
              : ""
          }
          onPress={() => setShowPronounsModal(true)}
        />
      </View>

      <View className="mb-14 mx-[-20px]">
        <Text className="text-[18px] font-esbuild-semibold text-darkPurple-900 mb-2 px-4">
          Preferences
        </Text>
        <InfoChevronLink
          label="Interested in"
          value={
            !!genderPreferences?.length ? genderPreferences.join(", ") : ""
          }
          onPress={() => setShowGenderPreferencesModal(true)}
        />
        <InfoChevronLink
          label="Looking for"
          value={
            preferredConnectionType &&
            getReadableConnectionTypes(preferredConnectionType)
          }
          onPress={() => setShowConnectionTypeModal(true)}
        />
        <InfoChevronLink
          label="Age range"
          value={`${minAge} - ${maxAge}`}
          onPress={() => setShowAgeRangeModal(true)}
        />
      </View>

      {/* More about me */}
      <Text className="text-[18px] font-esbuild-semibold text-darkPurple-900 mb-2">
        More about you
      </Text>
      <Text className="mb-4 text-darkPurple-900 opacity-60 text-base font-esbuild-regular">
        This is the chance to express your unique self.
      </Text>

      {questionaireProfileLinks.map((link) => (
        <CardChevron
          key={link.title}
          title={link.title}
          subtitle={
            answers.find((a) => a.questionId === link.id)?.title ??
            "Choose Answer"
          }
          onPress={() => setEditingQuestionId(link.id)}
        />
      ))}

      <OptionalQuestionModal
        questionId={editingQuestionId}
        selectedAnswerId={
          answers.find((a) => a.questionId === editingQuestionId)?.id
        }
        onSuccess={() => {
          showSuccessToast();
          setEditingQuestionId(null);
          refetch();
        }}
        onClose={() => setEditingQuestionId(null)}
      />

      {showGenderSelectionModal && (
        <GenderSelectionModal
          initialSelectedGender={gender as Gender}
          onSuccess={() => {
            showSuccessToast();
            refetch();
            setShowGenderSelectionModal(false);
          }}
          onClose={() => setShowGenderSelectionModal(false)}
        />
      )}

      {showSexualOrientationModal && (
        <SexualOrientationSelectionModal
          initialSelectedOrientation={sexualOrientation}
          initialDisplaySexualOrientation={!!displaySexualOrientation}
          onClose={() => setShowSexualOrientationModal(false)}
          onSuccess={() => {
            showSuccessToast();
            refetch();
            setShowSexualOrientationModal(false);
          }}
        />
      )}

      {showPronounsModal && (
        <PronounSelectionModal
          initialPronouns={pronouns}
          initialDisplayPronouns={!!displayPronouns}
          onClose={() => setShowPronounsModal(false)}
          onSuccess={() => {
            showSuccessToast();
            refetch();
            setShowPronounsModal(false);
          }}
        />
      )}

      {showGenderPreferencesModal && (
        <GenderPreferencesSelectionModal
          initialGenderPreferences={genderPreferences}
          initialDisplayGenderPreferences={!!displayGenderPreferences}
          onClose={() => setShowGenderPreferencesModal(false)}
          onSuccess={() => {
            showSuccessToast();
            refetch();
            setShowGenderPreferencesModal(false);
          }}
        />
      )}

      {showConnectionTypeModal && (
        <ConnectionTypeSelectionModal
          initialConnectionType={preferredConnectionType as Connection_Type}
          onClose={() => setShowConnectionTypeModal(false)}
          onSuccess={() => {
            showSuccessToast();
            refetch();
            setShowConnectionTypeModal(false);
          }}
        />
      )}

      {showAgeRangeModal && (
        <AgeRangeSelectionModal
          initialAgeRange={[minAge, maxAge] as [number, number]}
          onClose={() => setShowAgeRangeModal(false)}
          onSuccess={() => {
            showSuccessToast();
            refetch();
            setShowAgeRangeModal(false);
          }}
        />
      )}

      <View className="mb-20"></View>
    </ScrollView>
  );
};

export default ProfileTab;
