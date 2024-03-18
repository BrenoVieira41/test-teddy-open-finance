import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { AuthValidate } from './auth.validate';
import { UserRepository } from '../user/repository/user.repository';
import { UserRepositoryMock } from '../user/repository/user.repository.mock';
import { EMAIL_ERROR_MESSAGE, LOGIN_MESSAGE_ERROR } from './auth.constants';
import { JwtService } from '@nestjs/jwt';

describe('Auth', () => {
  let authService: AuthService;
  let mockUser: LoginDto;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        AuthValidate,
        JwtService,
        {
          provide: UserRepository,
          useClass: UserRepositoryMock
        }
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    mockUser = { email: 'test@hotmail.com', password: '2024Test*' };
  });

  describe('Login User', () => {
    describe('Field E-mail', () => {
      it('Should return error for empty (E-Mail)', async () => {
        mockUser.email = '';
        try {
          await authService.login(mockUser);
          fail(`O teste do campo (e-mail - vazio) não funcionou.`);
        }
        catch (error) {
          expect(error.message).toBe(EMAIL_ERROR_MESSAGE);
        }
      });

      it('Should return error for undefined (E-mail)', async () => {
        Reflect.deleteProperty(mockUser, 'email');
        try {
          await authService.login(mockUser);
          fail(`O teste do campo (e-mail - indefinido) não funcionou.`);
        }
        catch (error) {
          expect(error.message).toBe(EMAIL_ERROR_MESSAGE);
        }
      });

      it('Should return error for not an (E-mail)', async () => {
        mockUser.email = 'testinhotmailcom';
        try {
          await authService.login(mockUser);
          fail(`O teste do campo (e-mail - não email) não funcionou.`);
        }
        catch (error) {
          expect(error.message).toBe(EMAIL_ERROR_MESSAGE);
        }
      });

      it('Should return error for incorrect email', async () => {
        mockUser.email = 'tes@hotmail.com';
        try {
          await authService.login(mockUser);
          fail(`O teste do campo (e-mail - incorreto) não funcionou.`);
        }
        catch (error) {
          expect(error.message).toBe(LOGIN_MESSAGE_ERROR);
        }
      });
    });

    describe('Field Password', () => {
      it('Should return error for empty (Password)', async () => {
        mockUser.password = '';
        try {
          await authService.login(mockUser);
          fail(`O teste do campo (senha - vazia) não funcionou.`);
        }
        catch (error) {
          expect(error.message).toBe(LOGIN_MESSAGE_ERROR);
        }
      });

      it('Should return error for undefined (Password)', async () => {
        Reflect.deleteProperty(mockUser, 'password');
        try {
          await authService.login(mockUser);
          fail(`O teste do campo (senha - indefinida) não funcionou.`);
        }
        catch (error) {
          expect(error.message).toBe(LOGIN_MESSAGE_ERROR);
        }
      });

      it('Should return error for incorrect password', async () => {
        mockUser.password = '2024XPoc*32B';
        try {
          await authService.login(mockUser);
          fail(`O teste do campo (senha - incorreta) não funcionou.`);
        }
        catch (error) {
          expect(error.message).toBe(LOGIN_MESSAGE_ERROR);
        }
      });
    });
  });
});
