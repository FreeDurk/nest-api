import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task, TasksStatus } from './tasks.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskFilterDto } from './dto/task-filter.dto';
import { UpdateTaskStatus } from './dto/update-task-dto';

@Controller('tasks')
export class TasksController {
    constructor(
        public taskService: TasksService
    ) { }

    @Get()
    getTasks(@Query() filter: TaskFilterDto) {
        if (Object.keys(filter).length) {
            return this.taskService.getTaskWithFilter(filter);
        } else {
            return this.taskService.getAllTasks();
        }

    }

    @Post()
    @UsePipes(new ValidationPipe)
    createTask(@Body() task: CreateTaskDto): Task {
        return this.taskService.createTask(task);
    }

    @Get(':id')
    getTask(@Param('id') id: string): Task {
        return this.taskService.getTaskById(id);
    }

    @Delete(':id')
    deleteTask(@Param('id') id: string): void {
        this.taskService.deleteTaskById(id);
    }

    @Patch(':id/status')
    @UsePipes(new ValidationPipe())
    updateStatus(@Param('id') id: string, @Body('status') updateTaskStatus: UpdateTaskStatus): void {
        const {status} = updateTaskStatus;
        console.log(status);
        this.taskService.updateStatus(id, status);
    }
}
