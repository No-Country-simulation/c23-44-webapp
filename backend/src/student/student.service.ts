import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student } from './entities/student.entity';
import { ParentEntity } from 'src/parent/entities/parent.entity';
import { User } from 'src/auth/entities/user.entity';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student)
    private readonly studentsRepository: Repository<Student>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>    
  ) {}
  async create(createStudentDto: CreateStudentDto): Promise<Student> {
    const user = await this.userRepository.find(
      { where: { id: createStudentDto.parentId},
        relations: ['parent'] }
    )
    console.log(user);
      if(!user) throw new NotFoundException('Parent not Found')
        const {parentId,...rest} = createStudentDto
      console.log(user[0].parent.id);
      const student = this.studentsRepository.create({ ...rest, parent: user[0].parent});
      console.log(student);
    return await this.studentsRepository.save(student);
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
