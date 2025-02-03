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
  ParseFilePipe,
  FileTypeValidator,
  MaxFileSizeValidator,
} from '@nestjs/common';

import { TeacherService } from './teacher.service';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from 'src/files/cloudinary.service';

@Controller('teacher')
export class TeacherController {
  constructor(private readonly teacherService: TeacherService,
      private readonly cloudinaryService: CloudinaryService,) {}

  @Post()
  create(@Body() createTeacherDto: CreateTeacherDto) {
    return this.teacherService.create(createTeacherDto);
  }

  @Get()
  findAll() {
    return this.teacherService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.teacherService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTeacherDto: UpdateTeacherDto) {
    return this.teacherService.update(id, updateTeacherDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.teacherService.delete(id);
  }

   @Post('profile/:id')
    @UseInterceptors(FileInterceptor('file'))
    async uploadFile(
      @Param('id') id: string,
      @UploadedFile(
        new ParseFilePipe({
          validators: [
            new FileTypeValidator({
              fileType: /(jpg|png|gif|svg|jpeg)/,
            }),
            new MaxFileSizeValidator({
              maxSize: 100000,
              message: 'File must be at least 100kb',
            }),
          ],
        }),
      )
      file: Express.Multer.File,
    ) {
      const urlImage = await this.cloudinaryService.uploadImagen(file);
      // console.log(urlImage.secure_url);
      return await this.teacherService.updateImagen(id, urlImage.secure_url);
    }
}
