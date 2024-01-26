import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { User } from './user.model';
import { UserService } from './user.service';
import {
  InternalServerErrorException,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import { ClerkAuthGuard } from 'src/auth/clerk-auth.guard';
import { GENDER } from '@prisma/client';
import {
  GetUserCredentials,
  UserCredentials,
} from 'src/auth/get-user-credentials.decorator';
import { LoggerService } from 'src/logger/logger.service';

@Resolver(() => User)
@UseGuards(ClerkAuthGuard)
export class UserResolver {
  constructor(
    private readonly userService: UserService,
    private readonly logger: LoggerService,
  ) {}

  @Query(() => User)
  async me(
    @GetUserCredentials() userCredentials: UserCredentials,
  ): Promise<User> {
    try {
      const user = await this.userService.findOne(userCredentials.id);

      if (!user) {
        throw new NotFoundException('User not found');
      }

      return user;
    } catch (error: any) {
      this.logger.error(
        `[UserResolver] - Error fetching current user - User: ${userCredentials.id}`,
      );
      throw new NotFoundException('User not found');
    }
  }

  @Mutation(() => User)
  async validateUserAndUpdateDeviceToken(
    @Args('deviceToken') deviceToken: string,
    @GetUserCredentials() userCredentials: UserCredentials,
  ): Promise<User> {
    try {
      const user = await this.userService.validateUserAndUpdateDeviceToken({
        email: userCredentials.email,
        userId: userCredentials.id,
        deviceToken: deviceToken,
      });

      if (!user) {
        throw new InternalServerErrorException('Error validating user');
      }

      return user;
    } catch (error) {
      this.logger.error(
        `[UserResolver] - Error validating user - User: ${userCredentials.id}`,
      );
      throw new InternalServerErrorException('Error validating user');
    }
  }

  @Mutation(() => User)
  async updateUserName(
    @Args('name') name: string,
    @GetUserCredentials() userCredentials: UserCredentials,
  ): Promise<User> {
    try {
      const user = await this.userService.updateUserName({
        userId: userCredentials.id,
        name: name,
      });

      if (!user) {
        throw new InternalServerErrorException('Error updating user name');
      }

      return user;
    } catch (error) {
      this.logger.error(
        `[UserResolver] - Error updating user name - User: ${userCredentials.id}`,
      );
      throw new InternalServerErrorException('Error updating user name');
    }
  }

  @Mutation(() => User)
  async updateDateOfBirth(
    @Args('dateOfBirth') dateOfBirth: Date,
    @GetUserCredentials() userCredentials: UserCredentials,
  ): Promise<User> {
    try {
      const user = await this.userService.updateDateOfBirth({
        userId: userCredentials.id,
        dateOfBirth: dateOfBirth,
      });

      if (!user) {
        throw new InternalServerErrorException(
          'Error updating user dateOfBirth',
        );
      }

      return user;
    } catch (error) {
      this.logger.error(
        `[UserResolver] - Error updating user dateOfBirth - User: ${userCredentials.id}`,
      );
      throw new InternalServerErrorException('Error updating user dateOfBirth');
    }
  }

  @Mutation(() => User)
  async updateGender(
    @Args('gender') gender: GENDER,
    @GetUserCredentials() userCredentials: UserCredentials,
  ): Promise<User> {
    try {
      const user = await this.userService.updateGender({
        userId: userCredentials.id,
        gender: gender,
      });

      if (!user) {
        throw new InternalServerErrorException('Error updating user gender');
      }

      return user;
    } catch (error) {
      this.logger.error(
        `[UserResolver] - Error updating user gender - User: ${userCredentials.id}`,
      );
      throw new InternalServerErrorException('Error updating user gender');
    }
  }

  @Mutation(() => User)
  async setOnboardingCompleted(
    @GetUserCredentials() userCredentials: UserCredentials,
  ): Promise<User> {
    try {
      const user = await this.userService.setOnboardingCompleted({
        userId: userCredentials.id,
      });

      if (!user) {
        throw new InternalServerErrorException(
          'Error setting onboarding completed',
        );
      }

      return user;
    } catch (error) {
      this.logger.error(
        `[UserResolver] - Error setting onboarding completed - User: ${userCredentials.id}`,
      );
      throw new InternalServerErrorException(
        'Error setting onboarding completed',
      );
    }
  }

  @Mutation(() => Boolean)
  async deleteUser(
    @Args('reason') reason: string,
    @GetUserCredentials() userCredentials: UserCredentials,
  ): Promise<boolean> {
    try {
      this.logger.log(
        `[UserResolver] - Started user deletion - User: ${userCredentials.id} - Email: ${userCredentials.email}`,
      );

      await this.userService.deleteUser({
        userId: userCredentials.id,
        reason: reason,
      });

      this.logger.log(
        `[UserResolver] - User deleted succesfully - User: ${userCredentials.id} - Email: ${userCredentials.email}`,
      );

      return true;
    } catch (error) {
      this.logger.error(
        `[UserResolver] - Error on deleting user - User: ${userCredentials.id} - Email: ${userCredentials.email}`,
      );
      throw new InternalServerErrorException('Failed to delete user');
    }
  }
}
