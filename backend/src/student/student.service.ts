import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student } from './entities/student.entity';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student)
    private readonly studentsRepository: Repository<Student>,
  ) {}
  async create(createStudentDto: CreateStudentDto) {
    
    return await this.studentsRepository.save(createStudentDto);
  }

  async findAll() {
    return await this.studentsRepository.find();
  }

  async findOne(id: string) {
    return await this.studentsRepository.findOne({
      where: { id },
    });
  }

  async update(id: string, updateStudentDto: UpdateStudentDto) {
    return await this.studentsRepository.update(id, updateStudentDto);
  }

  async remove(id: string) {
    return await this.studentsRepository.softDelete(id);
  }

  async updateImagen(id:string, image:string){
      const studentSearhed = await this.studentsRepository.findOne({
            where: { id },
          });
          console.log(studentSearhed);
          if (!studentSearhed) throw new NotFoundException('parent not found');
          studentSearhed.image = image;
          const uploadstudent = await this.studentsRepository.update(id,studentSearhed);
          return uploadstudent;
  }
}
