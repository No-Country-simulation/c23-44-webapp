import { Module } from '@nestjs/common';
import { ParentService } from './parent.service';
import { ParentController } from './parent.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ParentEntity } from './entities/parent.entity';
import { User } from 'src/auth/entities/user.entity';
import { AuthModule } from 'src/auth/auth.module';
import { CloudinaryService } from 'src/files/cloudinary.service';
import { CloudinaryConfig } from 'src/configCloudinary/cloudinary';

@Module({
  imports: [TypeOrmModule.forFeature([ParentEntity, User]), AuthModule],
  controllers: [ParentController],
  providers: [ParentService,CloudinaryService,CloudinaryConfig],
  exports: [ParentService, TypeOrmModule],
})
export class ParentModule {}
