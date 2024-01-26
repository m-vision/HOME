import React from "react";
import { SafeAreaView, TouchableOpacity, View } from "react-native";
import { User, useCurrentUserQuery } from "../../../graphql-types/src/graphql";
import ProfileCard from "../../../components/Home/ProfileCard";
import ShimmerImageLoader from "../../../components/ShimmerImageLoader";
import { useRouter } from "expo-router";

const Home = () => {
  const router = useRouter();
  const { data } = useCurrentUserQuery();

  return (
    <SafeAreaView className="bg-lightPurple-50 flex-1">
      <View className="flex px-4">
        <View className="my-2">
          {data && data.me.profile?.photos[0] && (
            <TouchableOpacity
              className="w-[50px] h-[50px]"
              onPress={() => {
                console.log("Pressed");
                router.push("/profile");
              }}
            >
              <ShimmerImageLoader
                source={{
                  uri: data?.me.profile?.photos[0] ?? "",
                  cache: "force-cache",
                }}
                customClassName="rounded-full"
              />
            </TouchableOpacity>
          )}
        </View>
        <View className="mt-4 p-2 bg-white rounded-3xl h-[600px]">
          {data && data.me.profile?.photos[0] && (
            <ProfileCard user={data?.me as User} />
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Home;
