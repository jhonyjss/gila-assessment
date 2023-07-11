import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateLogsDto } from './dto/create-log.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Logs } from './entities/logs.entity';
import { Repository } from 'typeorm';

@Injectable()
export class LogsService {
  constructor(
    @InjectRepository(Logs)
    private readonly logRepository: Repository<Logs>,
  ) {}

  async create(createLogDto: CreateLogsDto) {
    const logs = await this.logRepository.create(createLogDto);

    if (!logs) {
      throw new HttpException(
        { message: 'log not created' },
        HttpStatus.BAD_REQUEST,
      );
    }

    return this.logRepository.save(logs).then(() => {
      return { message: 'created' };
    });
  }

  async findAll() {
    try {
      const logs = await this.logRepository.find({
        relations: ['users', 'categories'],
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
