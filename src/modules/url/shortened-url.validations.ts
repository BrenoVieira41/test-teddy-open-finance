import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateShortenedUrlDto } from './dto/shortened-url-create.dto';
import { ID_ERROR_MESSAGE, NEW_URL_ERROR_MESSAGE, REPEAT_OWN_URL_ERROR_MESSAGE, URL_ERROR_MESSAGE, WAIT_URL_ERROR_MESSAGE, WITHOUT_CHANGES_ERROR_MESSAGE } from './shortened-url.constants';
import { ShortenedUrl } from './shortened-url.entity';
import { UpdateShortenedUrlDto } from './dto/shortened-url-update.dto';
import { validateString } from '../../shared/utils/validations';

@Injectable()
export class ShortenedUrlValidate {

  public uniqueUrls(values: CreateShortenedUrlDto, compressedUrl?: ShortenedUrl, user_id?: string) {
    if (!compressedUrl) return;
    const urlValidator = values.url === compressedUrl.url;

    if (urlValidator && user_id === compressedUrl.user_id) throw new BadRequestException(REPEAT_OWN_URL_ERROR_MESSAGE);
    if (urlValidator) throw new BadRequestException(WAIT_URL_ERROR_MESSAGE);
  }

  public idValidate(id: string) {
    const idRegex = RegExp(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i);
    if (!idRegex.test(id)) throw new BadRequestException(ID_ERROR_MESSAGE);
  }

  public shortHash(shortened_url: string) {
    const shortRegex = new RegExp('^[a-zA-Z0-9]{6}$');

    if (!shortRegex.test(shortened_url)) throw new BadRequestException(NEW_URL_ERROR_MESSAGE);
  }

  public linkValidate(url: string) {
    try {
      new URL(url);
    } catch (error) {
      console.log('não bateu aqui?')
      throw new BadRequestException(URL_ERROR_MESSAGE);
    }
  }

  public updateValidate(data: UpdateShortenedUrlDto, id: string) {
    this.idValidate(id);
    const { url, shortened_url } = data;

    return Object.entries({ url, shortened_url }).reduce((acc, [key, value]) => {
      if (value) {
        if (key === 'url') {
          this.linkValidate(value);
          return { ...acc, url: value };
        }
        if (key === 'shortened_url') {
          this.shortHash(value);
          return { ...acc, shortened_url: value };
        }
      } return acc;
    }, {})
  }
}
