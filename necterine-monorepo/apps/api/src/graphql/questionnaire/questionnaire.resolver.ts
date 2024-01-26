import { Resolver, Query, Args } from '@nestjs/graphql';
import { NotFoundException, UseGuards } from '@nestjs/common';
import { ClerkAuthGuard } from 'src/auth/clerk-auth.guard';
import { LoggerService } from 'src/logger/logger.service';
import { Questionnaire } from './questionnaire.model';
import { QuestionnaireService } from './questionnaire.service';

@Resolver(() => Questionnaire)
@UseGuards(ClerkAuthGuard)
export class QuestionnaireResolver {
  constructor(
    private readonly questionnaireService: QuestionnaireService,
    private readonly logger: LoggerService,
  ) {}

  @Query(() => Questionnaire)
  async getQuestionnaire(
    @Args('questionnaireId') questionnaireId: string,
  ): Promise<Questionnaire> {
    try {
      const questionnaire =
        await this.questionnaireService.findOne(questionnaireId);

      if (!questionnaire) {
        throw new NotFoundException('Questionnaire not found');
      }

      return questionnaire;
    } catch (error) {
      this.logger.error(
        `[QuestionnaireResolver] - Error fetching questionnaire - QuestionnaireId: ${questionnaireId}`,
      );
      throw new NotFoundException('Questionnaire not found');
    }
  }
}
