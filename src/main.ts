import { NestFactory } from '@nestjs/core';
import 'reflect-metadata';
import { AppModule } from './app.module';
import { config } from 'dotenv';

config();

const appPort = process.env.PORT || 3333;

async function bootstrap() {
  console.log(`server is running in port ${appPort}`)
  const app = await NestFactory.create(AppModule);
  await app.listen(appPort);
}
bootstrap();
