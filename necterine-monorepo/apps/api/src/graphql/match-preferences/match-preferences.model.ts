import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql';
import { GENDER, CONNECTION_TYPE } from '@prisma/client';
import { User } from '../user/user.model';

registerEnumType(GENDER, {
  name: 'GENDER',
});

registerEnumType(CONNECTION_TYPE, {
  name: 'CONNECTION_TYPE',
});

@ObjectType()
export class MatchPreferences {
  @Field(() => ID)
  id: string;

  @Field(() => User)
  user?: User;

  @Field()
  userId: string;

  @Field({ nullable: true })
  minAge?: number;

  @Field({ nullable: true })
  maxAge?: number;

  @Field({ nullable: true })
  minDistance?: number;

  @Field({ nullable: true })
  maxDistance?: number;

  @Field(() => [GENDER], { nullable: true })
  genderPreferences: GENDER[];

  @Field(() => Boolean, { nullable: true })
  displayGenderPreferences?: boolean;

  @Field(() => CONNECTION_TYPE, { nullable: true })
  preferredConnectionType?: CONNECTION_TYPE;

  @Field()
  updatedAt: Date;
}
