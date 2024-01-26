import { Module } from '@nestjs/common';
import { QuestionnaireQuestionResolver } from './questionnaire-question.resolver';
import { QuestionnaireQuestionService } from './questionnaire-question.service';
import { LoggerModule } from 'src/logger/logger.module';

@Module({
  imports: [LoggerModule],
  providers: [QuestionnaireQuestionResolver, QuestionnaireQuestionService],
})
export class QuestionnaireQuestionModule {}
