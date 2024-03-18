import { Module } from '@nestjs/common';
import { ShortenedUrlController } from './shortened-url.controller';
import { ShortenedUrlService } from './shortened-url.service';
import { ShortenedUrlValidate } from './shortened-url.validations';
import { ShortenedUrlRepository } from './repositorys/shortened-url.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShortenedUrl } from './shortened-url.entity';
import { AuthModule } from '../auth/auth.module';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UserModule } from '../user/user.module';
import { AcessedUrlModule } from './acessed-url.service.ts/acessed-url.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ShortenedUrl]),
    AuthModule,
    UserModule,
    AcessedUrlModule
  ],
  controllers: [ShortenedUrlController],
  providers: [
    ShortenedUrlService,
    ShortenedUrlValidate,
    ShortenedUrlRepository,
    JwtAuthGuard
  ],
  exports: [ShortenedUrlService]
})
export class ShortenedUrlModule {}
