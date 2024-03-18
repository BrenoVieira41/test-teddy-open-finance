import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dto/user-create.dto';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) { }

  async findUserByEmail(email: string): Promise<User> {
    return this.userRepository.findOne({ where: { email } });
  }

  async findUserById(id: string): Promise<User> {
    return this.userRepository.findOne({ where: { id } });
  }

  async findUserByEmailWithPassword(email: string): Promise<User> {
    return this.userRepository.findOne({
      where: { email }, select: [
        'id', 'name', 'email', 'password'
      ]
    });
  }

  async createUser(data: CreateUserDto): Promise<User> {
    return this.userRepository.save(data);
  }
}
