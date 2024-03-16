import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/user-create.dto';
import { validateString } from '../../shared/utils/validations';
import { EMAIL_ERROR_MESSAGE, NAME_ERROR_MESSAGE, PASSWORD_ERROR_MESSAGE } from './user.constants';

@Injectable()
export class UserValidate {
  nameValidate(name: string) {
    if (validateString(name)) throw new BadRequestException(NAME_ERROR_MESSAGE);
  }

  emailValidate(email: string) {
    const emailRegex = new RegExp(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/);

    if (!email || !emailRegex.test(email)) throw new BadRequestException(EMAIL_ERROR_MESSAGE);
  }

  passwordValidate(password: string) {
    const passwordRegex = new RegExp(/^(?=.*[0-9]{3})(?=.*[A-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/);


    if (!password || !passwordRegex.test(password)) throw new BadRequestException(PASSWORD_ERROR_MESSAGE);
  }

  createUserValidate(data: CreateUserDto) {
    const { name, email, password } = data;

    this.nameValidate(name);
    this.emailValidate(email);
    this.passwordValidate(password);
  }
}
