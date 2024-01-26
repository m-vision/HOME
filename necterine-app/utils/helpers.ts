import { Buffer } from "buffer";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import * as FileSystem from "expo-file-system";
import {
  Connection_Type,
  Gender,
  Pronoun,
  Sexual_Orientation,
} from "../graphql-types/src/graphql";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getReadableGender = (gender: Gender): string => {
  switch (gender) {
    case Gender.GenderNonconforming:
      return "Gender Nonconforming";
    case Gender.GenderQuestioning:
      return "Gender Questioning";
    case Gender.NonBinary:
      return "Non-binary";
    case Gender.TransMan:
      return "Trans Man";
    case Gender.TransWoman:
      return "Trans Woman";
    case Gender.TwoSpirit:
      return "Two-Spirit";
    default:
      return gender;
  }
};

export const getReadableSexualOrientation = (
  sexualOrientation: Sexual_Orientation
): string => {
  switch (sexualOrientation) {
    case Sexual_Orientation.GrayA:
      return "Gray-A";
    default:
      return sexualOrientation;
  }
};

export const getReadablePronoun = (pronoun: Pronoun): string => {
  switch (pronoun) {
    case Pronoun.HeHim:
      return "He / Him";
    case Pronoun.SheHer:
      return "She / Her";
    case Pronoun.TheyThem:
      return "They / Them";
    default:
      return pronoun;
  }
};

export const getReadableConnectionTypes = (
  connectionType: Connection_Type
): string => {
  switch (connectionType) {
    case Connection_Type.CasualDating:
      return "Casual Datings";
    case Connection_Type.LongTermRelationship:
      return "Long-term Relationship";
    case Connection_Type.NotSure:
      return "Not Sure";
    case Connection_Type.ShortTermRelationship:
      return "Short-term Relationship";
    default:
      return connectionType;
  }
};

export const getContentTypeFromFilePath = (path: string) => {
  switch (path.split(".").pop() ?? "".toLowerCase()) {
    case "jpg":
    case "jpeg":
      return "image/jpeg";
    case "png":
      return "image/png";
    case "gif":
      return "image/gif";
    case "heic":
      return "image/heic";
    // Add other cases as needed
    default:
      return "application/octet-stream";
  }
};

export const getUniqueFileName = (fileName: string) => {
  return `${new Date().getTime()}_${fileName as string}`;
};

export const convertMediaToBuffer = async (uri: string) => {
  const fileBase64 = await FileSystem.readAsStringAsync(uri, {
    encoding: FileSystem.EncodingType.Base64,
  });

  const buffer = Buffer.from(fileBase64, "base64");
  return buffer;
};

export const getAgeFromBirthdate = (birthdate: string) => {
  const today = new Date();
  const birthDate = new Date(birthdate);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDifference = today.getMonth() - birthDate.getMonth();

  if (
    monthDifference < 0 ||
    (monthDifference === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }

  return age;
};

const sexualOrientationFirstOptions = [
  Sexual_Orientation.Straight,
  Sexual_Orientation.Gay,
  Sexual_Orientation.Lesbian,
  Sexual_Orientation.Bisexual,
];
const otherSexualOrientationOptions = Object.values(Sexual_Orientation).filter(
  (gender) =>
    ![
      Sexual_Orientation.Straight,
      Sexual_Orientation.Gay,
      Sexual_Orientation.Lesbian,
      Sexual_Orientation.Bisexual,
    ].includes(gender as Sexual_Orientation)
);
export const orderedSexualOrientationOptions = [
  ...sexualOrientationFirstOptions,
  ...otherSexualOrientationOptions,
];

const genderFirstOptions = [Gender.Male, Gender.Female, Gender.NonBinary];
const otherGenderOptions = Object.values(Gender).filter(
  (gender) =>
    ![Gender.Male, Gender.Female, Gender.NonBinary].includes(gender as Gender)
);
export const orderedGenderOptions = [
  ...genderFirstOptions,
  ...otherGenderOptions,
];

export const capitalizeSentences = (text: string): string => {
  const lowerCaseText = text.toLowerCase();
  return lowerCaseText
    .split(/(?<=[.!?])\s+/)
    .map((sentence) => sentence.charAt(0).toUpperCase() + sentence.slice(1))
    .join(" ");
};
