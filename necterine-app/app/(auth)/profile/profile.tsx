import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import ProfileTab from "./profile_tab";
import PreviewTab from "./preview_tab";
import { SafeAreaView, TouchableOpacity, View } from "react-native";
import Text from "../../../components/Text";
import { useRouter } from "expo-router";
import { useMemo, useState } from "react";
import theme from "../../../utils/theme";

const Tab = createMaterialTopTabNavigator();

export default function Profile() {
  const router = useRouter();
  const [isUploadingMediaIndexes, setIsUploadingMediaIndexes] = useState<
    number[]
  >([]);

  const profileTabProps = {
    updateLoadingState: (value: React.SetStateAction<number[]>) =>
      setIsUploadingMediaIndexes(value),
    loadingState: isUploadingMediaIndexes,
  };

  const ProfileTabComponent = () => {
    return <ProfileTab {...profileTabProps} />;
  };

  const ProfileTabMemoized = useMemo(
    () => ProfileTabComponent,
    [isUploadingMediaIndexes]
  );

  const PreviewTabComponent = () => {
    return <PreviewTab />;
  };

  const PreviewTabMemoized = useMemo(() => PreviewTabComponent, []);

  return (
    <SafeAreaView className="flex-1">
      <View className="p-4 items-center">
        <Text className="font-esbuild-semibold text-lg text-darkPurple-600">
          Your Profile
        </Text>
        <TouchableOpacity
          onPress={() => router.replace("/home")}
          disabled={isUploadingMediaIndexes.length > 0}
          className="absolute right-0 px-4 py-5"
        >
          <Text
            className={`text-base font-esbuild-regular ${
              isUploadingMediaIndexes.length > 0 && "opacity-10"
            }`}
          >
            Done
          </Text>
        </TouchableOpacity>
      </View>
      <Tab.Navigator>
        <Tab.Screen
          name="Edit"
          component={ProfileTabMemoized}
          options={{
            tabBarLabelStyle: {
              fontFamily: "esbuild-medium",
              fontSize: 16,
              textTransform: "none",
            },
            tabBarIndicatorStyle: {
              backgroundColor: theme.extend.colors.darkPurple[600],
            },
            tabBarInactiveTintColor: "#8F8F8F",
            tabBarActiveTintColor: theme.extend.colors.darkPurple[600],
          }}
        />
        <Tab.Screen
          name="Preview"
          component={PreviewTabMemoized}
          options={{
            tabBarLabelStyle: {
              fontFamily: "esbuild-medium",
              fontSize: 16,
              textTransform: "none",
            },
            tabBarIndicatorStyle: {
              backgroundColor: theme.extend.colors.darkPurple[600],
            },
            tabBarInactiveTintColor: "#8F8F8F",
            tabBarActiveTintColor: theme.extend.colors.darkPurple[600],
          }}
        />
      </Tab.Navigator>
    </SafeAreaView>
  );
}
