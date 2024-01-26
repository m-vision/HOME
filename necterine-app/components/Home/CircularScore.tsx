import React from "react";
import { View } from "react-native";
import Svg, { Circle, Defs, LinearGradient, Stop } from "react-native-svg";
import Text from "../Text";

interface CircularScoreProps {
  size: number;
  strokeWidth: number;
  percentage: number;
}

const CircularScore = ({
  size,
  strokeWidth,
  percentage,
}: CircularScoreProps) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <View>
      <Svg height={size} width={size} viewBox={`0 0 ${size} ${size}`}>
        {/* Background Circle */}
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="transparent"
          stroke="rgba(0,0,0,0.3)"
          strokeWidth={strokeWidth}
        />

        {/* Foreground Circle */}
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="transparent"
          stroke="url(#grad)"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          transform={`rotate(-90, ${size / 2}, ${size / 2})`}
        />

        {/* Gradient Definition */}
        <Defs>
          <LinearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <Stop offset="0%" stopColor="#31ad66" stopOpacity="1" />
            <Stop offset="100%" stopColor="#7dce82" stopOpacity="1" />
          </LinearGradient>
        </Defs>
      </Svg>
      <View
        className="absolute justify-center items-center bg-black/30"
        style={{
          top: strokeWidth,
          left: strokeWidth,
          width: size - strokeWidth * 2,
          height: size - strokeWidth * 2,
          borderRadius: (size - strokeWidth) / 2,
        }}
      >
        <Text className="text-white font-esbuild-medium text-sm">
          {percentage}%
        </Text>
      </View>
    </View>
  );
};

export default CircularScore;
