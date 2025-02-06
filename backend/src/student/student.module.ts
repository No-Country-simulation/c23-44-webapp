import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from './entities/student.entity';
import { StudentService } from './student.service';
import { StudentController } from './student.controller';
import { Repository } from 'typeorm';
import { User } from 'src/auth/entities/user.entity';
import { CloudinaryConfig } from 'src/configCloudinary/cloudinary';
import { CloudinaryService } from 'src/files/cloudinary.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [StudentController],
  providers: [StudentService, Repository,CloudinaryConfig,CloudinaryService],
  imports: [TypeOrmModule.forFeature([Student, User]),AuthModule],
})
export class StudentModule {}
