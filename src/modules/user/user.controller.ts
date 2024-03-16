import {
  Body,
  Controller,
  Post,
  ValidationPipe,
  UsePipes
} from '@nestjs/common';
import { CreateUserDto } from './dto/user-create.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post()
  @UsePipes(new ValidationPipe())
  async createUser(
    @Body(ValidationPipe) createUserDto: CreateUserDto,
  ): Promise<any> {
    return this.userService.createUser(createUserDto);
  }
}
