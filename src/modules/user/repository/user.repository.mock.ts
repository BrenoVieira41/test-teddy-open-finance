import { CreateUserDto } from './../dto/user-create.dto'
import { User } from '../user.entity';
import { randomUUID } from 'crypto';

const user: User = {
  id: randomUUID(),
  name: 'test',
  email: 'test@hotmail.com',
  password: '2024Test*',
  created_at: new Date(),
  updated_at: new Date(),
  urls: [],
  acesses: [],
};

export class UserRepositoryMock {
  public findUserByEmail = jest.fn().mockImplementation(async (email: string) => {
    return user;
  });

  public createUser = jest.fn().mockImplementation(async (data: CreateUserDto) => {
    return user
  });

  public findUserByEmailWithPassword = jest.fn().mockImplementation(async (data: CreateUserDto) => {
    return user
  });
}
