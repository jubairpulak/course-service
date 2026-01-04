// src/course/course.module.ts
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from '../auth/jwt.strategy';
import { CourseService } from './course.service';
import { AccessService } from './access.service';
import { PublicController } from './public/public.controller';
import { MeController } from './me/me.controller';
import { AdminController } from './admin/admin.controller';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from '../common/auth/roles.guard';

@Module({
  imports: [PassportModule],
  controllers: [PublicController, MeController, AdminController],
  providers: [
    JwtStrategy,
    CourseService,
    AccessService,
    { provide: APP_GUARD, useClass: RolesGuard }, // roles works globally (JWT guard is per-route)
  ],
})
export class CourseModule {}
