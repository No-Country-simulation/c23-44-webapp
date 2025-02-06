import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  Injectable,
  ParseFilePipe,
  FileTypeValidator,
  MaxFileSizeValidator,
  UploadedFiles,
  UseGuards,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from 'src/files/cloudinary.service';

import { UserRoleGuard } from 'src/auth/guards/user-role/user-role.guard';
import { AuthGuard } from '@nestjs/passport';
import { RoleProtected } from 'src/auth/decorators/role-protected.decorator';
import { ValidRoles } from 'src/auth/interfaces';

@Controller('books')
@UseGuards(AuthGuard())
@RoleProtected(ValidRoles.ADMIN_SCHOOL)
@Injectable()
export class BooksController {
  constructor(
    private readonly booksService: BooksService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  @Post()
  async create(@Body() createBookDto: CreateBookDto) {
    return await this.booksService.create(createBookDto);
  }

  @Post('image/:id')
  @UseInterceptors(FilesInterceptor('files',5))
  async uploadFile(@Param('id') id: string,@UploadedFiles(
    new ParseFilePipe({
      validators:[
        new FileTypeValidator({
          fileType:/(jpg|png|gif|svg|jpeg)/,
        }),
        new MaxFileSizeValidator({
          maxSize:100000,
          message:'File must be at least 100kb',
        })
      ]
    })
  ) files: Express.Multer.File[]) {
    //console.log(files);
    const urlsImage=[];
    for (const file of files) {
    const urlImage = await this.cloudinaryService.uploadImagen(file);
    urlsImage.push(urlImage.secure_url);
  
    }
    
    return await this.booksService.updateImagen(id,urlsImage);
  }

  

  @Get()
  async findAll() {
    return await this.booksService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.booksService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
    return await this.booksService.update(id, updateBookDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.booksService.remove(id);
  }
}
