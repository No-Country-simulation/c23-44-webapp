import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import type { Repository } from 'typeorm';
import { PronunciationPractice } from './entities/pronunciation-practice.entity';
import type { CreatePronunciationPracticeDto } from './dto/create-pronunciation-practice.dto';
import type { User } from 'src/auth/entities/user.entity';

@Injectable()
export class PronunciationPracticeService {
  constructor(
    @InjectRepository(PronunciationPractice)
    private practiceRepository: Repository<PronunciationPractice>,
  ) {}

  async create(
    createPracticeDto: CreatePronunciationPracticeDto,
    student: User,
  ): Promise<PronunciationPractice> {
    const practice = this.practiceRepository.create({
      ...createPracticeDto,
      student,
      date: new Date(),
    });
    return this.practiceRepository.save(practice);
  }

  async findAllByStudent(studentId: string): Promise<PronunciationPractice[]> {
    return this.practiceRepository.find({
      where: { student: { id: studentId } },
      order: { date: 'DESC' },
    });
  }

  async getStudentProgress(studentId: string): Promise<any> {
    const practices = await this.findAllByStudent(studentId);
    const totalPractices = practices.length;
    const averageScore =
      practices.reduce((sum, practice) => sum + practice.score, 0) /
      totalPractices;
    const mostMispronounced = this.getMostMispronounced(practices);

    return {
      totalPractices,
      averageScore,
      mostMispronounced,
    };
  }

  private getMostMispronounced(practices: PronunciationPractice[]): string[] {
    const wordCounts = practices
      .flatMap((practice) => practice.mispronounced)
      .reduce((acc, word) => {
        acc[word] = (acc[word] || 0) + 1;
        return acc;
      }, {});

    return (
      Object.entries(wordCounts)
        // .sort(([, a], [, b]) => b - a)
        .slice(0, 5)
        .map(([word]) => word)
    );
  }
}
