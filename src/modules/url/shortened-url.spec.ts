import { AcessedUrlRepository } from './acessed-url.service.ts/repositorys/acessed-url.repository'
import { Test, TestingModule } from '@nestjs/testing';
import { AcessedUrlService } from './acessed-url.service.ts/acessed-url.service';
import { ShortenedUrlService } from './shortened-url.service';
import { ShortenedUrlValidate } from './shortened-url.validations';
import { ShortenedUrlRepository } from './repositorys/shortened-url.repository';
import { ShortenedUrlRepositoryMock, shortened_url_mock } from './repositorys/shortened-url.repository.mock';
import { CreateShortenedUrlDto } from './dto/shortened-url-create.dto';
import { ID_ERROR_MESSAGE, NEW_URL_ERROR_MESSAGE, NOT_EXIST_SHORTENED_URL_ERROR_MESSAGE, REPEAT_OWN_URL_ERROR_MESSAGE, URL_ERROR_MESSAGE, WAIT_URL_ERROR_MESSAGE } from './shortened-url.constants';
import { AcessedUrlRepositoryMock } from './acessed-url.service.ts/repositorys/acessed-url.repository.mock';
import { GetShortenedUrlDto } from './dto/shortened-url-get.dto';

describe('ShortenedUrl and AcessedUrl', () => {
  let shortenedService: ShortenedUrlService;
  let acessedService: AcessedUrlService;
  let mockShortenedCreate: CreateShortenedUrlDto;
  let mockShortenedGet: GetShortenedUrlDto;
  let mockData = shortened_url_mock;
  // let mockAcessed: {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ShortenedUrlService,
        AcessedUrlService,
        ShortenedUrlValidate,
        {
          provide: ShortenedUrlRepository,
          useClass: ShortenedUrlRepositoryMock
        },
        {
          provide: AcessedUrlRepository,
          useClass: AcessedUrlRepositoryMock
        }
      ],
    }).compile();

    shortenedService = module.get<ShortenedUrlService>(ShortenedUrlService);
    mockShortenedCreate = { url: mockData.url, shortened_url: mockData.shortened_url, user_id: mockData.user_id };
    mockShortenedGet = { id: mockData.id };
  });

  describe('Create Shortened', () => {
    describe('Field url', () => {
      it('Should return error for undefined (URL)', async () => {
        Reflect.deleteProperty(mockShortenedCreate, 'url');
        try {
          await shortenedService.createUrl(mockShortenedCreate, mockData.user);
          fail(`O teste do campo (URL - indefinida) não funcionou.`);
        }
        catch (error) {
          expect(error.message).toBe(URL_ERROR_MESSAGE);
        }
      });

      it('Should return error for empty (URL)', async () => {
        mockShortenedCreate.url = '';
        try {
          await shortenedService.createUrl(mockShortenedCreate, mockData.user);
          fail(`O teste do campo (URL - vazio) não funcionou.`);
        }
        catch (error) {
          expect(error.message).toBe(URL_ERROR_MESSAGE);
        }
      });

      it('Should return error for not a (URL)', async () => {
        mockShortenedCreate.url = 'httpurlsempontocom';
        try {
          await shortenedService.createUrl(mockShortenedCreate, mockData.user);
          fail(`O teste do campo (URL - não e uma url) não funcionou.`);
        }
        catch (error) {
          expect(error.message).toBe(URL_ERROR_MESSAGE);
        }
      });

      it ('Should return error for (URL) already exist', async () => {
        try {
          await shortenedService.createUrl(mockShortenedCreate);
          fail(`O teste do campo (URL - cadastrada recentemente) não funcionou.`);
        }
        catch (error) {
          expect(error.message).toBe(WAIT_URL_ERROR_MESSAGE);
        }
      });

      it ('Should return error for (URL) already exist from the same user', async () => {
        try {
          await shortenedService.createUrl(mockShortenedCreate, mockData.user);
          fail(`O teste do campo (URL - não e uma url) não funcionou.`);
        }
        catch (error) {
          expect(error.message).toBe(REPEAT_OWN_URL_ERROR_MESSAGE);
        }
      });
    });
  });

  describe('Get Shortened', () => {
    it('Should return error for undefined (ID)', async () => {
      Reflect.deleteProperty(mockShortenedGet, 'id');
      try {
        await shortenedService.getShortenedUrl(mockShortenedGet.id, mockData.user);
        fail(`O teste do campo (id - indefinida) não funcionou.`);
      }
      catch (error) {
        expect(error.message).toBe(ID_ERROR_MESSAGE);
      }
    });

    it('Should return error for empty (ID)', async () => {
      mockShortenedGet.id = '';
      try {
        await shortenedService.getShortenedUrl(mockShortenedGet.id, mockData.user);
        fail(`O teste do campo (id - vazio) não funcionou.`);
      }
      catch (error) {
        expect(error.message).toBe(ID_ERROR_MESSAGE);
      }
    });

    it('Should return error for not a (UUID)', async () => {
      mockShortenedGet.id = 'alckslweio21.osaiep'
      try {
        await shortenedService.getShortenedUrl(mockShortenedGet.id, mockData.user);
        fail(`O teste do campo (id - não UUID) não funcionou.`);
      }
      catch (error) {
        expect(error.message).toBe(ID_ERROR_MESSAGE);
      }
    });

    it('Should return error (UUID) not found', async () => {
      mockShortenedGet.id = '6d16e1c0-a991-4d42-9ba8-c04136855dcf'
      try {
        await shortenedService.getShortenedUrl(mockShortenedGet.id, mockData.user);
        fail(`O teste do campo (id - não encontrado) não funcionou.`);
      }
      catch (error) {
        expect(error.message).toBe(NOT_EXIST_SHORTENED_URL_ERROR_MESSAGE);
      }
    });
  })
});
