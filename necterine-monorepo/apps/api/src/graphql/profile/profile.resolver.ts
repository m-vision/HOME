import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { Profile } from './profile.model';
import { ProfileService } from './profile.service';
import { InternalServerErrorException, UseGuards } from '@nestjs/common';
import { ClerkAuthGuard } from 'src/auth/clerk-auth.guard';
import { PRONOUN, SEXUAL_ORIENTATION } from '@prisma/client';
import {
  GetUserCredentials,
  UserCredentials,
} from 'src/auth/get-user-credentials.decorator';
import { LoggerService } from 'src/logger/logger.service';

@Resolver(() => Profile)
@UseGuards(ClerkAuthGuard)
export class ProfileResolver {
  constructor(
    private readonly profileService: ProfileService,
    private readonly logger: LoggerService,
  ) {}

  @Mutation(() => Profile)
  async updateBio(
    @Args('bio') bio: string,
    @GetUserCredentials() userCredentials: UserCredentials,
  ): Promise<Profile> {
    try {
      const profile = await this.profileService.updateBio({
        userId: userCredentials.id,
        bio: bio,
      });

      if (!profile) {
        throw new InternalServerErrorException('Error updating bio');
      }

      return profile;
    } catch (error) {
      this.logger.error(
        `[ProfileResolver] - Error updating bio - User: ${userCredentials.id}`,
      );
      throw new InternalServerErrorException('Error updating bio');
    }
  }

  @Mutation(() => Profile)
  async updateSexualOrientation(
    @Args('sexualOrientation') sexualOrientation: SEXUAL_ORIENTATION,
    @Args('displaySexualOrientation') displaySexualOrientation: boolean,
    @GetUserCredentials() userCredentials: UserCredentials,
  ): Promise<Profile> {
    try {
      const profile = await this.profileService.updateSexualOrientation({
        userId: userCredentials.id,
        sexualOrientation: sexualOrientation,
        displaySexualOrientation: displaySexualOrientation,
      });

      if (!profile) {
        throw new InternalServerErrorException(
          'Error updating sexual orientation',
        );
      }

      return profile;
    } catch (error) {
      this.logger.error(
        `[ProfileResolver] - Error updating sexual orientation - User: ${userCredentials.id}`,
      );
      throw new InternalServerErrorException(
        'Error updating sexual orientation',
      );
    }
  }

  @Mutation(() => Profile)
  async updatePronouns(
    @Args('pronouns', { type: () => [PRONOUN] })
    pronouns: PRONOUN[],
    @Args('displayPronouns')
    displayPronouns: boolean,
    @GetUserCredentials() userCredentials: UserCredentials,
  ): Promise<Profile> {
    try {
      const profile = await this.profileService.updatePronouns({
        userId: userCredentials.id,
        pronouns: pronouns,
        displayPronouns: displayPronouns,
      });

      if (!profile) {
        throw new InternalServerErrorException('Error updating pronouns');
      }

      return profile;
    } catch (error) {
      this.logger.error(
        `[ProfileResolver] - Error updating pronouns - User: ${userCredentials.id}`,
      );
      throw new InternalServerErrorException('Error updating pronouns');
    }
  }

  @Mutation(() => Profile)
  async updatePhotos(
    @Args('photos', { type: () => [String] })
    photos: string[],
    @GetUserCredentials() userCredentials: UserCredentials,
  ): Promise<Profile> {
    try {
      const profile = await this.profileService.updatePhotos({
        userId: userCredentials.id,
        photos,
      });

      if (!profile) {
        throw new InternalServerErrorException('Error updating photos');
      }

      return profile;
    } catch (error) {
      this.logger.error(
        `[ProfileResolver] - Error updating photos - User: ${userCredentials.id}`,
      );
      throw new InternalServerErrorException('Error updating photos');
    }
  }

  @Mutation(() => Profile)
  async updateQuestionnaireAnswer(
    @Args('questionnaireAnswerId') questionnaireAnswerId: string,
    @GetUserCredentials() userCredentials: UserCredentials,
  ): Promise<Profile> {
    try {
      const profile = await this.profileService.updateQuestionnaireAnswer({
        userId: userCredentials.id,
        questionnaireAnswerId,
      });

      if (!profile) {
        throw new InternalServerErrorException(
          'Error updating questionnaire answers',
        );
      }

      return profile;
    } catch (error) {
      this.logger.error(
        `[ProfileResolver] - Error updating questionnaire answers - User: ${userCredentials.id}`,
      );
      throw new InternalServerErrorException(
        'Error updating questionnaire answers',
      );
    }
  }
}
