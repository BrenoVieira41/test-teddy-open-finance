import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UrlAccess } from '../acessed-url.entity';
import { Repository } from 'typeorm';
import { CreateAcessedUrlDto } from '../dto/acessed-url-create.dto';

@Injectable()
export class AcessedUrlRepository {
  constructor(
    @InjectRepository(UrlAccess)
    private acessedUrlRepository: Repository<UrlAccess>,
  ) { }

  async crateAcesses(data: CreateAcessedUrlDto, user_id: string): Promise<any> {
    return this.acessedUrlRepository.save({ ...data, user_id });
  }

  async findAcesseds(shortened_url_id: string): Promise<UrlAccess[]> {
    return this.acessedUrlRepository.find({ where: { shortened_url_id } });
  }
}
