import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskFilterDto } from './dto/task-filter.dto';
import { Task } from './task.entity';
import { UpdateTaskStatus } from './dto/update-task-dto';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/auth/entity/user-entity';
import { GetUser } from 'src/auth/get-user-decorator';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
  constructor(public taskService: TasksService) {}

  @Get()
  @UsePipes(new ValidationPipe())
  getTasks(
    @Query() filter: TaskFilterDto,
    @GetUser() user: User,
  ): Promise<Task[]> {
    return this.taskService.getAllTasks(filter, user);
  }

  @Post()
  @UsePipes(new ValidationPipe())
  createTask(
    @Body() task: CreateTaskDto,
    @GetUser() user: User,
  ): Promise<Task> {
    return this.taskService.createTask(task, user);
  }

  @Get(':id')
  getTask(@Param('id') id: string, @GetUser() user: User): Promise<Task> {
    return this.taskService.getTaskById(id, user);
  }

  @Delete(':id')
  deleteTask(@Param('id') id: string, @GetUser() user: User): Promise<void> {
    return this.taskService.deleteTaskById(id, user);
  }

  @Patch(':id/status')
  @UsePipes(new ValidationPipe())
  updateStatus(
    @Param('id') id: string,
    @Body() updateTaskStatus: UpdateTaskStatus,
    @GetUser() user: User,
  ): Promise<void> {
    const { status } = updateTaskStatus;
    return this.taskService.updateStatus(id, status, user);
  }
}
