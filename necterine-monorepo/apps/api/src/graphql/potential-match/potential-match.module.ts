import { Module } from '@nestjs/common';
import { PotentialMatchResolver } from './potential-match.resolver';
import { PotentialMatchService } from './potential-match.service';
import { LoggerModule } from 'src/logger/logger.module';

@Module({
  imports: [LoggerModule],
  providers: [PotentialMatchResolver, PotentialMatchService],
})
export class PotentialMatchModule {}
