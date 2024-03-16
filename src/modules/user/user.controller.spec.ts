import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/user-create.dto';
import { UserValidate } from './user.validations';
import { UserRepository } from './repository/user.repository';
import { UserRepositoryMock } from './repository/user.repository.mock';
import { EMAIL_ALREADY_EXIST, EMAIL_ERROR_MESSAGE, NAME_ERROR_MESSAGE } from './user.constants';

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
    mockUser = { name: 'breno', email: 'brenohvl@hotmail.com', password: '2024Test*' };
  });

  describe('Create User', () => {
    it('Should return the error for (NAME) not found', async () => {
      mockUser.name = undefined;
      try {
        await userService.createUser(mockUser);
        fail(`O teste do campo (name) não funcinou.`);
      }
      catch (error) {
        expect(error.message).toBe(NAME_ERROR_MESSAGE);
      }
    });

    it('Should return error for empty (NAME)', async () => {
      mockUser.name = ''
      try {
        await userService.createUser(mockUser);
        fail(`O teste do campo (name) não funcinou.`);
      }
      catch (error) {
        expect(error.message).toBe(NAME_ERROR_MESSAGE);
      }
    });

    it('Should return a (NAME) of a different size than the one entered', async () => {
      mockUser.name = 'tes'
      try {
        await userService.createUser(mockUser);
        fail(`O teste do campo (name) não funcinou.`);
      }
      catch (error) {
        expect(error.message).toBe(NAME_ERROR_MESSAGE);
      }
    });

    it('Should return the error for (EMAIL) not found', async () => {
      mockUser.email = undefined
      try {
        await userService.createUser(mockUser);
        fail(`O teste do campo (email) não funcinou.`);
      }
      catch (error) {
        expect(error.message).toBe(EMAIL_ERROR_MESSAGE);
      }
    });

    it('Should return error for empty (EMAIL)', async () => {
      mockUser.email = ''
      try {
        await userService.createUser(mockUser);
        fail(`O teste do campo (email) não funcinou.`);
      }
      catch (error) {
        expect(error.message).toBe(EMAIL_ERROR_MESSAGE);
      }
    });

    it('Should return half of the (EMAIL)', async () => {
      mockUser.email = 'brenohvl'
      try {
        await userService.createUser(mockUser);
        fail(`O teste do campo (email) não funcinou.`);
      }
      catch (error) {
        expect(error.message).toBe(EMAIL_ERROR_MESSAGE);
      }
    });

    it('Should return (EMAIL) without the domain', async () => {
      mockUser.email = 'brenohvl@hotmail'
      try {
        await userService.createUser(mockUser);
        fail(`O teste do campo (email) não funcinou.`);
      }
      catch (error) {
        expect(error.message).toBe(EMAIL_ERROR_MESSAGE);
      }
    });

    it('Should return (EMAIL) already exists', async () => {
      try {
        await userService.createUser(mockUser);
        fail(`O teste do campo (email) não funcinou.`);
      }
      catch (error) {
        expect(error.message).toBe(EMAIL_ALREADY_EXIST);
      }
    });
  });
});
