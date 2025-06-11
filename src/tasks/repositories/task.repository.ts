import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Task } from '../task.entity';
import { CreateTaskDto } from '../dto/create-task.dto';
import { TasksStatus } from '../tasks-status-enum';
import { TaskFilterDto } from '../dto/task-filter.dto';
import { User } from 'src/auth/entity/user-entity';

@Injectable()
export class TaskRepository extends Repository<Task> {
  constructor(private dataSource: DataSource) {
    super(Task, dataSource.createEntityManager());
  }

  async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    const { title, description } = createTaskDto;

    const task = this.create({
      title,
      description,
      status: TasksStatus.OPEN,
      user: user,
    });

    return await this.save(task);
  }

  async getTasks(filter: TaskFilterDto, user: User): Promise<Task[]> {
    const { status, search } = filter;
    const qB = this.createQueryBuilder('task');

    qB.where({ user });

    if (status) {
      qB.andWhere('task.status = :status', { status });
    }

    if (search) {
      qB.andWhere(
        '(LOWER(task.title) LIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search))',
        {
          search: `%${search}%`,
        },
      );
    }
    const tasks = await qB.getMany();
    return tasks;
  }
}
