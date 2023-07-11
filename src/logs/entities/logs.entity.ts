import { Categories } from '../../categories/entities/categories.entity';
import { Notifications } from '../../notifications/entities/notifications.entity';
import { User } from '../../users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Logs {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'longtext' })
  message: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;

  @ManyToOne(() => User, (users) => users.logs)
  users: User;

  @ManyToOne(() => Categories, (categories) => categories)
  categories: Categories;

  @ManyToOne(() => Notifications, (notifications) => notifications.logs)
  notifications: Notifications;
}
