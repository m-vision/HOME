import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as Sentry from '@sentry/node';
import { SentryFilter } from './filters/sentry.filter';

async function bootstrap() {
  Sentry.init({
    dsn: process.env.SENTRY_DNS,
    environment:
      process.env.NODE_ENV === 'production' ? 'production' : 'development',
  });

  const app = await NestFactory.create(AppModule);

  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new SentryFilter(httpAdapter));

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
