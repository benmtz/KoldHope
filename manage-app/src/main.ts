import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as nunjucks from 'nunjucks';
import { join } from 'path';
import { static as statique } from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use('/public', statique(join(__dirname, 'public')));
  nunjucks.configure(__dirname, {
    autoescape: true,
    express: app,
    noCache: true,
  });
  await app.listen(3000);
}
bootstrap();
