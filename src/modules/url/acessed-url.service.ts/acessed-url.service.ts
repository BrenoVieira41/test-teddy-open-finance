import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { AcessedUrlRepository } from './repositorys/acessed-url.repository';
import { UrlAccess } from './acessed-url.entity';
import { IUser } from '../../../shared/interfaces/user';
import { CreateAcessedUrlDto } from './dto/acessed-url-create.dto';
import { UNEXPECTED_ERROR_MESSAGE } from '../shortened-url.constants';

@Injectable()
export class AcessedUrlService {
  constructor(
    private readonly acessedUrlRepository: AcessedUrlRepository
  ) { }

  async createAcesses(data: CreateAcessedUrlDto, user: IUser): Promise<any> {
    try {
      return this.acessedUrlRepository.crateAcesses(data, user?.id);
    } catch (error) {
      throw new InternalServerErrorException(UNEXPECTED_ERROR_MESSAGE);
    }
  }

  async findAcesseds(shortened_url_id: string): Promise<UrlAccess[]> {
    try {
      return this.acessedUrlRepository.findAcesseds(shortened_url_id);
    } catch (error) {
      throw new InternalServerErrorException(UNEXPECTED_ERROR_MESSAGE);
    }
  }
}
