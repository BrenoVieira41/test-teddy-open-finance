import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Database } from './database/data-source';
import { ShortenedUrlModule } from './modules/url/shortened-url.module';
import { AuthModule } from './modules/auth/auth.module';
import { JwtGlobalModule } from './modules/auth/jwt-global.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(Database),
    UserModule,
    ShortenedUrlModule,
    AuthModule,
    JwtGlobalModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
