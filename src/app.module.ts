import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoriesModule } from './categories/categories.module';
import { NotificationsModule } from './notifications/notifications.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [CategoriesModule, NotificationsModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
