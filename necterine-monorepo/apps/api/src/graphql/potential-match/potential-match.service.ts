import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from '../user/user.model';
import { Location } from '../location/location.model';
import {
  ANSWERS_SCORE_MATRIX,
  CONNECTION_TYPE_SCORE_MATRIX,
} from './matrix-scores';

@Injectable()
export class PotentialMatchService {
  private static readonly MAX_RADIUS_IN_KM = 35;
  private static readonly RADIUS_OF_EARTH_IN_KM = 6371;
  private static readonly DEFAULT_MIN_AGE = 18;
  private static readonly DEFAULT_MAX_AGE = 100;
  private static readonly MAX_POTENTIAL_MATCHES_TO_RETURN = 100;
  private static readonly DEFAULT_SCORE_FOR_POTENTIAL_MATCH = 40;
  private userId: string;

  constructor(private prisma: PrismaService) {}

  /**
   * Entry point to find potential matches for the current user. It orchestrates the process
   * by calling other methods to filter out potential matches based on user's preferences and location.
   * @param userId - The current user's identifier.
   * @returns A list of users who are potential matches.
   * @throws NotFoundException when the user's location or match preferences are not found.
   */
  async checkForPotentialMatches(userId: string): Promise<User[]> {
    this.userId = userId;
    const userLocation = await this.getUserLocation();
    const excludedUserIds = await this.getExcludedUserIds();
    const potentialLocations =
      await this.getPotentialLocations(excludedUserIds);
    const filteredLocations = this.filterByDistance(
      userLocation,
      potentialLocations,
    );
    const potentialMatchesWithoutScore =
      await this.filterByPreferences(filteredLocations);
    await this.assignPotentialMatchScoresAndSave(potentialMatchesWithoutScore);
    return await this.fetchPotentialMatches();
  }

  /**
   * Retrieves the location of the current user. If the location is not found,
   * a NotFoundException is thrown.
   * @returns The location of the current user.
   */
  private async getUserLocation(): Promise<Location> {
    const location = await this.prisma.location.findUnique({
      where: { userId: this.userId },
    });

    if (!location) {
      throw new NotFoundException(
        `Location for user ID ${this.userId} not found.`,
      );
    }

    return location;
  }

  /**
   * Gathers a list of user IDs that should be excluded from the potential match search.
   * This includes users that have already been matched or considered as a potential match,
   * as well as the current user themselves.
   * @returns An array of user IDs to be excluded.
   */
  private async getExcludedUserIds(): Promise<string[]> {
    // Fetch all matches where the user is either userOneId or userTwoId in a single query
    const existingMatches = await this.prisma.match.findMany({
      where: {
        OR: [{ userOneId: this.userId }, { userTwoId: this.userId }],
      },
      select: {
        userOneId: true,
        userTwoId: true,
      },
    });

    // Combine and deduplicate user IDs from both sides of the matches
    const existingMatchUserIds = existingMatches.flatMap((match) => [
      match.userOneId === this.userId ? match.userTwoId : match.userOneId,
    ]);

    const existingPotentialMatches = await this.prisma.potentialMatch.findMany({
      where: { userId: this.userId },
      select: { potentialMatchUserId: true },
    });

    // Deduplicate the user IDs from potential matches
    const existingPotentialMatchUserIds = existingPotentialMatches.map(
      (pm) => pm.potentialMatchUserId,
    );

    // Combine all the user IDs to exclude, including the current user
    return [
      ...new Set([
        ...existingPotentialMatchUserIds,
        ...existingMatchUserIds,
        this.userId,
      ]),
    ];
  }

  /**
   * Fetches locations of users who are not already matched or potential matches.
   * @param excludedUserIds - User IDs that should be excluded from the search.
   * @returns An array of Location objects representing potential matches.
   */
  private async getPotentialLocations(
    excludedUserIds: string[],
  ): Promise<Location[]> {
    return await this.prisma.location.findMany({
      where: { userId: { notIn: excludedUserIds } },
    });
  }

  /**
   * Filters out users who are within the specified maximum radius from the current user.
   * @param userLocation - The current user's location.
   * @param potentialLocations - Locations of potential matches.
   * @returns An array of Location objects that are within the maximum radius.
   */
  private filterByDistance(
    userLocation: Location,
    potentialLocations: Location[],
  ): Location[] {
    return potentialLocations.filter((location) => {
      const distance = this.haversineDistance(
        userLocation.latitude,
        userLocation.longitude,
        location.latitude,
        location.longitude,
      );
      return distance <= PotentialMatchService.MAX_RADIUS_IN_KM;
    });
  }

  /**
   * Filters potential matches based on the current user's preferences for age and gender.
   * This involves checking that each potential match's age is within the range specified by
   * the current user's preferences and that the gender matches the current user's preferences.
   * @param potentialLocations - Potential match locations filtered by distance.
   * @returns An array of User objects that match the current user's preferences.
   */
  private async filterByPreferences(
    potentialLocations: Location[],
  ): Promise<User[]> {
    const matchPreferences = await this.prisma.matchPreference.findUnique({
      where: { userId: this.userId },
    });

    if (!matchPreferences) throw new Error('User match preferences not found');

    const currentDate = new Date();

    const minDateOfBirth = this.calculateMinDateOfBirth(
      currentDate,
      matchPreferences.minAge,
    );
    const maxDateOfBirth = this.calculateMaxDateOfBirth(
      currentDate,
      matchPreferences.maxAge,
    );

    const potentialMatchUserDetails: User[] = [];
    for (const location of potentialLocations) {
      const userDetails = await this.prisma.user.findUnique({
        where: {
          id: location.userId,
          gender: { in: matchPreferences.genderPreferences },
          dateOfBirth: { gte: maxDateOfBirth, lte: minDateOfBirth },
        },
      });

      if (userDetails) potentialMatchUserDetails.push(userDetails);
    }

    return potentialMatchUserDetails;
  }

  /**
   * Assigns scores to each potential match based on preferences and questionnaire answers.
   * This method also saves the potential matches to the database if they meet the score criteria.
   * @param potentialMatchUsers - Users who passed the preferences filter.
   */
  private async assignPotentialMatchScoresAndSave(
    potentialMatchUsers: User[],
  ): Promise<void> {
    // Retrieve the current user's profile including their questionnaire answers
    const currentUserProfile = await this.prisma.profile.findUnique({
      where: { userId: this.userId },
      include: { questionnaireAnswers: true },
    });

    if (!currentUserProfile) {
      throw new NotFoundException('Current user profile not found');
    }

    // Retrieve the current user's match preferences
    const currentUserMatchPreference =
      await this.prisma.matchPreference.findUnique({
        where: { userId: this.userId },
      });

    if (!currentUserMatchPreference) {
      throw new NotFoundException('Current user match preference not found');
    }

    // Map over potential match users to calculate scores asynchronously
    const potentialMatchPromises = potentialMatchUsers.map(
      async (potentialMatchUser) => {
        // Retrieve the potential match's profile and preferences
        const potentialMatchProfile = await this.prisma.profile.findUnique({
          where: { userId: potentialMatchUser.id },
          include: { questionnaireAnswers: true },
        });

        const potentialMatchPreference =
          await this.prisma.matchPreference.findUnique({
            where: { userId: potentialMatchUser.id },
          });

        // Initialize the score with a default value
        let score = PotentialMatchService.DEFAULT_SCORE_FOR_POTENTIAL_MATCH;

        // If both the profile and preferences are found, calculate the additional scores
        if (potentialMatchProfile && potentialMatchPreference) {
          // Calculate the score based on connection type preference, defaulting to 0 if not found
          const connectionTypeScore =
            CONNECTION_TYPE_SCORE_MATRIX[
              currentUserMatchPreference.preferredConnectionType
            ]?.[potentialMatchPreference.preferredConnectionType] ?? 0;
          score += connectionTypeScore;

          // Calculate the score based on matched questionnaire answers, defaulting to 0 if not found
          score += currentUserProfile.questionnaireAnswers.reduce(
            (acc, answer) => {
              const correspondingAnswerId =
                potentialMatchProfile.questionnaireAnswers.find(
                  (pa) => pa.questionId === answer.questionId,
                )?.id;
              const answerScore = correspondingAnswerId
                ? ANSWERS_SCORE_MATRIX[answer.id]?.[correspondingAnswerId] ?? 0
                : 0;
              return acc + answerScore;
            },
            0,
          );
        }

        return {
          userId: this.userId,
          potentialMatchUserId: potentialMatchUser.id,
          score,
        };
      },
    );

    // Wait for all the score calculations to complete
    const potentialMatches = await Promise.all(potentialMatchPromises);
    // Filter out any undefined entries or entries without a score
    const validPotentialMatches = potentialMatches.filter(
      (match) => match && match.score,
    );

    // Insert valid potential matches into the database
    if (validPotentialMatches.length) {
      await this.insertPotentialMatches(validPotentialMatches);
    }
  }

  // Inserts potential match records into the database
  private async insertPotentialMatches(
    potentialMatches: {
      userId: string;
      potentialMatchUserId: string;
      score: number;
    }[],
  ): Promise<void> {
    if (potentialMatches.length) {
      const result = await this.prisma.potentialMatch.createMany({
        data: potentialMatches,
      });

      if (result.count === 0)
        throw new Error('Error on create potential matches');
    }
  }

  /**
   * Retrieves potential matches for the current user that have not been viewed yet and
   * have a score greater than 60. This method also limits the number of potential matches
   * returned based on the configured maximum.
   * @returns An array of User objects representing potential matches.
   */
  private async fetchPotentialMatches(): Promise<User[]> {
    const potentialMatches = await this.prisma.potentialMatch.findMany({
      where: { userId: this.userId, viewed: false, score: { gt: 60 } },
      take: PotentialMatchService.MAX_POTENTIAL_MATCHES_TO_RETURN,
      include: {
        potentialMatchUser: {
          include: {
            profile: true,
            location: true,
            matchPreferences: true,
          },
        },
      },
    });

    return potentialMatches.map((pm) => pm.potentialMatchUser);
  }

  ///////////////////////////////////////////////////////////////////////////
  /////////////////////////// UTILS SECTION /////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////

  // Calculate the Haversine distance between two points on Earth
  private haversineDistance(
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number,
  ): number {
    const dLat = this.degreesToRadians(lat2 - lat1);
    const dLon = this.degreesToRadians(lon2 - lon1);

    lat1 = this.degreesToRadians(lat1);
    lat2 = this.degreesToRadians(lat2);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return PotentialMatchService.RADIUS_OF_EARTH_IN_KM * c;
  }

  private degreesToRadians(degrees: number): number {
    return degrees * (Math.PI / 180);
  }

  // Calculates the youngest date of birth allowed based on minimum age preference
  private calculateMinDateOfBirth(currentDate: Date, minAge: number): Date {
    return minAge
      ? new Date(
          currentDate.getFullYear() - minAge,
          currentDate.getMonth(),
          currentDate.getDate(),
        )
      : new Date(
          currentDate.getFullYear() - PotentialMatchService.DEFAULT_MIN_AGE,
          currentDate.getMonth(),
          currentDate.getDate(),
        );
  }

  // Calculates the oldest date of birth allowed based on maximum age preference
  private calculateMaxDateOfBirth(currentDate: Date, maxAge: number): Date {
    return maxAge
      ? new Date(
          currentDate.getFullYear() - maxAge,
          currentDate.getMonth(),
          currentDate.getDate(),
        )
      : new Date(
          currentDate.getFullYear() - PotentialMatchService.DEFAULT_MAX_AGE,
          currentDate.getMonth(),
          currentDate.getDate(),
        );
  }
}
