import { UrlAccess } from '../acessed-url.entity';
import { randomUUID } from 'crypto';

const user_id = randomUUID();
const shortened_url_id = randomUUID();
const currentDate = new Date();
const user =  {
  id: user_id,
  name: 'Breno Henrique',
  email: 'brenohvl@hotmail.com',
  password: '2024Test*',
  created_at: currentDate,
  updated_at: currentDate,
  acesses: [],
  urls: []
};

export const acessed_url_mock: UrlAccess = {
  id: 1,
  shortened_url_id: user_id,
  user_id: shortened_url_id,
  created_at: currentDate,
  user: user,
  shortenedUrls: {
    id: shortened_url_id,
    url: 'https://www.linkedin.com/in/breno-henrique-vieira-leal/',
    shortened_url: 'Z0AEhR',
    user_id: user_id,
    created_at: currentDate,
    updated_at: currentDate,
    deleted_at: null,
    user: user,
    acesses: [],
  }
}

export class AcessedUrlRepositoryMock {
  public createShortened = jest.fn().mockImplementation(async (test: string) => {
    return acessed_url_mock;
  });
}
