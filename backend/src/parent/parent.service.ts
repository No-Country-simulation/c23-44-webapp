import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateParentDto } from './dto/create-parent.dto';
import { UpdateParentDto } from './dto/update-parent.dto';
import { ParentEntity } from './entities/parent.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ParentService {
  constructor(
    @InjectRepository(ParentEntity)
    private readonly parentRepository: Repository<ParentEntity>,
  ) {}

  async findAll() {
    // return await this.parentRepository.find({
    //   relations: ['user', 'children'],
    // });
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
        throw new NotFoundException(`ParentEntity> with ID ${id} not found`);
      }

      return parent;
    } catch (error) {
      throw new BadRequestException('Contact admin');
    }
  }

  async update(id: string, updateParentDto: UpdateParentDto) {
    const parent = await this.findOne(id);

    if (updateParentDto.userId === parent.user.id) {
      throw new BadRequestException('No changes detected');
    }

    if (updateParentDto.userId) {
    }
  }

  // async addChild(parentId: string, studentId: string): Promise<Parent> {
  //   const parent = await this.findOne(parentId);
  //   const student = await this.studentRepository.findOne({ where: { id: studentId } });

  //   if (!student) {
  //     throw new NotFoundException(`Student with ID ${studentId} not found`);
  //   }

  //   if (!parent.children) {
  //     parent.children = [];
  //   }

  //   if (!parent.children.some(child => child.id === studentId)) {
  //     parent.children.push(student);
  //     await this.parentRepository.save(parent);
  //   }

  //   return parent;
  // }

  // async removeChild(parentId: string, studentId: string): Promise<Parent> {
  //   const parent = await this.findOne(parentId);

  //   parent.children = parent.children.filter(child => child.id !== studentId);
  //   return this.parentRepository.save(parent);
  // }

  async updateParentInfo(
    userId: string,
    updateParentInfoDto: UpdateParentDto,
  ): Promise<ParentEntity> {
    const parent = await this.parentRepository.findOne({
      where: { user: { id: userId } },
      relations: ['user'],
    });

    if (!parent) {
      throw new NotFoundException(
        `Parent profile for user with ID ${userId} not found`,
      );
    }

    // Actualizar la información del padre
    if (updateParentInfoDto.image) {
      parent.image = updateParentInfoDto.image;
    }

    // // Actualizar la información del usuario asociado
    // if (updateParentInfoDto.fullName) {
    //   parent.user.fullName = updateParentInfoDto.fullName;
    // }

    return this.parentRepository.save(parent);
  }
}
