import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class QuestionnaireQuestionService {
  constructor(private prisma: PrismaService) {}

  findOne(questionnaireQuestionId: string) {
    return this.prisma.questionnaireQuestion.findUnique({
      where: {
        id: questionnaireQuestionId,
      },
      include: {
        questionnaireAnswers: true,
      },
    });
  }
}
