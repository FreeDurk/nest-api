import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { TasksStatus } from './tasks-status-enum';

@Entity('tasks')
export class Task {
  @PrimaryGeneratedColumn('uuid') id: string;

  @Column() title: string;

  @Column() description: string;

  @Column({ default: TasksStatus.OPEN }) status: TasksStatus;
}
