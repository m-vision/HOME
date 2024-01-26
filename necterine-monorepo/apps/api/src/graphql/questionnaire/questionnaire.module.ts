import { Module } from '@nestjs/common';
import { QuestionnaireResolver } from './questionnaire.resolver';
import { QuestionnaireService } from './questionnaire.service';
import { LoggerModule } from 'src/logger/logger.module';

@Module({
  imports: [LoggerModule],
  providers: [QuestionnaireResolver, QuestionnaireService],
})
export class QuestionnaireModule {}
