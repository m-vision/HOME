import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { InternalServerErrorException, UseGuards } from '@nestjs/common';
import { ClerkAuthGuard } from 'src/auth/clerk-auth.guard';
import { CONNECTION_TYPE, GENDER } from '@prisma/client';
import { MatchPreferences } from './match-preferences.model';
import { MatchPreferencesService } from './match-preferences.service';
import {
  GetUserCredentials,
  UserCredentials,
} from 'src/auth/get-user-credentials.decorator';
import { LoggerService } from 'src/logger/logger.service';

@Resolver(() => MatchPreferences)
@UseGuards(ClerkAuthGuard)
export class MatchPreferencesResolver {
  constructor(
    private readonly matchPreferencesService: MatchPreferencesService,
    private readonly logger: LoggerService,
  ) {}

  @Mutation(() => MatchPreferences)
  async updateGenderPreferences(
    @Args('genderPreferences', { type: () => [GENDER] })
    genderPreferences: GENDER[],
    @Args('displayGenderPreferences') displayGenderPreferences: boolean,
    @GetUserCredentials() userCredentials: UserCredentials,
  ): Promise<MatchPreferences> {
    try {
      const matchPreference =
        await this.matchPreferencesService.updateGenderPreferences({
          userId: userCredentials.id,
          genderPreferences,
          displayGenderPreferences,
        });

      if (!matchPreference) {
        throw new InternalServerErrorException(
          'Error on update match preference gender',
        );
      }

      return matchPreference;
    } catch (error) {
      this.logger.error(
        `[MatchPreferencesResolver] - Error match preference gender - User: ${userCredentials.id}`,
      );
      throw new InternalServerErrorException(
        'Error on update match preference gender',
      );
    }
  }

  @Mutation(() => MatchPreferences)
  async updatePreferredConnectionType(
    @Args('preferredConnectionType')
    preferredConnectionType: CONNECTION_TYPE,
    @GetUserCredentials() userCredentials: UserCredentials,
  ): Promise<MatchPreferences> {
    try {
      const profile =
        await this.matchPreferencesService.updatePreferredConnectionType({
          userId: userCredentials.id,
          preferredConnectionType,
        });

      if (!profile) {
        throw new InternalServerErrorException(
          'Error on update match preference connection type',
        );
      }

      return profile;
    } catch (error) {
      this.logger.error(
        `[MatchPreferencesResolver] - Error match preference connection type - User: ${userCredentials.id}`,
      );
      throw new InternalServerErrorException(
        'Error on update match preference connection type',
      );
    }
  }

  @Mutation(() => MatchPreferences)
  async updateAgeRange(
    @Args('minAge')
    minAge: number,
    @Args('maxAge')
    maxAge: number,
    @GetUserCredentials() userCredentials: UserCredentials,
  ): Promise<MatchPreferences> {
    try {
      const profile = await this.matchPreferencesService.updateAgeRange({
        userId: userCredentials.id,
        minAge,
        maxAge,
      });

      if (!profile) {
        throw new InternalServerErrorException(
          'Error on update match preference age range',
        );
      }

      return profile;
    } catch (error) {
      this.logger.error(
        `[MatchPreferencesResolver] - Error match preference age range - User: ${userCredentials.id}`,
      );
      throw new InternalServerErrorException(
        'Error on update match preference age range',
      );
    }
  }
}
