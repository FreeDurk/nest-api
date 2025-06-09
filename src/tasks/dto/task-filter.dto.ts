import { IsEnum, IsOptional } from 'class-validator';
import { TasksStatus } from '../tasks-status-enum';

export class TaskFilterDto {
  @IsOptional()
  @IsEnum(TasksStatus)
  status?: TasksStatus;

  @IsOptional()
  search?: string;
}
