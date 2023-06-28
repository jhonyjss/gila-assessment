import { Categories } from '../../categories/entities/categories.entity';
import { Logs } from '../../logs/entities/logs.entity';
import { Notifications } from '../../notifications/entities/notifications.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  DeleteDateColumn,
  UpdateDateColumn,
  CreateDateColumn,
  JoinColumn,
  OneToMany,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  phone_number: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;

  @OneToMany(() => Logs, (log) => log.users)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  logs: Logs;

  @OneToMany(() => Categories, (log) => log.users)
  @JoinColumn({ name: 'category_id', referencedColumnName: 'id' })
  categories: Categories;

  @OneToMany(() => Notifications, (log) => log.users)
  @JoinColumn({ name: 'notification_id', referencedColumnName: 'id' })
  notifications: Notifications;
}
