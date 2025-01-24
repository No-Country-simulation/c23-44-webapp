import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from './entities/student.entity';
import { StudentService } from './student.service';
import { StudentController } from './student.controller';
import { Repository } from 'typeorm';
import { User } from 'src/auth/entities/user.entity';

@Module({
  controllers: [StudentController],
  providers: [StudentService, Repository],
  imports: [TypeOrmModule.forFeature([Student, User])],
})
export class StudentModule {}
