import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { UserModule } from './graphql/user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import validateEnv from './config/env';
import { ProfileModule } from './graphql/profile/profile.module';
import { MatchPreferencesModule } from './graphql/match-preferences/match-preferences.module';
import { S3Module } from './s3/s3.module';
import { LocationModule } from './graphql/location/location.module';
import { QuestionnaireQuestionModule } from './graphql/questionnaire-question/questionnaire-question.module';
import { PotentialMatchModule } from './graphql/potential-match/potential-match.module';
import { LoggerModule } from './logger/logger.module';
import { QuestionnaireModule } from './graphql/questionnaire/questionnaire.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: validateEnv,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: false,
      sortSchema: true,
      autoSchemaFile: join(process.cwd(), 'src/graphql/schema.gql'),
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
    }),
    LoggerModule,
    PrismaModule,
    AuthModule,
    S3Module,
    UserModule,
    ProfileModule,
    MatchPreferencesModule,
    QuestionnaireQuestionModule,
    QuestionnaireModule,
    LocationModule,
    PotentialMatchModule,
  ],
})
export class AppModule {}
