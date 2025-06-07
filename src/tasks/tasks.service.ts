import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TasksStatus } from './tasks.model';
import { randomUUID } from 'crypto';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskFilterDto } from './dto/task-filter.dto';
import { UpdateTaskStatus } from './dto/update-task-dto';


@Injectable()
export class TasksService {
    private tasks: Task[] = [];

    getAllTasks(): Task[] {
        return this.tasks;
    }

    getTaskWithFilter(filter: TaskFilterDto): Task[] {
        const { search, status } = filter;
        let task = this.getAllTasks();

        if (status) {
            task = task.filter((task) => task.status === filter.status)
        }

        if (search) {
            task = task.filter((task) => {
                if (task.title.includes(search) || task.title.includes(search)) {
                    return true;
                }
                return false;
            });
        }
        return task;
    }

    createTask(task: CreateTaskDto): Task {
        const { title, description } = task;

        const tasks: Task = {
            id: randomUUID(),
            title: title,
            description: description,
            status: TasksStatus.OPEN
        }

        this.tasks.push(tasks);
        return tasks;
    }

    getTaskById(id: string): Task {
        const task = this.tasks.find((task) => task.id === id);

        if (!task) {
            throw new NotFoundException(`Task with id ${id} not found`);
        }

        return task;
    }

    deleteTaskById(id: string): void {
        const found = this.getTaskById(id);
        this.tasks = this.tasks.filter((task) => task.id !== found.id);
    }

    
    updateStatus(id: string, status: TasksStatus): void {
        const task = this.getTaskById(id);
        if (!task) throw new Error(`Task with id ${id} not found`);
        task.status = status;
    }
}
