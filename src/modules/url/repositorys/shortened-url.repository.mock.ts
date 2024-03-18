import { randomUUID } from 'crypto';
import { ShortenedUrl } from '../shortened-url.entity';

const user_id = randomUUID();

export const shortened_url_mock: ShortenedUrl = {
  id: randomUUID(),
  url: 'https://www.linkedin.com/in/breno-henrique-vieira-leal/',
  shortened_url: 'Z0AEhR',
  user_id: user_id,
  acesses: [],
  created_at: new Date(),
  updated_at: new Date(),
  deleted_at: null,
  user: {
    id: user_id,
    name: 'Breno Henrique',
    email: 'brenohvl@hotmail.com',
    password: '2024Test*',
    created_at: new Date(),
    updated_at: new Date(),
    acesses: [],
    urls: []
  }
}

export class ShortenedUrlRepositoryMock {
  public createShortened = jest.fn().mockImplementation(async (data: any, user_id?: string) => {
    return shortened_url_mock;
  });

  public getByShortenedUrl = jest.fn().mockImplementation(async (shortened_url: string) => {
    if (shortened_url === shortened_url_mock.shortened_url) return shortened_url_mock;
    return undefined;
  });

  public findUrlShortenedWithUser = jest.fn().mockImplementation(async (url: string, user: any) => {
    if (url === shortened_url_mock.url) return [shortened_url_mock];
    return undefined;
  });

  public findUrlShortenedByUrl = jest.fn().mockImplementation(async (url: string, date: Date) => {
    if (url === shortened_url_mock.url && date) return [shortened_url_mock];
    return undefined;
  });

  public getShortenedUrlWithDeleted = jest.fn().mockImplementation(async (id: string, user_id: string) => {
    if (id === shortened_url_mock.id) return shortened_url_mock;
    return undefined;
  });

  public findUrlShortenedByUrlWithoutUser = jest.fn().mockImplementation(async (url: string, min_time: Date) => {
    return [shortened_url_mock];
  });

  public getShortenedUrl = jest.fn().mockImplementation(async (id: string, user_id: string) => {
    return shortened_url_mock;
  });

  public findUrlShortenedByShortenedUrl = jest.fn().mockImplementation(async (shortened_url: string) => {
    return shortened_url_mock;
  });
}
