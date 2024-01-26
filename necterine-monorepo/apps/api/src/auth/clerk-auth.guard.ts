import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Clerk } from '@clerk/clerk-sdk-node';
import { GqlExecutionContext } from '@nestjs/graphql';
import { UserCredentials } from './get-user-credentials.decorator';

@Injectable()
export class ClerkAuthGuard implements CanActivate {
  private clerk: ReturnType<typeof Clerk>;

  constructor() {
    this.clerk = Clerk({ secretKey: process.env.CLERK_SECRET_KEY });
  }
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context);
    const req = ctx.getContext().req;

    try {
      const sessionToken = req.headers['authorization']?.split(' ')[1];

      if (!sessionToken) {
        throw new UnauthorizedException('No authorization token provided');
      }

      const jwtPayload = await this.clerk.verifyToken(sessionToken);

      req.user = {
        id: jwtPayload.sub,
        email: jwtPayload.email,
      } as UserCredentials;

      return true;
    } catch (error) {
      throw new UnauthorizedException('Invalid authorization token');
    }
  }
}
