import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/user-create.dto';
import { UserValidate } from './user.validations';
import { UserRepository } from './repository/user.repository';
import { UserRepositoryMock } from './repository/user.repository.mock';
import { EMAIL_ALREADY_EXIST, EMAIL_ERROR_MESSAGE, NAME_ERROR_MESSAGE, PASSWORD_ERROR_MESSAGE } from './user.constants';

describe('User', () => {
  let userService: UserService;
  let mockUser: CreateUserDto;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        UserValidate,
        {
          provide: UserRepository,
          useClass: UserRepositoryMock
        }
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
    mockUser = { name: 'breno', email: 'test@hotmail.com', password: '2024Test*' };
  });

  describe('Create User', () => {
    describe('Field Name', () => {
      it('Should return error for empty (Name)', async () => {
        mockUser.name = '';
        try {
          await userService.createUser(mockUser);
          fail(`O teste do campo (name - vazio) não funcionou.`);
        }
        catch (error) {
          expect(error.message).toBe(NAME_ERROR_MESSAGE);
        }
      });

      it('Should return error for undefined (Name)', async () => {
        Reflect.deleteProperty(mockUser, 'name');
        try {
          await userService.createUser(mockUser);
          fail(`O teste do campo (name-não - indefinido) não funcionou.`);
        }
        catch (error) {
          expect(error.message).toBe(NAME_ERROR_MESSAGE);
        }
      });

      it('Should return error for less than 3 characters (Name)', async () => {
        mockUser.name = 'bre';
        try {
          await userService.createUser(mockUser);
          fail(`O teste do campo (name - 3 caracteres) não funcionou.`);
        }
        catch (error) {
          expect(error.message).toBe(NAME_ERROR_MESSAGE);
        }
      });
    });

    describe('Field Email', () => {
      it('Should return error for empty (E-Mail)', async () => {
        mockUser.email = '';
        try {
          await userService.createUser(mockUser);
          fail(`O teste do campo (e-mail - vazio) não funcionou.`);
        }
        catch (error) {
          expect(error.message).toBe(EMAIL_ERROR_MESSAGE);
        }
      });

      it('Should return error for undefined (E-Mail)', async () => {
        Reflect.deleteProperty(mockUser, 'email');
        try {
          await userService.createUser(mockUser);
          fail(`O teste do campo (e-mail - não definido) não funcionou.`);
        }
        catch (error) {
          expect(error.message).toBe(EMAIL_ERROR_MESSAGE);
        }
      });

      it('Should return error for missing middle (E-Mail)', async () => {
        mockUser.email = 'brenohvl';
        try {
          await userService.createUser(mockUser);
          fail(`O teste do campo (e-mail - faltando metade) não funcionou.`);
        }
        catch (error) {
          expect(error.message).toBe(EMAIL_ERROR_MESSAGE);
        }
      });

      it('Should return error for missing domain (E-Mail)', async () => {
        mockUser.email = 'brenohvl@hvl@hotmail';
        try {
          await userService.createUser(mockUser);
          fail(`O teste do campo (e-mail - faltando domínio) não funcionou.`);
        }
        catch (error) {
          expect(error.message).toBe(EMAIL_ERROR_MESSAGE);
        }
      });

      it('Should return error for already registered (E-Mail)', async () => {
        try {
          await userService.createUser(mockUser);
          fail(`O teste do campo (email - já cadastrado) não funcionou.`);
        }
        catch (error) {
          expect(error.message).toBe(EMAIL_ALREADY_EXIST);
        }
      });
    });

    describe('Field Password', () => {
      it('Should return error for empty (Password)', async () => {
        mockUser.password = '';
        try {
          await userService.createUser(mockUser);
          fail(`O teste do campo (senha - vazio) não funcionou.`);
        }
        catch (error) {
          expect(error.message).toBe(PASSWORD_ERROR_MESSAGE);
        }
      });

      it('Should return error for undefined (Password)', async () => {
        Reflect.deleteProperty(mockUser, 'password');
        try {
          await userService.createUser(mockUser);
          fail(`O teste do campo (senha - indefinida) não funcionou.`);
        }
        catch (error) {
          expect(error.message).toBe(PASSWORD_ERROR_MESSAGE);
        }
      });

      it('Should return error for less than 8 characters (Password)', async () => {
        mockUser.password = '123abc';
        try {
          await userService.createUser(mockUser);
          fail(`O teste do campo (senha - faltando caracter) não funcionou.`);
        }
        catch (error) {
          expect(error.message).toBe(PASSWORD_ERROR_MESSAGE);
        }
      });

      it('Should return error for no symbol (Password)', async () => {
        mockUser.password = '2024Senha';
        try {
          await userService.createUser(mockUser);
          fail(`O teste do campo (senha - sem símbolo) não funcionou.`);
        }
        catch (error) {
          expect(error.message).toBe(PASSWORD_ERROR_MESSAGE);
        }
      });

      it('Should return error for no uppercase letter (Password)', async () => {
        mockUser.password = '2024senha*';
        try {
          await userService.createUser(mockUser);
          fail(`O teste do campo (senha - sem letra maiúscula) não funcionou.`);
        }
        catch (error) {
          expect(error.message).toBe(PASSWORD_ERROR_MESSAGE);
        }
      });

      it('Should return error for no number (Password)', async () => {
        mockUser.password = 'senhamuitoBoa*';
        try {
          await userService.createUser(mockUser);
          fail(`O teste do campo (senha - sem letra número) não funcionou.`);
        }
        catch (error) {
          expect(error.message).toBe(PASSWORD_ERROR_MESSAGE);
        }
      });
    });
  });
});
