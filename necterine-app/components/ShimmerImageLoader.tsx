import React, { memo, useState } from "react";
import { View, Image, Animated, Easing } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { cn } from "../utils/helpers";
import theme from "../utils/theme";

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

interface ShimmerImageLoaderProps {
  source: {
    uri: string;
    cache: "force-cache" | "default" | "reload" | "only-if-cached";
  };
  customClassName?: string;
  borderRadius?: number;
}

const ShimmerImageLoader = ({
  source,
  customClassName,
  borderRadius = 24,
}: ShimmerImageLoaderProps) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <View className={cn("overflow-hidden bg-lightPurple-100", customClassName)}>
      {!isLoaded && (
        <ShimmerEffect style={{ ...styles.shimmerEffect, borderRadius }} />
      )}
      <Image
        source={source}
        className={cn("w-full h-full", customClassName)}
        onLoad={() => setIsLoaded(true)}
      />
    </View>
  );
};

const styles = {
  shimmerEffect: {
    width: "80%",
    height: "100%",
  },
};

export default memo(ShimmerImageLoader);
