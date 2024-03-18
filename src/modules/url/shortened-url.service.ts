import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateShortenedUrlDto } from './dto/shortened-url-create.dto';
import { ShortenedUrlValidate } from './shortened-url.validations';
import { IUser } from '../../shared/interfaces/user';
import { ShortenedUrlRepository } from './repositorys/shortened-url.repository';
import { ShortenedUrl } from './shortened-url.entity';
import { Url } from 'url';
import { zonedTimeToUtc } from 'date-fns-tz';
import { subMinutes } from 'date-fns';
import { NEW_URL_ERROR_MESSAGE, NOT_EXIST_SHORTENED_URL_ERROR_MESSAGE, REPEAT_OWN_URL_ERROR_MESSAGE, SHORTENED_URL_ALREADY_EXIST, WITHOUT_CHANGES_ERROR_MESSAGE } from './shortened-url.constants';
import { AcessedUrlService } from './acessed-url.service.ts/acessed-url.service';
import { UpdateShortenedUrlDto } from './dto/shortened-url-update.dto';

@Injectable()
export class ShortenedUrlService {
  constructor(
    private readonly validation: ShortenedUrlValidate,
    private readonly shortenedRepository: ShortenedUrlRepository,
    private readonly acessedService: AcessedUrlService
  ) { }

  async createUrl(data: CreateShortenedUrlDto, user?: IUser): Promise<ShortenedUrl> {
    const { url } = data;

    this.validation.linkValidate(url);

    const shortHash = await this.genereteCyptoUnique();
    let findUrls: ShortenedUrl;

    const currentDate = zonedTimeToUtc(new Date(), 'America/Sao_Paulo');
    const fiveMinutesAgo: Date | any = subMinutes(currentDate, 5);

    if (user && user?.id) {
      const urls = await this.shortenedRepository.findUrlShortenedWithUser(url, user.id);
      findUrls = this.singleResponse(urls);
    } else {
      const urls = await this.shortenedRepository.findUrlShortenedByUrlWithoutUser(url, fiveMinutesAgo);
      findUrls = this.singleResponse(urls);
    }

    this.validation.uniqueUrls({ url, shortened_url: shortHash }, findUrls, user?.id);

    let newShortenedUrl: ShortenedUrl = await this.shortenedRepository.createShortenedUrl(
      {
        ...data, shortened_url: shortHash
      },
      user.id
    );

    const newUrl: Url | string = this.tranformUrl(shortHash);

    return { ...newShortenedUrl, shortened_url: newUrl };
  }

  private tranformUrl(shortedUrl: string) {
    const apiURL = process.env.HOSTING || 'http://localhost:3333/redirection/';
    const newUrl = apiURL + shortedUrl;
    return newUrl;
  }

  async redirect(shortHash: any, user?: IUser): Promise<{ url: string }> {
    const shortened = await this.shortenedRepository.getByShortenedUrl(shortHash); // se existe ()

    if (!shortened) throw new NotFoundException(NEW_URL_ERROR_MESSAGE);

    await this.acessedService.createAcesses({ shortened_url_id: shortened.id }, user);

    return { url: shortened.url };
  }

  async getShortenedUrl(id: string, user: IUser): Promise<ShortenedUrl> {
    this.validation.idValidate(id);

    const shortenedUrl = await this.shortenedRepository.getShortenedUrlWithDeleted(id, user.id);

    if (!shortenedUrl) throw new BadRequestException(NOT_EXIST_SHORTENED_URL_ERROR_MESSAGE);

    const newUrl: Url | string = this.tranformUrl(shortenedUrl.shortened_url);
    return {...shortenedUrl, shortened_url: newUrl};
  }

  async findShortenedUrl(user: IUser): Promise<ShortenedUrl[]> {
    return this.shortenedRepository.findShortenedUrl(user.id);
  }

  async deleteShortenedUrl(id: string, user: IUser): Promise<string> {
    const shortenedUrl = await this.shortenedRepository.getShortenedUrl(id, user.id);

    if (!shortenedUrl) throw new InternalServerErrorException(NOT_EXIST_SHORTENED_URL_ERROR_MESSAGE);
    await this.shortenedRepository.deleteShortenedUrl(shortenedUrl.id);

    return 'Url deletada com sucesso.';
  }

  async udpateShortenedUrl(id: string, data: UpdateShortenedUrlDto, user: IUser): Promise<any> {
    const newValues: UpdateShortenedUrlDto = this.validation.updateValidate(data, id);

    const shortenedUrl = await this.shortenedRepository.getShortenedUrl(id, user.id);

    if (!Object.keys(newValues).length) throw new BadRequestException(WITHOUT_CHANGES_ERROR_MESSAGE);
    if (!shortenedUrl) throw new BadRequestException(NOT_EXIST_SHORTENED_URL_ERROR_MESSAGE);

    if (
      shortenedUrl.url === newValues.url
      &&
      shortenedUrl.shortened_url === newValues.shortened_url
    ) throw new BadRequestException(WITHOUT_CHANGES_ERROR_MESSAGE);

    if (newValues.url) {
      const urlAreadyExist = await this.shortenedRepository.findUrlShortenedByUrl(newValues.url, user.id);
      if (urlAreadyExist) throw new BadRequestException(REPEAT_OWN_URL_ERROR_MESSAGE);
    }

    if (newValues.shortened_url) {
      const shortenedUrlExist = await this.shortenedRepository.findUrlShortenedByShortenedUrl(newValues.shortened_url);
      if (shortenedUrlExist) throw new BadRequestException(SHORTENED_URL_ALREADY_EXIST);
    }

    return this.shortenedRepository.updateShortenedUrl(id, data, user.id);
  }

  private singleResponse(urls: ShortenedUrl[]): ShortenedUrl {
    if (urls.length) return urls[0];
    return undefined;
  }

  async genereteCyptoUnique(): Promise<string> {
    let randomCrypto = this.generateRandomCrypto();
    while (await this.shortenedRepository.getByShortenedUrl(randomCrypto)) { // entender e editar.
      randomCrypto = this.generateRandomCrypto();
    }
    return randomCrypto;
  }

  private generateRandomCrypto(): any {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    return Array.from({ length: 6 }, () =>
      characters.charAt(Math.floor(Math.random() * characters.length)))
      .join('');
  }
}
