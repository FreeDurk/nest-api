import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Task } from '../task.entity';
import { CreateTaskDto } from '../dto/create-task.dto';
import { TasksStatus } from '../tasks-status-enum';
import { TaskFilterDto } from '../dto/task-filter.dto';

@Injectable()
export class TaskRepository extends Repository<Task> {
  constructor(private dataSource: DataSource) {
    super(Task, dataSource.createEntityManager());
  }

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const { title, description } = createTaskDto;

    const task = this.create({
      title,
      description,
      status: TasksStatus.OPEN,
    });

    return await this.save(task);
  }

  async getTasks(filter: TaskFilterDto): Promise<Task[]> {
    const { status, search } = filter;
    const qB = this.createQueryBuilder('task');

    if (status) {
      qB.andWhere('task.status = :status', { status });
    }

    if (search) {
      qB.andWhere(
        'LOWER(task.title) LIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search)',
        {
          search: `%${search}%`,
        },
      );
    }
    const tasks = await qB.getMany();
    return tasks;
  }
}
