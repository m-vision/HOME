import { Field, ID, ObjectType } from '@nestjs/graphql';
import { User } from '../user/user.model';

@ObjectType()
export class PotentialMatch {
  @Field(() => ID)
  id: string;

  @Field(() => User)
  user?: User;

  @Field()
  userId: string;

  @Field(() => User)
  potentialMatchUser?: User;

  @Field()
  potentialMatchUserId: string;

  @Field({ nullable: true })
  score?: number;

  @Field({ defaultValue: false })
  viewed: boolean;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
