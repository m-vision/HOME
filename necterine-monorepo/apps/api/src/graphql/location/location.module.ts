import { Module } from '@nestjs/common';
import { LocationResolver } from './location.resolver';
import { LocationService } from './location.service';
import { LoggerModule } from 'src/logger/logger.module';

@Module({
  imports: [LoggerModule],
  providers: [LocationService, LocationResolver],
})
export class LocationModule {}
