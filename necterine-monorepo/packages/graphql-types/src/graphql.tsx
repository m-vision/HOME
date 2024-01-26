import { gql } from "@apollo/client";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T,
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never;
    };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string | number; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  DateTime: { input: any; output: any };
};

export enum Connection_Type {
  CasualDating = "CASUAL_DATING",
  SHORT_TERM_RELATIONSHIP = "SHORT_TERM_RELATIONSHIP",
  Friendship = "FRIENDSHIP",
  SeriousRelationship = "LONG_TERM_RELATIONSHIP",
  TestingWaters = "NOT_SURE",
}

export enum Gender {
  Agender = "AGENDER",
  Androgyne = "ANDROGYNE",
  Androgynous = "ANDROGYNOUS",
  Bisgender = "BISGENDER",
  Cisgender = "CISGENDER",
  Demiromantic = "DEMIROMANTIC",
  Female = "FEMALE",
  Genderfluid = "GENDERFLUID",
  Genderqueer = "GENDERQUEER",
  GenderNonconforming = "GENDER_NONCONFORMING",
  GenderQuestioning = "GENDER_QUESTIONING",
  Intersex = "INTERSEX",
  Male = "MALE",
  NonBinary = "NON_BINARY",
  Pangender = "PANGENDER",
  Queer = "QUEER",
  Transferminine = "TRANSFERMININE",
  Transmasculine = "TRANSMASCULINE",
  TransMan = "TRANS_MAN",
  TransWoman = "TRANS_WOMAN",
  TwoSpirit = "TWO_SPIRIT",
}

export type Location = {
  __typename?: "Location";
  city?: Maybe<Scalars["String"]["output"]>;
  country?: Maybe<Scalars["String"]["output"]>;
  id: Scalars["ID"]["output"];
  latitude: Scalars["Float"]["output"];
  longitude: Scalars["Float"]["output"];
  state?: Maybe<Scalars["String"]["output"]>;
  user?: Maybe<User>;
  userId: Scalars["String"]["output"];
};

export type MatchPreferences = {
  __typename?: "MatchPreferences";
  displayGenderPreferences?: Maybe<Scalars["Boolean"]["output"]>;
  genderPreferences?: Maybe<Array<Gender>>;
  id: Scalars["ID"]["output"];
  maxAge?: Maybe<Scalars["Float"]["output"]>;
  maxDistance?: Maybe<Scalars["Float"]["output"]>;
  minAge?: Maybe<Scalars["Float"]["output"]>;
  minDistance?: Maybe<Scalars["Float"]["output"]>;
  preferredConnectionType?: Maybe<Connection_Type>;
  updatedAt: Scalars["DateTime"]["output"];
  user: User;
  userId: Scalars["String"]["output"];
};

export type Mutation = {
  __typename?: "Mutation";
  deleteUser: Scalars["Boolean"]["output"];
  setOnboardingCompleted: User;
  updateAgeRange: MatchPreferences;
  updateBio: Profile;
  updateDateOfBirth: User;
  updateGender: User;
  updateGenderPreferences: MatchPreferences;
  updateLocation: Location;
  updatePhotos: Profile;
  updatePreferredConnectionType: MatchPreferences;
  updatePronouns: Profile;
  updateQuestionnaireAnswer: Profile;
  updateSexualOrientation: Profile;
  updateUserName: User;
  validateUserAndUpdateDeviceToken: User;
};

export type MutationUpdateAgeRangeArgs = {
  maxAge: Scalars["Float"]["input"];
  minAge: Scalars["Float"]["input"];
};

export type MutationUpdateBioArgs = {
  bio: Scalars["String"]["input"];
};

export type MutationUpdateDateOfBirthArgs = {
  dateOfBirth: Scalars["DateTime"]["input"];
};

export type MutationUpdateGenderArgs = {
  gender: Scalars["String"]["input"];
};

export type MutationUpdateGenderPreferencesArgs = {
  displayGenderPreferences: Scalars["Boolean"]["input"];
  genderPreferences: Array<Gender>;
};

export type MutationUpdateLocationArgs = {
  latitude: Scalars["Float"]["input"];
  longitude: Scalars["Float"]["input"];
};

export type MutationUpdatePhotosArgs = {
  photos: Array<Scalars["String"]["input"]>;
};

export type MutationUpdatePreferredConnectionTypeArgs = {
  preferredConnectionType: Scalars["String"]["input"];
};

export type MutationUpdatePronounsArgs = {
  displayPronouns: Scalars["Boolean"]["input"];
  pronouns: Array<Pronoun>;
};

export type MutationUpdateQuestionnaireAnswerArgs = {
  questionnaireAnswerId: Scalars["String"]["input"];
};

export type MutationUpdateSexualOrientationArgs = {
  displaySexualOrientation: Scalars["Boolean"]["input"];
  sexualOrientation: Scalars["String"]["input"];
};

export type MutationUpdateUserNameArgs = {
  name: Scalars["String"]["input"];
};

export type MutationValidateUserAndUpdateDeviceTokenArgs = {
  deviceToken: Scalars["String"]["input"];
};

export enum Pronoun {
  HeHim = "HE_HIM",
  SheHer = "SHE_HER",
  TheyThem = "THEY_THEM",
}

export type Profile = {
  __typename?: "Profile";
  bio?: Maybe<Scalars["String"]["output"]>;
  displayPronouns?: Maybe<Scalars["Boolean"]["output"]>;
  displaySexualOrientation?: Maybe<Scalars["Boolean"]["output"]>;
  id: Scalars["ID"]["output"];
  photos: Array<Scalars["String"]["output"]>;
  pronouns?: Maybe<Array<Pronoun>>;
  questionnaireAnswers?: Maybe<Array<QuestionnaireAnswer>>;
  sexualOrientation?: Maybe<Sexual_Orientation>;
  updatedAt: Scalars["DateTime"]["output"];
  user: User;
  userId: Scalars["String"]["output"];
};

export type Query = {
  __typename?: "Query";
  fetchPotentialMatches: Array<User>;
  getQuestionnaireQuestion: QuestionnaireQuestion;
  me: User;
};

export type QueryGetQuestionnaireQuestionArgs = {
  questionnaireQuestionId: Scalars["String"]["input"];
};

export type QuestionnaireAnswer = {
  __typename?: "QuestionnaireAnswer";
  id: Scalars["ID"]["output"];
  profile?: Maybe<Array<Profile>>;
  questionId?: Maybe<Scalars["String"]["output"]>;
  questionnaireQuestion?: Maybe<QuestionnaireQuestion>;
  subtitle?: Maybe<Scalars["String"]["output"]>;
  title: Scalars["String"]["output"];
};

export type QuestionnaireQuestion = {
  __typename?: "QuestionnaireQuestion";
  id: Scalars["ID"]["output"];
  questionnaireAnswers?: Maybe<Array<QuestionnaireAnswer>>;
  questionnaireId?: Maybe<Scalars["String"]["output"]>;
  subtitle?: Maybe<Scalars["String"]["output"]>;
  title: Scalars["String"]["output"];
};

export enum Sexual_Orientation {
  Allosexual = "ALLOSEXUAL",
  Androgynosexual = "ANDROGYNOSEXUAL",
  Asexual = "ASEXUAL",
  Autosexual = "AUTOSEXUAL",
  Bicurious = "BICURIOUS",
  Bisexual = "BISEXUAL",
  Demisexual = "DEMISEXUAL",
  Gay = "GAY",
  GrayA = "GRAY_A",
  Gynosexual = "GYNOSEXUAL",
  Heteroflexible = "HETEROFLEXIBLE",
  Homoflexible = "HOMOFLEXIBLE",
  Lesbian = "LESBIAN",
  Objectophilia = "OBJECTOPHILIA",
  Omnisexual = "OMNISEXUAL",
  Pansexual = "PANSEXUAL",
  Polisexual = "POLISEXUAL",
  Queer = "QUEER",
  Questioning = "QUESTIONING",
  Skoliosexual = "SKOLIOSEXUAL",
  Straight = "STRAIGHT",
}

export type User = {
  __typename?: "User";
  createdAt: Scalars["DateTime"]["output"];
  dateOfBirth?: Maybe<Scalars["DateTime"]["output"]>;
  deviceToken?: Maybe<Scalars["String"]["output"]>;
  email: Scalars["String"]["output"];
  gender?: Maybe<Gender>;
  id: Scalars["ID"]["output"];
  matchPreferences: MatchPreferences;
  name?: Maybe<Scalars["String"]["output"]>;
  onboardingCompleted: Scalars["Boolean"]["output"];
  profile: Profile;
  profilePicture?: Maybe<Scalars["String"]["output"]>;
};
