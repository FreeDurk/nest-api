import { IsEnum } from 'class-validator';
import { TasksStatus } from '../tasks.model';

export class UpdateTaskStatus {
  @IsEnum(TasksStatus)
  status: TasksStatus;
}
