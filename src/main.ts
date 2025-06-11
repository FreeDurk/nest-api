import { NestFactory } from '@nestjs/core';
import { ResponseWrapperInterceptor } from './response-wrapper.interceptor';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { TransformInterceptor } from './transform.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useLogger(new Logger());
  // app.useGlobalFilters(new AllExceptionsFilter());
  app.useGlobalInterceptors(new ResponseWrapperInterceptor());
  app.useGlobalInterceptors(new TransformInterceptor());
  await app.listen(process.env.PORT ?? 3000);
}

void bootstrap();
