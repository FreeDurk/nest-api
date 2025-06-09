import { IsEnum } from 'class-validator';
import { TasksStatus } from '../tasks-status-enum';

export class UpdateTaskStatus {
  @IsEnum(TasksStatus)
  status: TasksStatus;
}
