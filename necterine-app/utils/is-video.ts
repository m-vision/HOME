const getFileExtension = (filePath: string) => {
  // Get the last part of the path after the last dot
  const lastDotIndex = filePath.lastIndexOf(".");

  // Check if there is a dot in the path and it is not the last character
  if (lastDotIndex !== -1 && lastDotIndex < filePath.length - 1) {
    // Extract the substring after the last dot
    return filePath.substring(lastDotIndex + 1);
  } else {
    // No dot found or dot is the last character (no extension)
    return "";
  }
};

const videoExtensions = [
  "3g2",
  "3gp",
  "aaf",
  "asf",
  "avchd",
  "avi",
  "drc",
  "flv",
  "m2v",
  "m3u8",
  "m4p",
  "m4v",
  "mkv",
  "mng",
  "mov",
  "mp2",
  "mp4",
  "mpe",
  "mpeg",
  "mpg",
  "mpv",
  "mxf",
  "nsv",
  "ogg",
  "ogv",
  "qt",
  "rm",
  "rmvb",
  "roq",
  "svi",
  "vob",
  "webm",
  "wmv",
  "yuv",
];

const extensions = new Set(videoExtensions);

export default function isVideo(filePath: string) {
  return extensions.has(getFileExtension(filePath).toLowerCase());
}
