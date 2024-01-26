import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string | number; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: any; output: any; }
};

export enum Connection_Type {
  CasualDating = 'CASUAL_DATING',
  Friendship = 'FRIENDSHIP',
  LongTermRelationship = 'LONG_TERM_RELATIONSHIP',
  NotSure = 'NOT_SURE',
  ShortTermRelationship = 'SHORT_TERM_RELATIONSHIP'
}

export enum Gender {
  Agender = 'AGENDER',
  Androgyne = 'ANDROGYNE',
  Androgynous = 'ANDROGYNOUS',
  Bisgender = 'BISGENDER',
  Cisgender = 'CISGENDER',
  Demiromantic = 'DEMIROMANTIC',
  Female = 'FEMALE',
  Genderfluid = 'GENDERFLUID',
  Genderqueer = 'GENDERQUEER',
  GenderNonconforming = 'GENDER_NONCONFORMING',
  GenderQuestioning = 'GENDER_QUESTIONING',
  Intersex = 'INTERSEX',
  Male = 'MALE',
  NonBinary = 'NON_BINARY',
  Pangender = 'PANGENDER',
  Queer = 'QUEER',
  Transferminine = 'TRANSFERMININE',
  Transmasculine = 'TRANSMASCULINE',
  TransMan = 'TRANS_MAN',
  TransWoman = 'TRANS_WOMAN',
  TwoSpirit = 'TWO_SPIRIT'
}

export type Location = {
  __typename?: 'Location';
  city?: Maybe<Scalars['String']['output']>;
  country?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  latitude: Scalars['Float']['output'];
  longitude: Scalars['Float']['output'];
  state?: Maybe<Scalars['String']['output']>;
  user?: Maybe<User>;
  userId: Scalars['String']['output'];
};

export type MatchPreferences = {
  __typename?: 'MatchPreferences';
  displayGenderPreferences?: Maybe<Scalars['Boolean']['output']>;
  genderPreferences?: Maybe<Array<Gender>>;
  id: Scalars['ID']['output'];
  maxAge?: Maybe<Scalars['Float']['output']>;
  maxDistance?: Maybe<Scalars['Float']['output']>;
  minAge?: Maybe<Scalars['Float']['output']>;
  minDistance?: Maybe<Scalars['Float']['output']>;
  preferredConnectionType?: Maybe<Connection_Type>;
  updatedAt: Scalars['DateTime']['output'];
  user: User;
  userId: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  deleteUser: Scalars['Boolean']['output'];
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


export type MutationDeleteUserArgs = {
  reason: Scalars['String']['input'];
};


export type MutationUpdateAgeRangeArgs = {
  maxAge: Scalars['Float']['input'];
  minAge: Scalars['Float']['input'];
};


export type MutationUpdateBioArgs = {
  bio: Scalars['String']['input'];
};


export type MutationUpdateDateOfBirthArgs = {
  dateOfBirth: Scalars['DateTime']['input'];
};


export type MutationUpdateGenderArgs = {
  gender: Scalars['String']['input'];
};


export type MutationUpdateGenderPreferencesArgs = {
  displayGenderPreferences: Scalars['Boolean']['input'];
  genderPreferences: Array<Gender>;
};


export type MutationUpdateLocationArgs = {
  latitude: Scalars['Float']['input'];
  longitude: Scalars['Float']['input'];
};


export type MutationUpdatePhotosArgs = {
  photos: Array<Scalars['String']['input']>;
};


export type MutationUpdatePreferredConnectionTypeArgs = {
  preferredConnectionType: Scalars['String']['input'];
};


export type MutationUpdatePronounsArgs = {
  displayPronouns: Scalars['Boolean']['input'];
  pronouns: Array<Pronoun>;
};


export type MutationUpdateQuestionnaireAnswerArgs = {
  questionnaireAnswerId: Scalars['String']['input'];
};


export type MutationUpdateSexualOrientationArgs = {
  displaySexualOrientation: Scalars['Boolean']['input'];
  sexualOrientation: Scalars['String']['input'];
};


export type MutationUpdateUserNameArgs = {
  name: Scalars['String']['input'];
};


export type MutationValidateUserAndUpdateDeviceTokenArgs = {
  deviceToken: Scalars['String']['input'];
};

export enum Pronoun {
  HeHim = 'HE_HIM',
  SheHer = 'SHE_HER',
  TheyThem = 'THEY_THEM'
}

export type Profile = {
  __typename?: 'Profile';
  bio?: Maybe<Scalars['String']['output']>;
  displayPronouns?: Maybe<Scalars['Boolean']['output']>;
  displaySexualOrientation?: Maybe<Scalars['Boolean']['output']>;
  id: Scalars['ID']['output'];
  photos: Array<Scalars['String']['output']>;
  pronouns?: Maybe<Array<Pronoun>>;
  questionnaireAnswers?: Maybe<Array<QuestionnaireAnswer>>;
  sexualOrientation?: Maybe<Sexual_Orientation>;
  updatedAt: Scalars['DateTime']['output'];
  user: User;
  userId: Scalars['String']['output'];
};

export type Query = {
  __typename?: 'Query';
  fetchPotentialMatches: Array<User>;
  getQuestionnaire: Questionnaire;
  getQuestionnaireQuestion: QuestionnaireQuestion;
  me: User;
};


export type QueryGetQuestionnaireArgs = {
  questionnaireId: Scalars['String']['input'];
};


export type QueryGetQuestionnaireQuestionArgs = {
  questionnaireQuestionId: Scalars['String']['input'];
};

export type Questionnaire = {
  __typename?: 'Questionnaire';
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  questionnaireQuestions?: Maybe<Array<QuestionnaireQuestion>>;
};

export type QuestionnaireAnswer = {
  __typename?: 'QuestionnaireAnswer';
  id: Scalars['ID']['output'];
  profile?: Maybe<Array<Profile>>;
  questionId?: Maybe<Scalars['String']['output']>;
  questionnaireQuestion?: Maybe<QuestionnaireQuestion>;
  subtitle?: Maybe<Scalars['String']['output']>;
  title: Scalars['String']['output'];
};

export type QuestionnaireQuestion = {
  __typename?: 'QuestionnaireQuestion';
  affirmativeForm: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  questionnaireAnswers?: Maybe<Array<QuestionnaireAnswer>>;
  questionnaireId?: Maybe<Scalars['String']['output']>;
  subtitle?: Maybe<Scalars['String']['output']>;
  title: Scalars['String']['output'];
};

export enum Sexual_Orientation {
  Allosexual = 'ALLOSEXUAL',
  Androgynosexual = 'ANDROGYNOSEXUAL',
  Asexual = 'ASEXUAL',
  Autosexual = 'AUTOSEXUAL',
  Bicurious = 'BICURIOUS',
  Bisexual = 'BISEXUAL',
  Demisexual = 'DEMISEXUAL',
  Gay = 'GAY',
  GrayA = 'GRAY_A',
  Gynosexual = 'GYNOSEXUAL',
  Heteroflexible = 'HETEROFLEXIBLE',
  Homoflexible = 'HOMOFLEXIBLE',
  Lesbian = 'LESBIAN',
  Objectophilia = 'OBJECTOPHILIA',
  Omnisexual = 'OMNISEXUAL',
  Pansexual = 'PANSEXUAL',
  Polisexual = 'POLISEXUAL',
  Queer = 'QUEER',
  Questioning = 'QUESTIONING',
  Skoliosexual = 'SKOLIOSEXUAL',
  Straight = 'STRAIGHT'
}

export type User = {
  __typename?: 'User';
  createdAt: Scalars['DateTime']['output'];
  dateOfBirth?: Maybe<Scalars['DateTime']['output']>;
  deviceToken?: Maybe<Scalars['String']['output']>;
  email: Scalars['String']['output'];
  gender?: Maybe<Gender>;
  id: Scalars['ID']['output'];
  matchPreferences: MatchPreferences;
  name?: Maybe<Scalars['String']['output']>;
  onboardingCompleted: Scalars['Boolean']['output'];
  profile: Profile;
  profilePicture?: Maybe<Scalars['String']['output']>;
};

export type UpdateLocationMutationVariables = Exact<{
  latitude: Scalars['Float']['input'];
  longitude: Scalars['Float']['input'];
}>;


export type UpdateLocationMutation = { __typename?: 'Mutation', updateLocation: { __typename?: 'Location', id: string, latitude: number, longitude: number } };

export type UpdateGenderPreferencesMutationVariables = Exact<{
  genderPreferences: Array<Gender> | Gender;
  displayGenderPreferences: Scalars['Boolean']['input'];
}>;


export type UpdateGenderPreferencesMutation = { __typename?: 'Mutation', updateGenderPreferences: { __typename?: 'MatchPreferences', id: string } };

export type UpdatePreferredConnectionTypeMutationVariables = Exact<{
  preferredConnectionType: Scalars['String']['input'];
}>;


export type UpdatePreferredConnectionTypeMutation = { __typename?: 'Mutation', updatePreferredConnectionType: { __typename?: 'MatchPreferences', id: string } };

export type UpdateAgeRangeMutationVariables = Exact<{
  minAge: Scalars['Float']['input'];
  maxAge: Scalars['Float']['input'];
}>;


export type UpdateAgeRangeMutation = { __typename?: 'Mutation', updateAgeRange: { __typename?: 'MatchPreferences', id: string } };

export type UpdateBioMutationVariables = Exact<{
  bio: Scalars['String']['input'];
}>;


export type UpdateBioMutation = { __typename?: 'Mutation', updateBio: { __typename?: 'Profile', id: string, bio?: string | null } };

export type UpdateSexualOrientationMutationVariables = Exact<{
  sexualOrientation: Scalars['String']['input'];
  displaySexualOrientation: Scalars['Boolean']['input'];
}>;


export type UpdateSexualOrientationMutation = { __typename?: 'Mutation', updateSexualOrientation: { __typename?: 'Profile', id: string, sexualOrientation?: Sexual_Orientation | null, displaySexualOrientation?: boolean | null } };

export type UpdatePronounsMutationVariables = Exact<{
  pronouns: Array<Pronoun> | Pronoun;
  displayPronouns: Scalars['Boolean']['input'];
}>;


export type UpdatePronounsMutation = { __typename?: 'Mutation', updatePronouns: { __typename?: 'Profile', id: string, pronouns?: Array<Pronoun> | null, displayPronouns?: boolean | null } };

export type UpdatePhotosMutationVariables = Exact<{
  photos: Array<Scalars['String']['input']> | Scalars['String']['input'];
}>;


export type UpdatePhotosMutation = { __typename?: 'Mutation', updatePhotos: { __typename?: 'Profile', id: string, photos: Array<string> } };

export type UpdateQuestionnaireAnswerMutationVariables = Exact<{
  questionnaireAnswerId: Scalars['String']['input'];
}>;


export type UpdateQuestionnaireAnswerMutation = { __typename?: 'Mutation', updateQuestionnaireAnswer: { __typename?: 'Profile', id: string, questionnaireAnswers?: Array<{ __typename?: 'QuestionnaireAnswer', id: string, title: string }> | null } };

export type GetQuestionnaireQuestionQueryVariables = Exact<{
  questionnaireQuestionId: Scalars['String']['input'];
}>;


export type GetQuestionnaireQuestionQuery = { __typename?: 'Query', getQuestionnaireQuestion: { __typename?: 'QuestionnaireQuestion', id: string, questionnaireId?: string | null, title: string, questionnaireAnswers?: Array<{ __typename?: 'QuestionnaireAnswer', id: string, title: string, subtitle?: string | null }> | null } };

export type GetQuestionnaireQueryVariables = Exact<{
  questionnaireId: Scalars['String']['input'];
}>;


export type GetQuestionnaireQuery = { __typename?: 'Query', getQuestionnaire: { __typename?: 'Questionnaire', id: string, name: string, questionnaireQuestions?: Array<{ __typename?: 'QuestionnaireQuestion', id: string, title: string, subtitle?: string | null }> | null } };

export type CurrentUserQueryVariables = Exact<{ [key: string]: never; }>;


export type CurrentUserQuery = { __typename?: 'Query', me: { __typename?: 'User', id: string, name?: string | null, dateOfBirth?: any | null, gender?: Gender | null, deviceToken?: string | null, email: string, onboardingCompleted: boolean, profilePicture?: string | null, createdAt: any, matchPreferences: { __typename?: 'MatchPreferences', genderPreferences?: Array<Gender> | null, displayGenderPreferences?: boolean | null, preferredConnectionType?: Connection_Type | null, minAge?: number | null, maxAge?: number | null }, profile: { __typename?: 'Profile', bio?: string | null, photos: Array<string>, pronouns?: Array<Pronoun> | null, sexualOrientation?: Sexual_Orientation | null, displaySexualOrientation?: boolean | null, displayPronouns?: boolean | null, questionnaireAnswers?: Array<{ __typename?: 'QuestionnaireAnswer', id: string, title: string, subtitle?: string | null, questionId?: string | null, questionnaireQuestion?: { __typename?: 'QuestionnaireQuestion', id: string, affirmativeForm: string } | null }> | null } } };

export type ValidateUserAndUpdateDeviceTokenMutationVariables = Exact<{
  deviceToken: Scalars['String']['input'];
}>;


export type ValidateUserAndUpdateDeviceTokenMutation = { __typename?: 'Mutation', validateUserAndUpdateDeviceToken: { __typename?: 'User', id: string, email: string, onboardingCompleted: boolean } };

export type UpdateUserNameMutationVariables = Exact<{
  name: Scalars['String']['input'];
}>;


export type UpdateUserNameMutation = { __typename?: 'Mutation', updateUserName: { __typename?: 'User', id: string, email: string, name?: string | null } };

export type UpdateDateOfBirthMutationVariables = Exact<{
  dateOfBirth: Scalars['DateTime']['input'];
}>;


export type UpdateDateOfBirthMutation = { __typename?: 'Mutation', updateDateOfBirth: { __typename?: 'User', id: string, email: string, dateOfBirth?: any | null } };

export type UpdateGenderMutationVariables = Exact<{
  gender: Scalars['String']['input'];
}>;


export type UpdateGenderMutation = { __typename?: 'Mutation', updateGender: { __typename?: 'User', id: string, gender?: Gender | null } };

export type SetOnboardingCompletedMutationVariables = Exact<{ [key: string]: never; }>;


export type SetOnboardingCompletedMutation = { __typename?: 'Mutation', setOnboardingCompleted: { __typename?: 'User', id: string, onboardingCompleted: boolean } };

export type DeleteUserMutationVariables = Exact<{
  reason: Scalars['String']['input'];
}>;


export type DeleteUserMutation = { __typename?: 'Mutation', deleteUser: boolean };


export const UpdateLocationDocument = gql`
    mutation updateLocation($latitude: Float!, $longitude: Float!) {
  updateLocation(latitude: $latitude, longitude: $longitude) {
    id
    latitude
    longitude
  }
}
    `;
export type UpdateLocationMutationFn = Apollo.MutationFunction<UpdateLocationMutation, UpdateLocationMutationVariables>;

/**
 * __useUpdateLocationMutation__
 *
 * To run a mutation, you first call `useUpdateLocationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateLocationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateLocationMutation, { data, loading, error }] = useUpdateLocationMutation({
 *   variables: {
 *      latitude: // value for 'latitude'
 *      longitude: // value for 'longitude'
 *   },
 * });
 */
export function useUpdateLocationMutation(baseOptions?: Apollo.MutationHookOptions<UpdateLocationMutation, UpdateLocationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateLocationMutation, UpdateLocationMutationVariables>(UpdateLocationDocument, options);
      }
export type UpdateLocationMutationHookResult = ReturnType<typeof useUpdateLocationMutation>;
export type UpdateLocationMutationResult = Apollo.MutationResult<UpdateLocationMutation>;
export type UpdateLocationMutationOptions = Apollo.BaseMutationOptions<UpdateLocationMutation, UpdateLocationMutationVariables>;
export const UpdateGenderPreferencesDocument = gql`
    mutation updateGenderPreferences($genderPreferences: [GENDER!]!, $displayGenderPreferences: Boolean!) {
  updateGenderPreferences(
    genderPreferences: $genderPreferences
    displayGenderPreferences: $displayGenderPreferences
  ) {
    id
  }
}
    `;
export type UpdateGenderPreferencesMutationFn = Apollo.MutationFunction<UpdateGenderPreferencesMutation, UpdateGenderPreferencesMutationVariables>;

/**
 * __useUpdateGenderPreferencesMutation__
 *
 * To run a mutation, you first call `useUpdateGenderPreferencesMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateGenderPreferencesMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateGenderPreferencesMutation, { data, loading, error }] = useUpdateGenderPreferencesMutation({
 *   variables: {
 *      genderPreferences: // value for 'genderPreferences'
 *      displayGenderPreferences: // value for 'displayGenderPreferences'
 *   },
 * });
 */
export function useUpdateGenderPreferencesMutation(baseOptions?: Apollo.MutationHookOptions<UpdateGenderPreferencesMutation, UpdateGenderPreferencesMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateGenderPreferencesMutation, UpdateGenderPreferencesMutationVariables>(UpdateGenderPreferencesDocument, options);
      }
export type UpdateGenderPreferencesMutationHookResult = ReturnType<typeof useUpdateGenderPreferencesMutation>;
export type UpdateGenderPreferencesMutationResult = Apollo.MutationResult<UpdateGenderPreferencesMutation>;
export type UpdateGenderPreferencesMutationOptions = Apollo.BaseMutationOptions<UpdateGenderPreferencesMutation, UpdateGenderPreferencesMutationVariables>;
export const UpdatePreferredConnectionTypeDocument = gql`
    mutation updatePreferredConnectionType($preferredConnectionType: String!) {
  updatePreferredConnectionType(preferredConnectionType: $preferredConnectionType) {
    id
  }
}
    `;
export type UpdatePreferredConnectionTypeMutationFn = Apollo.MutationFunction<UpdatePreferredConnectionTypeMutation, UpdatePreferredConnectionTypeMutationVariables>;

/**
 * __useUpdatePreferredConnectionTypeMutation__
 *
 * To run a mutation, you first call `useUpdatePreferredConnectionTypeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePreferredConnectionTypeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePreferredConnectionTypeMutation, { data, loading, error }] = useUpdatePreferredConnectionTypeMutation({
 *   variables: {
 *      preferredConnectionType: // value for 'preferredConnectionType'
 *   },
 * });
 */
export function useUpdatePreferredConnectionTypeMutation(baseOptions?: Apollo.MutationHookOptions<UpdatePreferredConnectionTypeMutation, UpdatePreferredConnectionTypeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdatePreferredConnectionTypeMutation, UpdatePreferredConnectionTypeMutationVariables>(UpdatePreferredConnectionTypeDocument, options);
      }
export type UpdatePreferredConnectionTypeMutationHookResult = ReturnType<typeof useUpdatePreferredConnectionTypeMutation>;
export type UpdatePreferredConnectionTypeMutationResult = Apollo.MutationResult<UpdatePreferredConnectionTypeMutation>;
export type UpdatePreferredConnectionTypeMutationOptions = Apollo.BaseMutationOptions<UpdatePreferredConnectionTypeMutation, UpdatePreferredConnectionTypeMutationVariables>;
export const UpdateAgeRangeDocument = gql`
    mutation updateAgeRange($minAge: Float!, $maxAge: Float!) {
  updateAgeRange(minAge: $minAge, maxAge: $maxAge) {
    id
  }
}
    `;
export type UpdateAgeRangeMutationFn = Apollo.MutationFunction<UpdateAgeRangeMutation, UpdateAgeRangeMutationVariables>;

/**
 * __useUpdateAgeRangeMutation__
 *
 * To run a mutation, you first call `useUpdateAgeRangeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateAgeRangeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateAgeRangeMutation, { data, loading, error }] = useUpdateAgeRangeMutation({
 *   variables: {
 *      minAge: // value for 'minAge'
 *      maxAge: // value for 'maxAge'
 *   },
 * });
 */
export function useUpdateAgeRangeMutation(baseOptions?: Apollo.MutationHookOptions<UpdateAgeRangeMutation, UpdateAgeRangeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateAgeRangeMutation, UpdateAgeRangeMutationVariables>(UpdateAgeRangeDocument, options);
      }
export type UpdateAgeRangeMutationHookResult = ReturnType<typeof useUpdateAgeRangeMutation>;
export type UpdateAgeRangeMutationResult = Apollo.MutationResult<UpdateAgeRangeMutation>;
export type UpdateAgeRangeMutationOptions = Apollo.BaseMutationOptions<UpdateAgeRangeMutation, UpdateAgeRangeMutationVariables>;
export const UpdateBioDocument = gql`
    mutation updateBio($bio: String!) {
  updateBio(bio: $bio) {
    id
    bio
  }
}
    `;
export type UpdateBioMutationFn = Apollo.MutationFunction<UpdateBioMutation, UpdateBioMutationVariables>;

/**
 * __useUpdateBioMutation__
 *
 * To run a mutation, you first call `useUpdateBioMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateBioMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateBioMutation, { data, loading, error }] = useUpdateBioMutation({
 *   variables: {
 *      bio: // value for 'bio'
 *   },
 * });
 */
export function useUpdateBioMutation(baseOptions?: Apollo.MutationHookOptions<UpdateBioMutation, UpdateBioMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateBioMutation, UpdateBioMutationVariables>(UpdateBioDocument, options);
      }
export type UpdateBioMutationHookResult = ReturnType<typeof useUpdateBioMutation>;
export type UpdateBioMutationResult = Apollo.MutationResult<UpdateBioMutation>;
export type UpdateBioMutationOptions = Apollo.BaseMutationOptions<UpdateBioMutation, UpdateBioMutationVariables>;
export const UpdateSexualOrientationDocument = gql`
    mutation updateSexualOrientation($sexualOrientation: String!, $displaySexualOrientation: Boolean!) {
  updateSexualOrientation(
    sexualOrientation: $sexualOrientation
    displaySexualOrientation: $displaySexualOrientation
  ) {
    id
    sexualOrientation
    displaySexualOrientation
  }
}
    `;
export type UpdateSexualOrientationMutationFn = Apollo.MutationFunction<UpdateSexualOrientationMutation, UpdateSexualOrientationMutationVariables>;

/**
 * __useUpdateSexualOrientationMutation__
 *
 * To run a mutation, you first call `useUpdateSexualOrientationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateSexualOrientationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateSexualOrientationMutation, { data, loading, error }] = useUpdateSexualOrientationMutation({
 *   variables: {
 *      sexualOrientation: // value for 'sexualOrientation'
 *      displaySexualOrientation: // value for 'displaySexualOrientation'
 *   },
 * });
 */
export function useUpdateSexualOrientationMutation(baseOptions?: Apollo.MutationHookOptions<UpdateSexualOrientationMutation, UpdateSexualOrientationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateSexualOrientationMutation, UpdateSexualOrientationMutationVariables>(UpdateSexualOrientationDocument, options);
      }
export type UpdateSexualOrientationMutationHookResult = ReturnType<typeof useUpdateSexualOrientationMutation>;
export type UpdateSexualOrientationMutationResult = Apollo.MutationResult<UpdateSexualOrientationMutation>;
export type UpdateSexualOrientationMutationOptions = Apollo.BaseMutationOptions<UpdateSexualOrientationMutation, UpdateSexualOrientationMutationVariables>;
export const UpdatePronounsDocument = gql`
    mutation updatePronouns($pronouns: [PRONOUN!]!, $displayPronouns: Boolean!) {
  updatePronouns(pronouns: $pronouns, displayPronouns: $displayPronouns) {
    id
    pronouns
    displayPronouns
  }
}
    `;
export type UpdatePronounsMutationFn = Apollo.MutationFunction<UpdatePronounsMutation, UpdatePronounsMutationVariables>;

/**
 * __useUpdatePronounsMutation__
 *
 * To run a mutation, you first call `useUpdatePronounsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePronounsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePronounsMutation, { data, loading, error }] = useUpdatePronounsMutation({
 *   variables: {
 *      pronouns: // value for 'pronouns'
 *      displayPronouns: // value for 'displayPronouns'
 *   },
 * });
 */
export function useUpdatePronounsMutation(baseOptions?: Apollo.MutationHookOptions<UpdatePronounsMutation, UpdatePronounsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdatePronounsMutation, UpdatePronounsMutationVariables>(UpdatePronounsDocument, options);
      }
export type UpdatePronounsMutationHookResult = ReturnType<typeof useUpdatePronounsMutation>;
export type UpdatePronounsMutationResult = Apollo.MutationResult<UpdatePronounsMutation>;
export type UpdatePronounsMutationOptions = Apollo.BaseMutationOptions<UpdatePronounsMutation, UpdatePronounsMutationVariables>;
export const UpdatePhotosDocument = gql`
    mutation updatePhotos($photos: [String!]!) {
  updatePhotos(photos: $photos) {
    id
    photos
  }
}
    `;
export type UpdatePhotosMutationFn = Apollo.MutationFunction<UpdatePhotosMutation, UpdatePhotosMutationVariables>;

/**
 * __useUpdatePhotosMutation__
 *
 * To run a mutation, you first call `useUpdatePhotosMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePhotosMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePhotosMutation, { data, loading, error }] = useUpdatePhotosMutation({
 *   variables: {
 *      photos: // value for 'photos'
 *   },
 * });
 */
export function useUpdatePhotosMutation(baseOptions?: Apollo.MutationHookOptions<UpdatePhotosMutation, UpdatePhotosMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdatePhotosMutation, UpdatePhotosMutationVariables>(UpdatePhotosDocument, options);
      }
export type UpdatePhotosMutationHookResult = ReturnType<typeof useUpdatePhotosMutation>;
export type UpdatePhotosMutationResult = Apollo.MutationResult<UpdatePhotosMutation>;
export type UpdatePhotosMutationOptions = Apollo.BaseMutationOptions<UpdatePhotosMutation, UpdatePhotosMutationVariables>;
export const UpdateQuestionnaireAnswerDocument = gql`
    mutation updateQuestionnaireAnswer($questionnaireAnswerId: String!) {
  updateQuestionnaireAnswer(questionnaireAnswerId: $questionnaireAnswerId) {
    id
    questionnaireAnswers {
      id
      title
    }
  }
}
    `;
export type UpdateQuestionnaireAnswerMutationFn = Apollo.MutationFunction<UpdateQuestionnaireAnswerMutation, UpdateQuestionnaireAnswerMutationVariables>;

/**
 * __useUpdateQuestionnaireAnswerMutation__
 *
 * To run a mutation, you first call `useUpdateQuestionnaireAnswerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateQuestionnaireAnswerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateQuestionnaireAnswerMutation, { data, loading, error }] = useUpdateQuestionnaireAnswerMutation({
 *   variables: {
 *      questionnaireAnswerId: // value for 'questionnaireAnswerId'
 *   },
 * });
 */
export function useUpdateQuestionnaireAnswerMutation(baseOptions?: Apollo.MutationHookOptions<UpdateQuestionnaireAnswerMutation, UpdateQuestionnaireAnswerMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateQuestionnaireAnswerMutation, UpdateQuestionnaireAnswerMutationVariables>(UpdateQuestionnaireAnswerDocument, options);
      }
export type UpdateQuestionnaireAnswerMutationHookResult = ReturnType<typeof useUpdateQuestionnaireAnswerMutation>;
export type UpdateQuestionnaireAnswerMutationResult = Apollo.MutationResult<UpdateQuestionnaireAnswerMutation>;
export type UpdateQuestionnaireAnswerMutationOptions = Apollo.BaseMutationOptions<UpdateQuestionnaireAnswerMutation, UpdateQuestionnaireAnswerMutationVariables>;
export const GetQuestionnaireQuestionDocument = gql`
    query getQuestionnaireQuestion($questionnaireQuestionId: String!) {
  getQuestionnaireQuestion(questionnaireQuestionId: $questionnaireQuestionId) {
    id
    questionnaireId
    title
    questionnaireAnswers {
      id
      title
      subtitle
    }
  }
}
    `;

/**
 * __useGetQuestionnaireQuestionQuery__
 *
 * To run a query within a React component, call `useGetQuestionnaireQuestionQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetQuestionnaireQuestionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetQuestionnaireQuestionQuery({
 *   variables: {
 *      questionnaireQuestionId: // value for 'questionnaireQuestionId'
 *   },
 * });
 */
export function useGetQuestionnaireQuestionQuery(baseOptions: Apollo.QueryHookOptions<GetQuestionnaireQuestionQuery, GetQuestionnaireQuestionQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetQuestionnaireQuestionQuery, GetQuestionnaireQuestionQueryVariables>(GetQuestionnaireQuestionDocument, options);
      }
export function useGetQuestionnaireQuestionLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetQuestionnaireQuestionQuery, GetQuestionnaireQuestionQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetQuestionnaireQuestionQuery, GetQuestionnaireQuestionQueryVariables>(GetQuestionnaireQuestionDocument, options);
        }
export type GetQuestionnaireQuestionQueryHookResult = ReturnType<typeof useGetQuestionnaireQuestionQuery>;
export type GetQuestionnaireQuestionLazyQueryHookResult = ReturnType<typeof useGetQuestionnaireQuestionLazyQuery>;
export type GetQuestionnaireQuestionQueryResult = Apollo.QueryResult<GetQuestionnaireQuestionQuery, GetQuestionnaireQuestionQueryVariables>;
export const GetQuestionnaireDocument = gql`
    query getQuestionnaire($questionnaireId: String!) {
  getQuestionnaire(questionnaireId: $questionnaireId) {
    id
    name
    questionnaireQuestions {
      id
      title
      subtitle
    }
  }
}
    `;

/**
 * __useGetQuestionnaireQuery__
 *
 * To run a query within a React component, call `useGetQuestionnaireQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetQuestionnaireQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetQuestionnaireQuery({
 *   variables: {
 *      questionnaireId: // value for 'questionnaireId'
 *   },
 * });
 */
export function useGetQuestionnaireQuery(baseOptions: Apollo.QueryHookOptions<GetQuestionnaireQuery, GetQuestionnaireQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetQuestionnaireQuery, GetQuestionnaireQueryVariables>(GetQuestionnaireDocument, options);
      }
export function useGetQuestionnaireLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetQuestionnaireQuery, GetQuestionnaireQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetQuestionnaireQuery, GetQuestionnaireQueryVariables>(GetQuestionnaireDocument, options);
        }
export type GetQuestionnaireQueryHookResult = ReturnType<typeof useGetQuestionnaireQuery>;
export type GetQuestionnaireLazyQueryHookResult = ReturnType<typeof useGetQuestionnaireLazyQuery>;
export type GetQuestionnaireQueryResult = Apollo.QueryResult<GetQuestionnaireQuery, GetQuestionnaireQueryVariables>;
export const CurrentUserDocument = gql`
    query CurrentUser {
  me {
    id
    name
    dateOfBirth
    gender
    deviceToken
    email
    onboardingCompleted
    profilePicture
    createdAt
    matchPreferences {
      genderPreferences
      displayGenderPreferences
      preferredConnectionType
      minAge
      maxAge
    }
    profile {
      bio
      photos
      pronouns
      sexualOrientation
      displaySexualOrientation
      displayPronouns
      questionnaireAnswers {
        id
        title
        subtitle
        questionId
        questionnaireQuestion {
          id
          affirmativeForm
        }
      }
    }
  }
}
    `;

/**
 * __useCurrentUserQuery__
 *
 * To run a query within a React component, call `useCurrentUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useCurrentUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCurrentUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useCurrentUserQuery(baseOptions?: Apollo.QueryHookOptions<CurrentUserQuery, CurrentUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CurrentUserQuery, CurrentUserQueryVariables>(CurrentUserDocument, options);
      }
export function useCurrentUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CurrentUserQuery, CurrentUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CurrentUserQuery, CurrentUserQueryVariables>(CurrentUserDocument, options);
        }
export type CurrentUserQueryHookResult = ReturnType<typeof useCurrentUserQuery>;
export type CurrentUserLazyQueryHookResult = ReturnType<typeof useCurrentUserLazyQuery>;
export type CurrentUserQueryResult = Apollo.QueryResult<CurrentUserQuery, CurrentUserQueryVariables>;
export const ValidateUserAndUpdateDeviceTokenDocument = gql`
    mutation validateUserAndUpdateDeviceToken($deviceToken: String!) {
  validateUserAndUpdateDeviceToken(deviceToken: $deviceToken) {
    id
    email
    onboardingCompleted
  }
}
    `;
export type ValidateUserAndUpdateDeviceTokenMutationFn = Apollo.MutationFunction<ValidateUserAndUpdateDeviceTokenMutation, ValidateUserAndUpdateDeviceTokenMutationVariables>;

/**
 * __useValidateUserAndUpdateDeviceTokenMutation__
 *
 * To run a mutation, you first call `useValidateUserAndUpdateDeviceTokenMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useValidateUserAndUpdateDeviceTokenMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [validateUserAndUpdateDeviceTokenMutation, { data, loading, error }] = useValidateUserAndUpdateDeviceTokenMutation({
 *   variables: {
 *      deviceToken: // value for 'deviceToken'
 *   },
 * });
 */
export function useValidateUserAndUpdateDeviceTokenMutation(baseOptions?: Apollo.MutationHookOptions<ValidateUserAndUpdateDeviceTokenMutation, ValidateUserAndUpdateDeviceTokenMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ValidateUserAndUpdateDeviceTokenMutation, ValidateUserAndUpdateDeviceTokenMutationVariables>(ValidateUserAndUpdateDeviceTokenDocument, options);
      }
export type ValidateUserAndUpdateDeviceTokenMutationHookResult = ReturnType<typeof useValidateUserAndUpdateDeviceTokenMutation>;
export type ValidateUserAndUpdateDeviceTokenMutationResult = Apollo.MutationResult<ValidateUserAndUpdateDeviceTokenMutation>;
export type ValidateUserAndUpdateDeviceTokenMutationOptions = Apollo.BaseMutationOptions<ValidateUserAndUpdateDeviceTokenMutation, ValidateUserAndUpdateDeviceTokenMutationVariables>;
export const UpdateUserNameDocument = gql`
    mutation updateUserName($name: String!) {
  updateUserName(name: $name) {
    id
    email
    name
  }
}
    `;
export type UpdateUserNameMutationFn = Apollo.MutationFunction<UpdateUserNameMutation, UpdateUserNameMutationVariables>;

/**
 * __useUpdateUserNameMutation__
 *
 * To run a mutation, you first call `useUpdateUserNameMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserNameMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserNameMutation, { data, loading, error }] = useUpdateUserNameMutation({
 *   variables: {
 *      name: // value for 'name'
 *   },
 * });
 */
export function useUpdateUserNameMutation(baseOptions?: Apollo.MutationHookOptions<UpdateUserNameMutation, UpdateUserNameMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateUserNameMutation, UpdateUserNameMutationVariables>(UpdateUserNameDocument, options);
      }
export type UpdateUserNameMutationHookResult = ReturnType<typeof useUpdateUserNameMutation>;
export type UpdateUserNameMutationResult = Apollo.MutationResult<UpdateUserNameMutation>;
export type UpdateUserNameMutationOptions = Apollo.BaseMutationOptions<UpdateUserNameMutation, UpdateUserNameMutationVariables>;
export const UpdateDateOfBirthDocument = gql`
    mutation updateDateOfBirth($dateOfBirth: DateTime!) {
  updateDateOfBirth(dateOfBirth: $dateOfBirth) {
    id
    email
    dateOfBirth
  }
}
    `;
export type UpdateDateOfBirthMutationFn = Apollo.MutationFunction<UpdateDateOfBirthMutation, UpdateDateOfBirthMutationVariables>;

/**
 * __useUpdateDateOfBirthMutation__
 *
 * To run a mutation, you first call `useUpdateDateOfBirthMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateDateOfBirthMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateDateOfBirthMutation, { data, loading, error }] = useUpdateDateOfBirthMutation({
 *   variables: {
 *      dateOfBirth: // value for 'dateOfBirth'
 *   },
 * });
 */
export function useUpdateDateOfBirthMutation(baseOptions?: Apollo.MutationHookOptions<UpdateDateOfBirthMutation, UpdateDateOfBirthMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateDateOfBirthMutation, UpdateDateOfBirthMutationVariables>(UpdateDateOfBirthDocument, options);
      }
export type UpdateDateOfBirthMutationHookResult = ReturnType<typeof useUpdateDateOfBirthMutation>;
export type UpdateDateOfBirthMutationResult = Apollo.MutationResult<UpdateDateOfBirthMutation>;
export type UpdateDateOfBirthMutationOptions = Apollo.BaseMutationOptions<UpdateDateOfBirthMutation, UpdateDateOfBirthMutationVariables>;
export const UpdateGenderDocument = gql`
    mutation updateGender($gender: String!) {
  updateGender(gender: $gender) {
    id
    gender
  }
}
    `;
export type UpdateGenderMutationFn = Apollo.MutationFunction<UpdateGenderMutation, UpdateGenderMutationVariables>;

/**
 * __useUpdateGenderMutation__
 *
 * To run a mutation, you first call `useUpdateGenderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateGenderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateGenderMutation, { data, loading, error }] = useUpdateGenderMutation({
 *   variables: {
 *      gender: // value for 'gender'
 *   },
 * });
 */
export function useUpdateGenderMutation(baseOptions?: Apollo.MutationHookOptions<UpdateGenderMutation, UpdateGenderMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateGenderMutation, UpdateGenderMutationVariables>(UpdateGenderDocument, options);
      }
export type UpdateGenderMutationHookResult = ReturnType<typeof useUpdateGenderMutation>;
export type UpdateGenderMutationResult = Apollo.MutationResult<UpdateGenderMutation>;
export type UpdateGenderMutationOptions = Apollo.BaseMutationOptions<UpdateGenderMutation, UpdateGenderMutationVariables>;
export const SetOnboardingCompletedDocument = gql`
    mutation setOnboardingCompleted {
  setOnboardingCompleted {
    id
    onboardingCompleted
  }
}
    `;
export type SetOnboardingCompletedMutationFn = Apollo.MutationFunction<SetOnboardingCompletedMutation, SetOnboardingCompletedMutationVariables>;

/**
 * __useSetOnboardingCompletedMutation__
 *
 * To run a mutation, you first call `useSetOnboardingCompletedMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetOnboardingCompletedMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setOnboardingCompletedMutation, { data, loading, error }] = useSetOnboardingCompletedMutation({
 *   variables: {
 *   },
 * });
 */
export function useSetOnboardingCompletedMutation(baseOptions?: Apollo.MutationHookOptions<SetOnboardingCompletedMutation, SetOnboardingCompletedMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SetOnboardingCompletedMutation, SetOnboardingCompletedMutationVariables>(SetOnboardingCompletedDocument, options);
      }
export type SetOnboardingCompletedMutationHookResult = ReturnType<typeof useSetOnboardingCompletedMutation>;
export type SetOnboardingCompletedMutationResult = Apollo.MutationResult<SetOnboardingCompletedMutation>;
export type SetOnboardingCompletedMutationOptions = Apollo.BaseMutationOptions<SetOnboardingCompletedMutation, SetOnboardingCompletedMutationVariables>;
export const DeleteUserDocument = gql`
    mutation deleteUser($reason: String!) {
  deleteUser(reason: $reason)
}
    `;
export type DeleteUserMutationFn = Apollo.MutationFunction<DeleteUserMutation, DeleteUserMutationVariables>;

/**
 * __useDeleteUserMutation__
 *
 * To run a mutation, you first call `useDeleteUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteUserMutation, { data, loading, error }] = useDeleteUserMutation({
 *   variables: {
 *      reason: // value for 'reason'
 *   },
 * });
 */
export function useDeleteUserMutation(baseOptions?: Apollo.MutationHookOptions<DeleteUserMutation, DeleteUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteUserMutation, DeleteUserMutationVariables>(DeleteUserDocument, options);
      }
export type DeleteUserMutationHookResult = ReturnType<typeof useDeleteUserMutation>;
export type DeleteUserMutationResult = Apollo.MutationResult<DeleteUserMutation>;
export type DeleteUserMutationOptions = Apollo.BaseMutationOptions<DeleteUserMutation, DeleteUserMutationVariables>;