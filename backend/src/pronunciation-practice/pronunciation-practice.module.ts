import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PronunciationPracticeService } from './pronunciation-practice.service';
import { PronunciationPracticeController } from './pronunciation-practice.controller';
import { PronunciationPractice } from './entities/pronunciation-practice.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([PronunciationPractice]), AuthModule],
  controllers: [PronunciationPracticeController],
  providers: [PronunciationPracticeService],
})
export class PronunciationPracticeModule {}
