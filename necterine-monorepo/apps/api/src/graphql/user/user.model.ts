import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Profile } from '../profile/profile.model';
import { GENDER } from '@prisma/client';
import { MatchPreferences } from '../match-preferences/match-preferences.model';

registerEnumType(GENDER, {
  name: 'GENDER',
});
@ObjectType()
export class User {
  @Field(() => ID)
  id: string;

  @Field()
  email: string;

  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  dateOfBirth?: Date;

  @Field({ nullable: true })
  profilePicture?: string;

  @Field({ defaultValue: false })
  onboardingCompleted?: boolean;

  @Field()
  createdAt?: Date;

  @Field({ nullable: true })
  deviceToken?: string;

  @Field(() => GENDER, { nullable: true })
  gender?: GENDER;

  @Field(() => Profile)
  profile?: Profile;

  @Field(() => MatchPreferences)
  matchPreferences?: MatchPreferences;
}
