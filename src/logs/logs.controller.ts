import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { LogsService } from './logs.service';
import { CreateLogsDto } from './dto/create-log.dto';
import { UpdateLogDto } from './dto/update-log.dto';

@Controller('logs')
export class LogsController {
  constructor(private readonly logsService: LogsService) {}

  @Post()
  create(@Body() createLogDto: CreateLogsDto) {
    return this.logsService.create(createLogDto);
  }

  @Get()
  async findAll() {
    return await this.logsService.findAll();
  }
}
