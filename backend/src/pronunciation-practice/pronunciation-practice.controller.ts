import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { PronunciationPracticeService } from './pronunciation-practice.service';
import { CreatePronunciationPracticeDto } from './dto/create-pronunciation-practice.dto';
import { GetUSer } from '../auth/decorators/get-user.decorator';
import type { User } from 'src/auth/entities/user.entity';

@ApiTags('pronunciation-practice')
@Controller('pronunciation-practice')
@UseGuards(AuthGuard())
@ApiBearerAuth()
export class PronunciationPracticeController {
  constructor(private readonly practiceService: PronunciationPracticeService) {}

  @Post()
  create(
    @Body() createPracticeDto: CreatePronunciationPracticeDto,
    @GetUSer() user: User,
  ) {
    return this.practiceService.create(createPracticeDto, user);
  }

  @Get('progress')
  getProgress(@GetUSer() user: User) {
    return this.practiceService.getStudentProgress(user.id);
  }
}
