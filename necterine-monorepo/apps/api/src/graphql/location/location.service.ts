import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class LocationService {
  constructor(private prisma: PrismaService) {}

  updateLocation({
    userId,
    latitude,
    longitude,
  }: {
    userId: string;
    latitude: number;
    longitude: number;
  }) {
    return this.prisma.location.upsert({
      where: {
        userId: userId,
      },
      create: {
        userId: userId,
        latitude: latitude,
        longitude: longitude,
      },
      update: {
        latitude,
        longitude,
      },
    });
  }
}
