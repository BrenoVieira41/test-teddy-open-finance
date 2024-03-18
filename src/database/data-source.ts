import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { config } from 'dotenv';

config();

export const Database: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  schema: process.env.DB_SCHEMA,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  autoLoadEntities: true,
  useUTC: true,
  entities: [
    __dirname + '/../**/**/*.entity{.ts,.js}',
  ],
  synchronize: false
};
