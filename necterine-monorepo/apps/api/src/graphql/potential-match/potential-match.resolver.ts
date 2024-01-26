import { Query, Resolver } from '@nestjs/graphql';
import { PotentialMatch } from './potential-match.model';
import { PotentialMatchService } from './potential-match.service';
import { User } from '../user/user.model';
import { ClerkAuthGuard } from 'src/auth/clerk-auth.guard';
import { InternalServerErrorException, UseGuards } from '@nestjs/common';
import {
  GetUserCredentials,
  UserCredentials,
} from 'src/auth/get-user-credentials.decorator';
import { LoggerService } from 'src/logger/logger.service';

@Resolver(() => PotentialMatch)
@UseGuards(ClerkAuthGuard)
export class PotentialMatchResolver {
  constructor(
    private readonly potentialMatchService: PotentialMatchService,
    private readonly logger: LoggerService,
  ) {}

  @Query(() => [User])
  async fetchPotentialMatches(
    @GetUserCredentials() userCredentials: UserCredentials,
  ): Promise<User[]> {
    try {
      const potentialMatchUsers =
        await this.potentialMatchService.checkForPotentialMatches(
          userCredentials.id,
        );

      if (!potentialMatchUsers) {
        throw new InternalServerErrorException(
          'Error fetching pootential matches for user',
        );
      }

      return potentialMatchUsers;
    } catch (error) {
      this.logger.error(
        `[PotentialMatchResolver] - Error fetching potential matches - User: ${userCredentials.id}`,
      );
      throw new InternalServerErrorException(
        'Error fetching pootential matches for user',
      );
    }
  }
}
