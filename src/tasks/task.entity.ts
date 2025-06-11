import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { TasksStatus } from './tasks-status-enum';
import { User } from 'src/auth/entity/user-entity';
import { Exclude } from 'class-transformer';

@Entity('tasks')
export class Task {
  @PrimaryGeneratedColumn('uuid') id: string;

  @Column() title: string;

  @Column() description: string;

  @Column({ default: TasksStatus.OPEN }) status: TasksStatus;

  @ManyToOne(() => User, (user) => user.tasks, { eager: false })
  @Exclude({ toPlainOnly: true })
  user: User;
}
