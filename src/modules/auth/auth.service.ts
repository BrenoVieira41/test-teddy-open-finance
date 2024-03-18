import { UnauthorizedException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from '../user/repository/user.repository';
import { LoginDto } from './dto/login.dto';
import { AuthValidate } from './auth.validate';
import { LOGIN_MESSAGE_ERROR } from './auth.constants';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userRepository: UserRepository,
    private readonly validation: AuthValidate,

  ) { }

  async login(data: LoginDto) {
    this.validation.authValidate(data);
    const { password } = data;

    const user = await this.userRepository.findUserByEmailWithPassword(data.email);
    if (!user) throw new UnauthorizedException(LOGIN_MESSAGE_ERROR);

    await this.validation.passwordIsCorrectValidate(password, user.password);

    const payload = { email: user.email, id: user.id, name: user.name };
    Reflect.deleteProperty(user, 'password');

    return {
      user,
      token: this.jwtService.sign(payload),
    };
  }

  async tokenIsValid(token: string) {
    try {
      const decoded = this.jwtService.verify(token);
      return decoded;
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
