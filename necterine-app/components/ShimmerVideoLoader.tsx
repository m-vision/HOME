import React, { memo, useState } from "react";
import {
  View,
  Animated,
  Easing,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
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

interface ShimmerVideoLoaderProps {
  fileUrl: string;
  customClassName?: string;
  borderRadius?: number;
  playPauseButtonStyles?: any;
  playPauseButtonSize?: number;
}

const ShimmerVideoLoader = ({
  fileUrl,
  customClassName,
  borderRadius = 24,
  playPauseButtonStyles = {
    transform: [{ translateX: -25 }, { translateY: -25 }],
  },
  playPauseButtonSize = 25,
}: ShimmerVideoLoaderProps) => {
  const video = React.useRef<any>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [status, setStatus] = React.useState<any>({});
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    if (isPlaying) {
      video?.current?.pauseAsync();
    } else {
      video?.current?.playAsync();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <View className={cn("overflow-hidden bg-lightPurple-100", customClassName)}>
      {!isLoaded && (
        <ShimmerEffect style={{ ...styles.shimmerEffect, borderRadius }} />
      )}
      <TouchableOpacity
        className="w-full h-[440px] rounded-3xl"
        activeOpacity={1}
        onPress={togglePlay}
      >
        <Video
          ref={video}
          className="w-full h-full rounded-3xl"
          source={{ uri: fileUrl }}
          useNativeControls={false}
          resizeMode={ResizeMode.COVER}
          isLooping={true}
          shouldPlay={false}
          onLoad={() => setIsLoaded(true)}
          onPlaybackStatusUpdate={(status) => setStatus(() => status)}
        />
        {!status.isPlaying && isLoaded && (
          <View style={{ ...styles.playPauseButton, ...playPauseButtonStyles }}>
            <Ionicons
              name="play"
              size={playPauseButtonSize}
              color={theme.extend.colors.darkPurple[500]}
              style={{ paddingLeft: 2 }}
            />
          </View>
        )}
      </TouchableOpacity>
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
    padding: 10,
    transform: [{ translateX: -25 }, { translateY: -25 }],
  },
});

export default memo(ShimmerVideoLoader);
