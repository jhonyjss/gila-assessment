import { Module } from '@nestjs/common';
import { CategoriesModule } from './categories/categories.module';
import { NotificationsModule } from './notifications/notifications.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LogsModule } from './logs/logs.module';
import { ExampleModule } from './example/example.module';
import ormconfig from '../ormconfig';

@Module({
  imports: [
    TypeOrmModule.forRoot(ormconfig),
    CategoriesModule,
    NotificationsModule,
    UsersModule,
    LogsModule,
    ExampleModule,
  ],
})
export class AppModule {}
