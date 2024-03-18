import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { validateEmail, validateString } from '../../shared/utils/validations';
import { EMAIL_ERROR_MESSAGE, LOGIN_MESSAGE_ERROR } from './auth.constants';
import { compare } from 'bcrypt'

@Injectable()
export class AuthValidate {
  emailValidate(email: string) {
    if (validateEmail(email)) throw new BadRequestException(EMAIL_ERROR_MESSAGE);
  }

  authValidate(data: LoginDto) {
    this.emailValidate(data.email)
    this.passwordValidate(data.password);
  }

  passwordValidate(password: string) {
    if (validateString(password)) throw new BadRequestException(LOGIN_MESSAGE_ERROR);
  }

  async passwordIsCorrectValidate(password: string, encryptedPassword: string) {
    this.passwordValidate(password);

    const validPassword = await compare(password, encryptedPassword);

    if (!validPassword) throw new UnauthorizedException(LOGIN_MESSAGE_ERROR);
  }
}
