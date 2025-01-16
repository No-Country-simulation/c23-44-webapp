import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AdminSchoolEntity } from './entities/school.entity';

@Injectable()
export class SchoolService {
  constructor(
    @InjectRepository(AdminSchoolEntity)
    private adminSchoolRepository: Repository<AdminSchoolEntity>,
  ) {}
  async findAll(): Promise<AdminSchoolEntity[]> {
    return this.adminSchoolRepository.find({
      relations: ['teachers'],
    });
  }

  async findOne(id: number): Promise<AdminSchoolEntity> {
    return this.adminSchoolRepository.findOne({
      where: { id },
      relations: ['teachers'],
    });
  }

  async create(
    teacher: Partial<AdminSchoolEntity>,
  ): Promise<AdminSchoolEntity> {
    const newTeacher = this.adminSchoolRepository.create(teacher);
    return this.adminSchoolRepository.save(newTeacher);
  }

  async update(
    id: number,
    user: Partial<AdminSchoolEntity>,
  ): Promise<AdminSchoolEntity> {
    await this.adminSchoolRepository.update(id, user);
    return this.adminSchoolRepository.findOne({
      where: { id },
      relations: ['teachers'],
    });
  }

  async delete(id: number): Promise<void> {
    await this.adminSchoolRepository.delete(id);
  }
}
