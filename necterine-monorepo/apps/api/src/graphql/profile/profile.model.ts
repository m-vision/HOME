import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql';
import { PRONOUN, SEXUAL_ORIENTATION } from '@prisma/client';
import { User } from '../user/user.model';
import { QuestionnaireAnswer } from '../questionnaire-answer/questionnaire-answer.model';

registerEnumType(PRONOUN, {
  name: 'PRONOUN',
});
registerEnumType(SEXUAL_ORIENTATION, {
  name: 'SEXUAL_ORIENTATION',
});

@ObjectType()
export class Profile {
  @Field(() => ID)
  id: string;

  @Field(() => User)
  user?: User;

  @Field()
  userId: string;

  @Field(() => [String])
  photos: string[];

  @Field({ nullable: true })
  bio?: string;

  @Field(() => [PRONOUN], { nullable: true })
  pronouns?: PRONOUN[];

  @Field(() => Boolean, { nullable: true })
  displayPronouns?: boolean;

  @Field(() => SEXUAL_ORIENTATION, { nullable: true })
  sexualOrientation?: SEXUAL_ORIENTATION;

  @Field(() => Boolean, { nullable: true })
  displaySexualOrientation?: boolean;

  @Field(() => [QuestionnaireAnswer], { nullable: true })
  questionnaireAnswers?: QuestionnaireAnswer[];

  @Field()
  updatedAt: Date;
}
