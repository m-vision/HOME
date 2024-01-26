import { Clerk } from '@clerk/clerk-sdk-node';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { GENDER } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { S3Service } from 'src/s3/s3.service';

@Injectable()
export class UserService {
  private clerk: ReturnType<typeof Clerk>;

  constructor(
    private prisma: PrismaService,
    private readonly s3Service: S3Service,
  ) {
    this.clerk = Clerk({ secretKey: process.env.CLERK_SECRET_KEY });
  }

  findOne(userId: string) {
    return this.prisma.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        profile: {
          include: {
            questionnaireAnswers: {
              include: {
                questionnaireQuestion: true,
              },
            },
          },
        },
        matchPreferences: true,
      },
    });
  }

  validateUserAndUpdateDeviceToken({
    userId,
    email,
    deviceToken,
  }: {
    userId: string;
    email: string;
    deviceToken: string;
  }) {
    return this.prisma.user.upsert({
      where: {
        id: userId,
      },
      update: {
        deviceToken,
      },
      create: {
        id: userId,
        email,
        deviceToken,
      },
    });
  }

  updateUserName({ userId, name }: { userId: string; name: string }) {
    return this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        name,
      },
    });
  }

  updateDateOfBirth({
    userId,
    dateOfBirth,
  }: {
    userId: string;
    dateOfBirth: Date;
  }) {
    return this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        dateOfBirth,
      },
    });
  }

  updateGender({ userId, gender }: { userId: string; gender: GENDER }) {
    return this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        gender,
      },
    });
  }

  setOnboardingCompleted({ userId }: { userId: string }) {
    return this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        onboardingCompleted: true,
      },
    });
  }

  async deleteUser({ userId, reason }: { userId: string; reason: string }) {
    return this.prisma.$transaction(async () => {
      const profile = await this.prisma.profile.findUnique({
        where: { userId },
      });

      if (profile && profile.photos) {
        for (const photo of profile.photos) {
          try {
            await this.s3Service.deleteObject(photo.split('.com/')[1]);
          } catch (error) {
            throw new InternalServerErrorException(
              `Failed to delete photo: ${photo} for user: ${userId}`,
            );
          }
        }
      }

      const deletedUser = await this.prisma.user.findUnique({
        where: { id: userId },
      });

      await this.prisma.user.delete({
        where: { id: userId },
      });

      await this.clerk.users.deleteUser(userId);

      await this.prisma.userDeletionLog.create({
        data: {
          userId,
          reason,
          userCreatedAt: deletedUser.createdAt,
        },
      });
    });
  }
}
