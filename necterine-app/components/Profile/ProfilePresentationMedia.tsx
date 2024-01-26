import ShimmerImageLoader from "../ShimmerImageLoader";
import ShimmerVideoLoader from "../ShimmerVideoLoader";
import { useEffect, useState } from "react";
import isVideo from "../../utils/is-video";
import React from "react";

interface ProfilePresentationMediaProps {
  fileUrl: string;
  addMarginTop?: boolean;
}

const ProfilePresentationMedia = ({
  fileUrl,
  addMarginTop,
}: ProfilePresentationMediaProps) => {
  const [isFileAVideo, setIsFileAVideo] = useState(false);

  useEffect(() => {
    setIsFileAVideo(isVideo(fileUrl));
  }, [fileUrl]);

  return !isFileAVideo ? (
    <ShimmerImageLoader
      source={{ uri: fileUrl, cache: "force-cache" }}
      customClassName={`w-full h-[440px] rounded-3xl ${
        addMarginTop && "mb-10"
      }`}
    />
  ) : (
    <ShimmerVideoLoader
      fileUrl={fileUrl}
      customClassName={`w-full h-[440px] rounded-3xl ${
        addMarginTop && "mb-10"
      }`}
    />
  );
};

export default ProfilePresentationMedia;
