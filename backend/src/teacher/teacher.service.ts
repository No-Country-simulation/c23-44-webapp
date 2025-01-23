import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TeacherEntity } from './entities/teacher.entity';
import { Repository } from 'typeorm';
import { AdminSchoolEntity } from '../school/entities/school.entity';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { ValidRoles } from '../common/interface/user-roles';

@Injectable()
export class TeacherService {
  constructor(
    @InjectRepository(TeacherEntity)
    private teacherRepository: Repository<TeacherEntity>,
    @InjectRepository(AdminSchoolEntity)
    private adminSchoolRepository: Repository<AdminSchoolEntity>,
  ) {}
  async findAll(): Promise<TeacherEntity[]> {
    return this.teacherRepository.find();
  }

  async findOne(id: string): Promise<TeacherEntity> {
    return this.teacherRepository.findOne({ where: { id } });
  }

  async create(teacher: CreateTeacherDto): Promise<TeacherEntity> {
    const findAdminSchool = await this.adminSchoolRepository.findOneBy({
      id: teacher.adminSchoolId,
    });
    const newTeacher = this.teacherRepository.create({
      ...teacher,
      role: ValidRoles.TEACHER,
      adminSchool: findAdminSchool,
    });
    return this.teacherRepository.save(newTeacher);
  }

  async update(
    id: string,
    user: Partial<TeacherEntity>,
  ): Promise<TeacherEntity> {
    await this.teacherRepository.update(id, user);
    return this.teacherRepository.findOne({ where: { id } });
  }

  async delete(id: string): Promise<void> {
    await this.teacherRepository.delete(id);
  }
}
