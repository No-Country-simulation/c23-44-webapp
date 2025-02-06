import { PartialType } from '@nestjs/swagger';
import { CreatePronunciationPracticeDto } from './create-pronunciation-practice.dto';

export class UpdatePronunciationPracticeDto extends PartialType(CreatePronunciationPracticeDto) {}
