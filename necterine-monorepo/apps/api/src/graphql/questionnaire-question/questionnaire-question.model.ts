import { Field, ID, ObjectType } from '@nestjs/graphql';
import { QuestionnaireAnswer } from '../questionnaire-answer/questionnaire-answer.model';

@ObjectType()
export class QuestionnaireQuestion {
  @Field(() => ID)
  id: string;

  @Field({ nullable: true })
  questionnaireId?: string;

  @Field(() => [QuestionnaireAnswer], { nullable: true })
  questionnaireAnswers?: QuestionnaireAnswer[];

  @Field({ nullable: true })
  subtitle?: string;

  @Field()
  title: string;

  @Field()
  affirmativeForm: string;
}
