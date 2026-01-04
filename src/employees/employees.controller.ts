import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
   Request as ReqDeco
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { EmployeesService } from './employees.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';

import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Public } from '../auth/public.decorator';
import type { AuthenticatedRequest } from 'passport';

type JwtUser = { sub: string; email?: string; roles?: string[]; tenantId?: string };


@ApiTags('Employees')
@Controller('employees')
@UseGuards(JwtAuthGuard) // default: protected


export class EmployeesController {
  constructor(private readonly employees: EmployeesService) {}

  // ✅ NO token verify
  @Public()
  @Post()
  @ApiOperation({ summary: 'Create employee (Public - no token required)' })
  @ApiBody({ type: CreateEmployeeDto })
  @ApiResponse({ status: 201, description: 'Employee created successfully' })
  @ApiResponse({ status: 400, description: 'Validation failed / already exists' })
  create(@Body() dto: CreateEmployeeDto) {
    return this.employees.create(dto);
  }

      // ✅ GET ME (JWT required)
   @Get('me')
  @ApiBearerAuth('JWT-auth')
  getMe(@ReqDeco() req: AuthenticatedRequest) {
    const user = req.user as JwtUser;
    return this.employees.findByAuthUserId(user.sub);
  }

  // ✅ token verify required
  @Get()
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'List employees (JWT required)' })
  @ApiResponse({ status: 200, description: 'Employee list' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  findAll() {
    return this.employees.findAll();
  }

  @Get(':id')
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Get employee by id (JWT required)' })
  @ApiParam({ name: 'id', example: 1 })
  @ApiResponse({ status: 200, description: 'Employee details' })
  @ApiResponse({ status: 404, description: 'Employee not found' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  findOne(@Param('id') id: string) {
    return this.employees.findOne(Number(id));
  }

  @Patch(':id')
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Update employee (JWT required)' })
  @ApiParam({ name: 'id', example: 1 })
  @ApiBody({ type: UpdateEmployeeDto })
  @ApiResponse({ status: 200, description: 'Employee updated' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  update(@Param('id') id: string, @Body() dto: UpdateEmployeeDto) {
    return this.employees.update(Number(id), dto);
  }

  @Delete(':id')
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Delete employee (JWT required)' })
  @ApiParam({ name: 'id', example: 1 })
  @ApiResponse({ status: 200, description: 'Employee deleted' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  remove(@Param('id') id: string) {
    return this.employees.remove(Number(id));
  }


}
