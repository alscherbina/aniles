import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv-safe';

async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create(AppModule);
  const port = parseInt(process.env.PORT, 10) || 3000;
  await app.listen(port);
}
bootstrap();
