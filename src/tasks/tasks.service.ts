import { Injectable, NotFoundException } from '@nestjs/common';

import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskFilterDto } from './dto/task-filter.dto';
import { TaskRepository } from './repositories/task.repository';
import { TasksStatus } from './tasks-status-enum';

@Injectable()
export class TasksService {
  // constructor(@InjectRepository(Task) private taskRepo: Repository<Task>) {} //other way of repository, straightforward repo implementation
  constructor(private taskRepo: TaskRepository) {}

  async getAllTasks(filter: TaskFilterDto): Promise<Task[]> {
    return await this.taskRepo.getTasks(filter);
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
  async deleteTaskById(id: string): Promise<void> {
    // other way but it calls db twice
    // const task = await this.getTaskById(id); first call
    // await this.taskRepo.remove(task); second call

    const result = await this.taskRepo.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }
  }

  async updateStatus(id: string, status: TasksStatus): Promise<void> {
    await this.taskRepo.update({ id: id }, { status: status });
  }
}
