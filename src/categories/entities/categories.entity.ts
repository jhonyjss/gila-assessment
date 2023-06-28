import { Logs } from '../../logs/entities/logs.entity';
import { User } from '../../users/entities/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class Categories {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => Logs, (log) => log.categories)
  logs?: Logs;

  @ManyToOne(() => User, (log) => log.categories)
  users?: User;
}
