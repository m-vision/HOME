import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Profile } from '../profile/profile.model';
import { QuestionnaireQuestion } from '../questionnaire-question/questionnaire-question.model';

@ObjectType()
export class QuestionnaireAnswer {
  @Field(() => ID)
  id: string;

  @Field(() => [Profile], { nullable: true })
  profile?: Profile[];

  @Field(() => QuestionnaireQuestion, { nullable: true })
  questionnaireQuestion?: QuestionnaireQuestion;

  @Field({ nullable: true })
  questionId?: string;

  @Field({ nullable: true })
  subtitle?: string;

  @Field()
  title: string;
}
