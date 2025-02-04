import { Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from './entities/book.entity';
import { CloudinaryService } from 'src/files/cloudinary.service';
import { CloudinaryConfig } from 'src/configCloudinary/cloudinary';



@Module({
  imports: [TypeOrmModule.forFeature([Book])],
  controllers: [BooksController],
  providers: [BooksService,CloudinaryService,CloudinaryConfig],
})
export class BooksModule {}
