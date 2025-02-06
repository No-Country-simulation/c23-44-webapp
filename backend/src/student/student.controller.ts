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
  UseGuards,
} from '@nestjs/common';
import { StudentService } from './student.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from 'src/files/cloudinary.service';
import { GetUSer } from 'src/auth/decorators/get-user.decorator';
import { User } from 'src/auth/entities/user.entity';
import { ValidRoles } from 'src/auth/interfaces';
import { AuthGuard } from '@nestjs/passport';

@Controller('student')
@UseGuards(AuthGuard())
export class StudentController {
  constructor(private readonly studentService: StudentService,
      private readonly cloudinaryService: CloudinaryService,) {}

  @Post()
  async create(@Body() createStudentDto: CreateStudentDto,  @GetUSer() user: User,) {
   
    return await this.studentService.create({...createStudentDto, parentId: user.id});
  }

  @Get()
  async findAll() {
    return await this.studentService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.studentService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateStudentDto: UpdateStudentDto,
  ) {
    return await this.studentService.update(id, updateStudentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.studentService.remove(id);
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
      return await this.studentService.updateImagen(id, urlImage.secure_url);
    }
}
