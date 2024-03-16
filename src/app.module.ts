import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Database } from './database/data-source';

@Module({
  imports: [
    TypeOrmModule.forRoot(Database),
    UserModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
