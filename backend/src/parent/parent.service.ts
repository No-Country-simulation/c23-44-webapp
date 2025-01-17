import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateParentDto } from './dto/create-parent.dto';
import { UpdateParentDto } from './dto/update-parent.dto';
import { Parent } from './entities/parent.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ParentService {
  constructor(
    @InjectRepository(Parent)
    private readonly parentRepository: Repository<Parent>,
  ) {}

  create(parentData: CreateParentDto): Promise<Parent> {
    const parent = this.parentRepository.create();
    return this.parentRepository.save(parent);
  }

  async findAll() {
    return await this.parentRepository.find();
  }

  async findOne(id: string) {
    try {
      const parent = await this.parentRepository.findOne({
        where: { id },
        select: {
          user: {
            id: true,
            fullName: true,
            email: true,
          },
        },
      });

      if (!parent) {
        throw new NotFoundException(`Parent with ID ${id} not found`);
      }

      return parent;
    } catch (error) {
      throw new BadRequestException('Contact admin');
    }
  }

  update(id: string, updateParentDto: UpdateParentDto) {
    return `This action updates a #${id} parent`;
  }

  remove(id: string) {
    return `This action removes a #${id} parent`;
  }
}
