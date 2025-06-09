import { NestFactory } from '@nestjs/core';
import { ResponseWrapperInterceptor } from './response-wrapper.interceptor';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.useGlobalFilters(new AllExceptionsFilter());
  app.useGlobalInterceptors(new ResponseWrapperInterceptor());
  await app.listen(process.env.PORT ?? 3000);
}

void bootstrap();
