import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Notifications {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}
