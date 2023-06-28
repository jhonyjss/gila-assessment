import { Logs } from '../../logs/entities/logs.entity';
import { User } from '../../users/entities/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class Notifications {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => User, (log) => log.notifications)
  users?: User;

  @ManyToOne(() => Logs, (log) => log.notifications)
  logs?: Logs;
}
