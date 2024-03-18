import { Body, Controller, Get, Post, Req, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import { IUserRequest } from '../../shared/interfaces/user';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('login')
  @UsePipes(new ValidationPipe())
  async login(
    @Body(ValidationPipe) login: LoginDto,
  ) {
    return this.authService.login(login);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  getProfile(
    @Req() request: IUserRequest
    ) {
    return request.user;
  }
}
