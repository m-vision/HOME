import { Module } from '@nestjs/common';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';
import { LoggerModule } from 'src/logger/logger.module';
import { S3Module } from 'src/s3/s3.module';

@Module({
  imports: [LoggerModule, S3Module],
  providers: [UserResolver, UserService],
})
export class UserModule {}
