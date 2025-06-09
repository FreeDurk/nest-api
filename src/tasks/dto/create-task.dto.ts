import { IsOptional } from 'class-validator';

export class CreateTaskDto {
  @IsOptional()
  title: string;

  @IsOptional()
  description: string;
}
