import React from "react";
import { View } from "react-native";
import { WebView } from "react-native-webview";

const WebViewScreen = ({ url }: { url: string }) => {
  return (
    <View className="flex-1 w-full">
      <WebView
        source={{ uri: url }}
        className="flex-1 w-full"
        startInLoadingState={true}
        scalesPageToFit={true}
        automaticallyAdjustContentInsets={true}
      />
    </View>
  );
};

export default WebViewScreen;
