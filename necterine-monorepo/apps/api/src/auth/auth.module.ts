import { Module } from '@nestjs/common';
import { ClerkAuthGuard } from './clerk-auth.guard';

@Module({
  providers: [ClerkAuthGuard],
})
export class AuthModule {}
