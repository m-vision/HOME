// Note: This file is used to declare types for assets that are not typescript compatible
//      For example, SVG files are not typescript compatible, so we need to declare them here
//     so that typescript doesn't complain when we import them
//     See: https://stackoverflow.com/questions/44357841/import-svg-into-typescript-react-project
declare module "*.svg" {
  import type React from "react";
  import type { SvgProps } from "react-native-svg";
  const content: React.FC<SvgProps>;
  export default content;
}
