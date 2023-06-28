import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUsersDto } from './dto/create.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUsersDto) {
    const user = await this.userRepository.create(createUserDto);
    if (!user) {
      throw new HttpException(
        { message: 'user not created' },
        HttpStatus.BAD_REQUEST,
      );
    }

    return this.userRepository
      .save(user)
      .then(() => {
        return { message: 'created' };
      })
      .catch((err) => {
        switch (err.code) {
          case 'ER_DUP_ENTRY':
            throw new HttpException(
              { message: 'user already registered' },
              HttpStatus.FORBIDDEN,
            );
          case 'ER_NO_REFERENCED_ROW_2':
            throw new HttpException(
              { message: 'Error on Mysql: ' + err },
              HttpStatus.BAD_REQUEST,
            );
          default:
            throw new HttpException(
              { message: 'Erro on server: ' + err },
              HttpStatus.BAD_REQUEST,
            );
        }
      });
  }

  async findAll(): Promise<User[]> {
    try {
      const logs = await this.userRepository.find({
        relations: ['logs', 'logs.categories', 'logs.notifications'],
      });
      return logs;
    } catch (error) {
      throw new HttpException(
        { message: error.message },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
