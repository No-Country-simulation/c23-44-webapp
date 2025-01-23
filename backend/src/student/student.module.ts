import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from './entities/student.entity';
import { StudentService } from './student.service';
import { StudentController } from './student.controller';
import { Repository } from 'typeorm';

@Module({
  controllers: [StudentController],
  providers: [StudentService, Repository],
  imports: [TypeOrmModule.forFeature([Student])],
})
export class StudentModule {}
