import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { InternalServerErrorException, UseGuards } from '@nestjs/common';
import { ClerkAuthGuard } from 'src/auth/clerk-auth.guard';
import { Location } from './location.model';
import { LocationService } from './location.service';
import {
  GetUserCredentials,
  UserCredentials,
} from 'src/auth/get-user-credentials.decorator';
import { LoggerService } from 'src/logger/logger.service';

@Resolver(() => Location)
@UseGuards(ClerkAuthGuard)
export class LocationResolver {
  constructor(
    private readonly locationService: LocationService,
    private readonly logger: LoggerService,
  ) {}

  @Mutation(() => Location)
  async updateLocation(
    @Args('latitude') latitude: number,
    @Args('longitude') longitude: number,
    @GetUserCredentials() userCredentials: UserCredentials,
  ): Promise<Location> {
    try {
      const location = await this.locationService.updateLocation({
        userId: userCredentials.id,
        latitude,
        longitude,
      });

      if (!location) {
        throw new InternalServerErrorException('Error on update location');
      }

      return location;
    } catch (error) {
      this.logger.error(
        `[LocationResolver] - Error updating location - User: ${userCredentials.id}`,
      );
      throw new InternalServerErrorException('Error on update location');
    }
  }
}
