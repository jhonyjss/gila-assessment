import { Injectable, NotFoundException } from '@nestjs/common';
import { Notifications } from './entities/notifications.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class NotificationsService {
  constructor(
    @InjectRepository(Notifications)
    private readonly notifificationRepo?: Repository<Notifications>,
  ) {}

  async findAll(): Promise<Notifications[]> {
    const notifification = await this.notifificationRepo.find();
    if (!notifification) {
      throw new NotFoundException('Not found any notifications');
    }
    return notifification;
  }
}
