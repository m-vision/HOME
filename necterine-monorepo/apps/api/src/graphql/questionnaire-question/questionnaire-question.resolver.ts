import { Resolver, Query, Args } from '@nestjs/graphql';

import { NotFoundException, UseGuards } from '@nestjs/common';
import { ClerkAuthGuard } from 'src/auth/clerk-auth.guard';
import { QuestionnaireQuestion } from './questionnaire-question.model';
import { QuestionnaireQuestionService } from './questionnaire-question.service';
import { LoggerService } from 'src/logger/logger.service';

@Resolver(() => QuestionnaireQuestion)
@UseGuards(ClerkAuthGuard)
export class QuestionnaireQuestionResolver {
  constructor(
    private readonly questionnaireQuestionService: QuestionnaireQuestionService,
    private readonly logger: LoggerService,
  ) {}

  @Query(() => QuestionnaireQuestion)
  async getQuestionnaireQuestion(
    @Args('questionnaireQuestionId') questionnaireQuestionId: string,
  ): Promise<QuestionnaireQuestion> {
    try {
      const questionnaireQuestion =
        await this.questionnaireQuestionService.findOne(
          questionnaireQuestionId,
        );

      if (!questionnaireQuestion) {
        throw new NotFoundException('Questionnaire questions not found');
      }

      return questionnaireQuestion;
    } catch (error) {
      this.logger.error(
        `[QuestionnaireQuestionResolver] - Error fetching questionnaire question - QuestionnaireId: ${questionnaireQuestionId}`,
      );
      throw new NotFoundException('Questionnaire questions not found');
    }
  }
}
