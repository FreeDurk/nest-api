import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task, TasksStatus } from './tasks.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskFilterDto } from './dto/task-filter.dto';

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
    createTask(@Body() task: CreateTaskDto): Task {
        return this.taskService.createTask(task);
    }

    @Get(':id')
    getTask(@Param('id') id: string): Task {
        return this.taskService.getTaskById(id);
    }

    @Delete(':id/status')
    deleteTask(@Param('id') id: string): void {
        this.taskService.deleteTaskById(id);
    }

    @Patch(':id/status')
    updateStatus(@Param('id') id: string, @Body('status') status: TasksStatus): void {
        this.taskService.updateStatus(id, status);
    }
}
