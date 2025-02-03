import { Module } from '@nestjs/common';
import { TeacherService } from './teacher.service';
import { TeacherController } from './teacher.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeacherEntity } from './entities/teacher.entity';
import { AdminSchoolEntity } from '../school/entities/school.entity';
import { CloudinaryConfig } from 'src/configCloudinary/cloudinary';
import { CloudinaryService } from 'src/files/cloudinary.service';

@Module({
  imports: [TypeOrmModule.forFeature([TeacherEntity, AdminSchoolEntity])],
  controllers: [TeacherController],
  providers: [TeacherService,CloudinaryConfig,CloudinaryService],
})
export class TeacherModule {}

