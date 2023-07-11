import { PartialType } from '@nestjs/mapped-types';
import { CreateLogsDto } from './create-log.dto';

export class UpdateLogDto extends PartialType(CreateLogsDto) {}
