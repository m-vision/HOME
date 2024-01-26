import React, { memo, useState } from "react";
import { View, Animated, Easing, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { cn } from "../utils/helpers";
import theme from "../utils/theme";
import { Video, ResizeMode } from "expo-av";
import { Ionicons } from "@expo/vector-icons";

interface ShimmerEffectProps {
  style: any;
}

const ShimmerEffect = ({ style }: ShimmerEffectProps) => {
  const animatedValue = new Animated.Value(0);

  Animated.loop(
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 1000,
      easing: Easing.linear,
      useNativeDriver: true,
    })
  ).start();

  const translateX = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [-200, 200],
  });

  return (
    <Animated.View
      style={[style, { transform: [{ translateX }], position: "absolute" }]}
    >
      <LinearGradient
        colors={[
          theme.extend.colors.lightPurple[100],
          theme.extend.colors.lightPurple[200],
          theme.extend.colors.lightPurple[100],
        ]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={{ ...style, position: "relative" }}
      />
    </Animated.View>
  );
};

interface ShimmerVideoThumbnailLoaderProps {
  source: {
    uri: string;
    cache: "force-cache" | "default" | "reload" | "only-if-cached";
  };
  customClassName?: string;
  borderRadius?: number;
  playPauseButtonStyles?: any;
  playPauseButtonSize?: number;
}

const ShimmerVideoThumbnailLoader = ({
  source,
  customClassName,
  borderRadius = 24,
  playPauseButtonStyles = {
    transform: [{ translateX: -15 }, { translateY: -15 }],
  },
  playPauseButtonSize = 18,
}: ShimmerVideoThumbnailLoaderProps) => {
  const video = React.useRef<any>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <View className={cn("overflow-hidden bg-lightPurple-100", customClassName)}>
      {!isLoaded && (
        <ShimmerEffect style={{ ...styles.shimmerEffect, borderRadius }} />
      )}
      <Video
        ref={video}
        className="w-full h-full rounded-3xl"
        source={{ uri: source.uri }}
        useNativeControls={false}
        resizeMode={ResizeMode.COVER}
        isLooping={false}
        shouldPlay={false}
        onLoad={() => setIsLoaded(true)}
      />
      {isLoaded && (
        <View style={{ ...styles.playPauseButton, ...playPauseButtonStyles }}>
          <Ionicons
            name="play"
            size={playPauseButtonSize}
            color={theme.extend.colors.darkPurple[500]}
            style={{ paddingLeft: 2 }}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  shimmerEffect: {
    width: "75%",
    height: "100%",
  },
  playPauseButton: {
    position: "absolute",
    top: "50%",
    left: "50%",
    backgroundColor: theme.extend.colors.green[500],
    borderRadius: 100,
    padding: 4,
    transform: [{ translateX: -15 }, { translateY: -15 }],
  },
});

export default memo(ShimmerVideoThumbnailLoader);
