import { Injectable } from '@nestjs/common';
import { CONNECTION_TYPE, GENDER } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class MatchPreferencesService {
  constructor(private prisma: PrismaService) {}

  updateGenderPreferences({
    userId,
    genderPreferences,
    displayGenderPreferences,
  }: {
    userId: string;
    genderPreferences: GENDER[];
    displayGenderPreferences: boolean;
  }) {
    return this.prisma.matchPreference.upsert({
      where: {
        userId: userId,
      },
      create: {
        userId: userId,
        genderPreferences: genderPreferences,
        displayGenderPreferences: displayGenderPreferences,
      },
      update: {
        genderPreferences,
        displayGenderPreferences,
      },
    });
  }

  updatePreferredConnectionType({
    userId,
    preferredConnectionType,
  }: {
    userId: string;
    preferredConnectionType: CONNECTION_TYPE;
  }) {
    return this.prisma.matchPreference.update({
      where: {
        userId: userId,
      },
      data: {
        preferredConnectionType,
      },
    });
  }

  updateAgeRange({
    userId,
    minAge,
    maxAge,
  }: {
    userId: string;
    minAge: number;
    maxAge: number;
  }) {
    return this.prisma.matchPreference.update({
      where: {
        userId: userId,
      },
      data: {
        minAge,
        maxAge,
      },
    });
  }
}
