import { Controller, Get, Body, Patch, Param, UseGuards } from '@nestjs/common';
import { ParentService } from './parent.service';
import { UpdateParentDto } from './dto/update-parent.dto';
import { AuthGuard } from '@nestjs/passport';
import { RoleProtected } from 'src/auth/decorators/role-protected.decorator';
import { ValidRoles } from 'src/auth/interfaces';
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
  constructor(private readonly parentService: ParentService) {}

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
}
