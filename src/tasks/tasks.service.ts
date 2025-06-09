import { Injectable, NotFoundException } from '@nestjs/common';

import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskFilterDto } from './dto/task-filter.dto';
import { TaskRepository } from './repositories/task.repository';

@Injectable()
export class TasksService {
  // constructor(@InjectRepository(Task) private taskRepo: Repository<Task>) {} //other way of repository, straightforward repo implementation
  constructor(private taskRepo: TaskRepository) {}

  async getAllTasks(): Promise<Task[]> {
    const tasks = await this.taskRepo.find();
    return tasks;
  }
  async getTaskWithFilter(filter: TaskFilterDto): Promise<Task[]> {
    const { search, status } = filter;
    const tasks = await this.taskRepo.find({
      where: {
        status: status,
        title: search,
      },
    });

    return tasks;
  }

  createTask(task: CreateTaskDto): Promise<Task> {
    return this.taskRepo.createTask(task);
  }

  async getTaskById(id: string): Promise<Task> {
    const task = await this.taskRepo.findOne({ where: { id } });

    if (!task) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }

    return task;
  }
  // deleteTaskById(id: string): void {
  //   const found = this.getTaskById(id);
  //   this.tasks = this.tasks.filter((task) => task.id !== found.id);
  // }
  // updateStatus(id: string, status: TasksStatus): void {
  //   const task = this.getTaskById(id);
  //   task.status = status;
  // }
}
