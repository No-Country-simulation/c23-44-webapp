import { Module } from '@nestjs/common';
import { SchoolService } from './school.service';
import { SchoolController } from './school.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminSchoolEntity } from './entities/school.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([AdminSchoolEntity]), AuthModule],
  controllers: [SchoolController],
  providers: [SchoolService],
})
export class SchoolModule {}
