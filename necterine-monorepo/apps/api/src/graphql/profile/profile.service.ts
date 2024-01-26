import { Injectable } from '@nestjs/common';
import { PRONOUN, SEXUAL_ORIENTATION } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProfileService {
  constructor(private prisma: PrismaService) {}

  findOne(userId: string) {
    return this.prisma.profile.findUnique({
      where: {
        userId: userId,
      },
    });
  }

  updateBio({ userId, bio }: { userId: string; bio: string }) {
    return this.prisma.profile.update({
      where: {
        userId: userId,
      },
      data: {
        bio,
      },
    });
  }

  updateSexualOrientation({
    userId,
    sexualOrientation,
    displaySexualOrientation,
  }: {
    userId: string;
    sexualOrientation: SEXUAL_ORIENTATION;
    displaySexualOrientation: boolean;
  }) {
    return this.prisma.profile.upsert({
      where: {
        userId: userId,
      },
      create: {
        userId,
        sexualOrientation,
        displaySexualOrientation,
      },
      update: {
        sexualOrientation,
        displaySexualOrientation,
      },
    });
  }

  updatePronouns({
    userId,
    pronouns,
    displayPronouns,
  }: {
    userId: string;
    pronouns: PRONOUN[];
    displayPronouns: boolean;
  }) {
    return this.prisma.profile.update({
      where: {
        userId: userId,
      },
      data: {
        pronouns,
        displayPronouns,
      },
    });
  }

  updatePhotos({ userId, photos }: { userId: string; photos: string[] }) {
    return this.prisma.profile.update({
      where: {
        userId: userId,
      },
      data: {
        photos,
      },
    });
  }

  async updateQuestionnaireAnswer({
    userId,
    questionnaireAnswerId,
  }: {
    userId: string;
    questionnaireAnswerId: string;
  }) {
    const questionnaireAnswer =
      await this.prisma.questionnaireAnswer.findUnique({
        where: {
          id: questionnaireAnswerId,
        },
      });

    if (!questionnaireAnswer) {
      throw new Error('Questionnaire answer not found');
    }

    const profileToUpdate = await this.prisma.profile.findUnique({
      where: {
        userId: userId,
      },
      include: {
        questionnaireAnswers: true,
      },
    });

    const profileQuestionnaireAnswers = profileToUpdate.questionnaireAnswers;

    const updatedProfileQuestionnaireAnswers =
      profileQuestionnaireAnswers.filter((answer) => {
        return answer.questionId !== questionnaireAnswer.questionId;
      });

    updatedProfileQuestionnaireAnswers.push(questionnaireAnswer);

    return this.prisma.profile.update({
      where: {
        userId: userId,
      },
      data: {
        questionnaireAnswers: {
          set: updatedProfileQuestionnaireAnswers,
        },
      },
      include: {
        questionnaireAnswers: true,
      },
    });
  }
}
