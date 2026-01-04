import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class EmployeesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateEmployeeDto) {
    // example: email unique check
    const exists = await this.prisma.employee.findUnique({ where: { email: dto.email } });
    if (exists) throw new BadRequestException('Employee already exists');

    const employee = await this.prisma.employee.create({
      data: { authUserId:dto.authUserId, fullName: dto.fullName ?? null, email: dto.email, phone: dto.phone ?? null },
    });

    return { success: true, data: employee };
  }

  async findAll() {
    const list = await this.prisma.employee.findMany({ orderBy: { id: 'desc' } });
    return { success: true, data: list };
  }

  async findOne(id: number) {
    const emp = await this.prisma.employee.findUnique({ where: { id } });
    if (!emp) throw new NotFoundException('Employee not found');
    return { success: true, data: emp };
  }

 async update(id: number, dto: UpdateEmployeeDto) {
  await this.findOne(id);

  const data: Prisma.EmployeeUpdateInput = {
    fatherName: dto.fatherName ?? undefined,
    motherName: dto.motherName ?? undefined,

    dateOfBirth: dto.dateOfBirth
      ? new Date(dto.dateOfBirth)
      : undefined,

    gender: dto.gender ?? undefined,

    // ✅ Json fields → cast to InputJsonValue
    presentAddress: dto.presentAddress
      ? (dto.presentAddress as Prisma.InputJsonValue)
      : undefined,

    permanentAddress: dto.permanentAddress
      ? (dto.permanentAddress as Prisma.InputJsonValue)
      : undefined,

    education: dto.education
  ? (dto.education as unknown as Prisma.InputJsonValue)
  : undefined,

    experiences: dto.experiences
      ? (dto.experiences as unknown as Prisma.InputJsonValue)
      : undefined,

    skills: dto.skills
      ? (dto.skills as Prisma.InputJsonValue)
      : undefined,

    trainings: dto.trainings
      ? (dto.trainings as Prisma.InputJsonValue)
      : undefined,

    passportNumber: dto.passportNumber ?? undefined,
    passportIssueAt: dto.passportIssueAt
      ? new Date(dto.passportIssueAt)
      : undefined,
    passportExpireAt: dto.passportExpireAt
      ? new Date(dto.passportExpireAt)
      : undefined,

    passportFileUrl: dto.passportFileUrl ?? undefined,
    profilePhotoUrl: dto.profilePhotoUrl ?? undefined,

    otherDocs: dto.otherDocs
      ? (dto.otherDocs as unknown as Prisma.InputJsonValue)
      : undefined,

    isCompleted:
      typeof dto.isCompleted === 'boolean'
        ? dto.isCompleted
        : undefined,
  };

  const updated = await this.prisma.employee.update({
    where: { id },
    data,
  });

  return { success: true, data: updated };
}

  async remove(id: number) {
    await this.findOne(id);
    await this.prisma.employee.delete({ where: { id } });
    return { success: true };
  }

    // ✅ NEW: find by authUserId
  async findByAuthUserId(authUserId: string) {
    console.log("hello jp")
    const employee = await this.prisma.employee.findUnique({
      where: { authUserId },
    });

    if (!employee) {
      throw new NotFoundException('Employee profile not found');
    }

    return employee;
  }

}
