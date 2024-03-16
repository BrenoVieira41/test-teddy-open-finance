import { CreateUserDto } from './../dto/user-create.dto'
import { User } from '../user.entity';

const user: User = {
  id: 1,
  name: 'test',
  email: 'test@hotmail.com',
  password: '',
  created_at: new Date(),
  updated_at: new Date()
};

export class UserRepositoryMock {
  public findUserByEmail = jest.fn().mockImplementation(async (email: string) => {
    return user;
  });

  public createUser = jest.fn().mockImplementation(async (data: CreateUserDto) => {
    return user
  });
}
