import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class QuestionnaireService {
  constructor(private prisma: PrismaService) {}

  findOne(questionnaireId: string) {
    return this.prisma.questionnaire.findUnique({
      where: {
        id: questionnaireId,
      },
      include: {
        questionnaireQuestions: true,
      },
    });
  }
}
