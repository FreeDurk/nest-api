import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'secret',
      database: 'task-management',
      autoLoadEntities: true,
      synchronize: true,
      logging: false,
    }),
    TasksModule,
  ],
})
export class AppModule {}
