import { Module } from '@nestjs/common';
import { TeacherService } from './teacher.service';
import { TeacherController } from './teacher.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeacherEntity } from './entities/teacher.entity';
import { AdminSchoolEntity } from '../school/entities/school.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TeacherEntity, AdminSchoolEntity])],
  controllers: [TeacherController],
  providers: [TeacherService],
})
export class TeacherModule {}

