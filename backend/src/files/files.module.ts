import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FilesService } from './files.service';
import { FilesController } from './files.controller';
import { Files } from './entity/files.entity';
import { CloudinaryService } from './cloudinary.service';
import { CloudinaryConfig } from 'src/configCloudinary/cloudinary';

@Module({
  imports: [TypeOrmModule.forFeature([Files])],
  controllers: [FilesController],
  providers: [FilesService, CloudinaryService, CloudinaryConfig],
})
export class FilesModule {}
