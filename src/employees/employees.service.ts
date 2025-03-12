import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class EmployeesService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createEmployeeDto: Prisma.EmployeeCreateInput) {
    return this.databaseService.employee.create({ data: createEmployeeDto });
  }

  findAll(role?: 'INTERN' | 'ADMIN' | 'ENGINEER') {
    if (role)
      return this.databaseService.employee.findMany({
        where: { role },
      });
    return this.databaseService.employee.findMany();
  }

  findOne(id: number) {
    const employee = this.databaseService.employee.findUnique({
      where: { id },
    });
    if (!employee) {
      throw new NotFoundException(`Employee Not Found`);
    }
    return employee;
}

  update(id: number, updateEmployeeDto: Prisma.EmployeeUpdateInput) {
    return this.databaseService.employee.update({
      where: {
        id,
      },
      data: updateEmployeeDto,
    });
  }

  remove(id: number) {
    return this.databaseService.employee.delete({
      where: {
        id,
      },
    });
  }
}
