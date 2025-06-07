import { NestFactory } from '@nestjs/core';
import { TasksModule } from './tasks/tasks.module';
import { ResponseWrapperInterceptor } from './response-wrapper.interceptor';
import { AllExceptionsFilter } from './tasks/all-response.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(TasksModule);
  app.useGlobalFilters(new AllExceptionsFilter());
  app.useGlobalInterceptors(new ResponseWrapperInterceptor)
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
