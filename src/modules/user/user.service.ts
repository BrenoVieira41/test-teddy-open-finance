import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/user-create.dto';
import { UserValidate } from './user.validations';
import { hash } from 'bcrypt'
import { UserRepository } from './repository/user.repository';
import { EMAIL_ALREADY_EXIST } from './user.constants';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    private readonly validation: UserValidate,
    private readonly userRepository: UserRepository
    ) { }

  async createUser(data: CreateUserDto): Promise<User> {
    this.validation.createUserValidate(data);

    const { password } = data;
    const newPassword = await hash(password, 7);

    const userExist = await this.userRepository.findUserByEmail(data.email);

    if (userExist) throw new ConflictException(EMAIL_ALREADY_EXIST);

    const newUser = await this.userRepository.createUser({...data, password: newPassword});
    Reflect.deleteProperty(newUser, 'password');

    return newUser;
  }

}
