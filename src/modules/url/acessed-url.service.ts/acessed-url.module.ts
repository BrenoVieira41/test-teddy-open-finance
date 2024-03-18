import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UrlAccess } from './acessed-url.entity';
import { AcessedUrlRepository } from './repositorys/acessed-url.repository';
import { AcessedUrlService } from './acessed-url.service';

const allProviders = [AcessedUrlRepository, AcessedUrlService]

@Module({
  imports: [
    TypeOrmModule.forFeature([UrlAccess]),
  ],
  providers: allProviders,
  exports: allProviders,
})
export class AcessedUrlModule {}
