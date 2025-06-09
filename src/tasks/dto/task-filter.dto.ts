import { IsEnum, IsOptional } from 'class-validator';
import { TasksStatus } from '../tasks.model';

export class TaskFilterDto {
  @IsOptional()
  @IsEnum(TasksStatus)
  status?: TasksStatus;

  @IsOptional()
  search?: string;
}
