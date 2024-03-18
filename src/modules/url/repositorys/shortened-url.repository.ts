import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ShortenedUrl } from '../shortened-url.entity';
import { IsNull, MoreThanOrEqual, Repository } from 'typeorm';
import { CreateShortenedUrlDto } from '../dto/shortened-url-create.dto';
import { UpdateShortenedUrlDto } from '../dto/shortened-url-update.dto';
import { DELETE_ERROR_MESSAGE, NOT_CHANGED_ERROR_MESSAGE } from '../shortened-url.constants';

const deleted = { deleted_at: IsNull() };

@Injectable()
export class ShortenedUrlRepository {
  constructor(
    @InjectRepository(ShortenedUrl)
    private compressedRepository: Repository<ShortenedUrl>,
  ) { }

  async createShortenedUrl(data: CreateShortenedUrlDto, user_id?: string): Promise<any> {
    return this.compressedRepository.save({ ...data, user_id });
  }

  async findUrlShortenedByUrl(url: string, user_id: string): Promise<ShortenedUrl> {
    return this.compressedRepository.findOne({ where: { url, user_id, ...deleted } });
  }

  async findUrlShortenedByShortenedUrl(shortened_url: string): Promise<ShortenedUrl> {
    return this.compressedRepository.findOne({ where: { shortened_url, ...deleted } });
  }

  async findUrlShortenedWithUser(url: string, user_id: string): Promise<ShortenedUrl[]> {
    return this.compressedRepository.find({ where: { url, user_id }, order: { updated_at: 'DESC' } });
  }

  async findUrlShortenedByUrlWithoutUser(url: string, min_time: Date): Promise<ShortenedUrl[]> {
    return this.compressedRepository.find({
      where: {
        url, updated_at: MoreThanOrEqual(min_time)
      }
      , order: { updated_at: 'DESC' }
    });
  }

  async getShortenedUrl(id: string, user_id: string): Promise<ShortenedUrl> {
    return this.compressedRepository.findOne({ where: { id, user_id, ...deleted } });
  }

  async getShortenedUrlWithDeleted(id: string, user_id: string): Promise<ShortenedUrl> {
    return this.compressedRepository.findOne({ where: { id, user_id } });
  }

  async getByShortenedUrl(shortened_url: string): Promise<ShortenedUrl> {
    return this.compressedRepository.findOne({ where: { shortened_url, ...deleted } })
  }

  async findShortenedUrl(user_id: string): Promise<ShortenedUrl[]> {
    return this.compressedRepository.find({ where: { user_id, ...deleted } })
  }

  public async updateShortenedUrl(id: string, data: UpdateShortenedUrlDto, user_id: string): Promise<ShortenedUrl> {
    await this.compressedRepository.update(id, data);
    return this.getShortenedUrl(id, user_id);
  }

  async deleteShortenedUrl(id: string): Promise<any> {
    const compressedDeleted = await this.compressedRepository.update(id, { deleted_at: new Date() });
    if (!compressedDeleted.affected) throw new InternalServerErrorException(DELETE_ERROR_MESSAGE);
  }
}
