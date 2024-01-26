import { Field, ID, ObjectType } from '@nestjs/graphql';
import { QuestionnaireQuestion } from '../questionnaire-question/questionnaire-question.model';

@ObjectType()
export class Questionnaire {
  @Field(() => ID)
  id: string;

  @Field(() => [QuestionnaireQuestion], { nullable: true })
  questionnaireQuestions?: QuestionnaireQuestion[];

  @Field()
  name: string;
}
