import { Module } from '@nestjs/common';
import { MatchPreferencesResolver } from './match-preferences.resolver';
import { MatchPreferencesService } from './match-preferences.service';
import { LoggerModule } from 'src/logger/logger.module';

@Module({
  imports: [LoggerModule],
  providers: [MatchPreferencesResolver, MatchPreferencesService],
})
export class MatchPreferencesModule {}
