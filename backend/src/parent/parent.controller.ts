import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  UseGuards,
  Post,
  UseInterceptors,
  ParseFilePipe,
  FileTypeValidator,
  MaxFileSizeValidator,
  UploadedFile,
} from '@nestjs/common';
import { ParentService } from './parent.service';
import { UpdateParentDto } from './dto/update-parent.dto';
import { AuthGuard } from '@nestjs/passport';
import { RoleProtected } from 'src/auth/decorators/role-protected.decorator';
import { ValidRoles } from 'src/auth/interfaces';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from 'src/files/cloudinary.service';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Parent')
@Controller('parent')
@ApiBearerAuth()
export class ParentController {
  constructor(
    private readonly parentService: ParentService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  // @Post()
  // create(@Body() createParentDto: CreateParentDto) {
  //   return this.parentService.create(createParentDto);
  // }

  @Get()
  findAll() {
    return this.parentService.findAll();
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.parentService.findOne(+id);
  // }

  @ApiOperation({ summary: 'Update the image of a parent' })
  @ApiParam({ name: 'id', type: 'string', description: 'Parent ID' })
  @Patch(':id/image')
  @UseGuards(AuthGuard())
  @RoleProtected(ValidRoles.PARENT)
  update(@Param('id') id: string, @Body() updateParentDto: UpdateParentDto) {
    return this.parentService.update(id, updateParentDto);
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.parentService.remove(+id);
  // }

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
    return await this.parentService.updateImagen(id, urlImage.secure_url);
  }
}
