import { SafeAreaView, ScrollView } from "react-native";
import { User, useCurrentUserQuery } from "../../../graphql-types/src/graphql";
import ProfilePresentation from "../../../components/Profile/ProfilePresentation";

const PreviewTab = () => {
  const { data } = useCurrentUserQuery();

  return (
    <SafeAreaView className="flex-1">
      <ScrollView className="flex-1 bg-white">
        <ProfilePresentation user={data?.me as User} allowActions={false} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default PreviewTab;
