import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';

import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';

import { AppLogger   } from './common/logger/app-logger.service';
import { HttpLoggingInterceptor } from './common/interceptors/http-logging.interceptor';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';


import { RequestContextMiddleware } from './common/logger/request-context.middleware';

import { EmployeesController } from './employees/employees.controller';
import { EmployeesService } from './employees/employees.service';
import { HealthController } from './health/health.controller';
import { MessagingModule } from './messaging/messaging.module';
import { CourseModule } from './course/course.module';

@Module({
  imports: [PrismaModule, AuthModule, MessagingModule, CourseModule],
  controllers: [HealthController, EmployeesController],
  providers: [
    AppLogger,
    EmployeesService,
    { provide: APP_INTERCEPTOR, useClass: HttpLoggingInterceptor },
    { provide: APP_FILTER, useClass: AllExceptionsFilter },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(  RequestContextMiddleware).forRoutes('*');
  }
}
