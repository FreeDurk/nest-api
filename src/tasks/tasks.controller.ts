import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskFilterDto } from './dto/task-filter.dto';
import { Task } from './task.entity';
import { UpdateTaskStatus } from './dto/update-task-dto';

@Controller('tasks')
export class TasksController {
  constructor(public taskService: TasksService) {}

  @Get()
  @UsePipes(new ValidationPipe())
  getTasks(@Query() filter: TaskFilterDto): Promise<Task[]> {
    if (Object.keys(filter).length) {
      return this.taskService.getTaskWithFilter(filter);
    } else {
      return this.taskService.getAllTasks();
    }
  }

  @Post()
  @UsePipes(new ValidationPipe())
  createTask(@Body() task: CreateTaskDto): Promise<Task> {
    return this.taskService.createTask(task);
  }

  @Get(':id')
  getTask(@Param('id') id: string): Promise<Task> {
    return this.taskService.getTaskById(id);
  }

  @Delete(':id')
  deleteTask(@Param('id') id: string): Promise<void> {
    return this.taskService.deleteTaskById(id);
  }

  @Patch(':id/status')
  @UsePipes(new ValidationPipe())
  updateStatus(
    @Param('id') id: string,
    @Body() updateTaskStatus: UpdateTaskStatus,
  ): Promise<void> {
    const { status } = updateTaskStatus;
    return this.taskService.updateStatus(id, status);
  }
}
