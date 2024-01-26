import { useAuth } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import theme from "../../../utils/theme";

const TabsPage = () => {
  const { isSignedIn } = useAuth();

  return (
    <Tabs
      screenOptions={{
        headerStyle: {
          backgroundColor: "#ffffff",
        },
        headerTintColor: theme.extend.colors.darkPurple[500],
        headerTitleStyle: {
          fontFamily: "esbuild-semibold",
          fontSize: 18,
        },
        tabBarActiveTintColor: theme.extend.colors.darkPurple[500],
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="people-outline"
              size={24}
              color={focused ? theme.extend.colors.darkPurple[500] : "#8F8F8F"}
            />
          ),
          tabBarLabel: "Discovery",
        }}
        redirect={!isSignedIn}
      />
      <Tabs.Screen
        name="settings"
        options={{
          headerTitle: "Settings",
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="settings-outline"
              size={24}
              color={focused ? theme.extend.colors.darkPurple[500] : "#8F8F8F"}
            />
          ),
          tabBarLabel: "Settings",
        }}
        redirect={!isSignedIn}
      />
    </Tabs>
  );
};

export default TabsPage;
