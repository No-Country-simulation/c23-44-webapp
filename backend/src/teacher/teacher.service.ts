import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TeacherEntity } from './entities/teacher.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TeacherService {
  constructor(
    @InjectRepository(TeacherEntity)
    private teacherRepository: Repository<TeacherEntity>,
  ) {}
  async findAll(): Promise<TeacherEntity[]> {
    return this.teacherRepository.find();
  }

  async findOne(id: number): Promise<TeacherEntity> {
    return this.teacherRepository.findOne({ where: { id } });
  }

  async create(teacher: Partial<TeacherEntity>): Promise<TeacherEntity> {
    const newTeacher = this.teacherRepository.create(teacher);
    return this.teacherRepository.save(newTeacher);
  }

  async update(
    id: number,
    user: Partial<TeacherEntity>,
  ): Promise<TeacherEntity> {
    await this.teacherRepository.update(id, user);
    return this.teacherRepository.findOne({ where: { id } });
  }

  async delete(id: number): Promise<void> {
    await this.teacherRepository.delete(id);
  }
}
