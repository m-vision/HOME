import { cn } from "../utils/helpers";
import React, { forwardRef } from "react";
import { Text as ReactNativeText } from "react-native";

type TextProps = React.ComponentProps<typeof ReactNativeText>;

const Text = forwardRef<ReactNativeText, TextProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <ReactNativeText
        ref={ref}
        className={cn(`font-esbuild-regular`, className)}
        {...props}
      >
        {children}
      </ReactNativeText>
    );
  }
);

export default Text;
