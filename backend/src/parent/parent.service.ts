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
import { User } from 'src/auth/entities/user.entity';

@Injectable()
export class ParentService {
  constructor(
    @InjectRepository(ParentEntity)
    private readonly parentRepository: Repository<ParentEntity>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findAll() {
    // return await this.parentRepository.find({
    //   relations: ['user', 'children'],
    // });
    return await this.parentRepository.find();
  }

  async findOne(id: string) {
    const parent = await this.userRepository.findOne({
      where: { id },
      relations: ['parent'],
    });

    if (!parent) {
      throw new NotFoundException(`ParentEntity> with ID ${id} not found`);
    }
    return parent;
  }

  async update(id: string, updateParentDto: UpdateParentDto) {
    const user = await this.findOne(id);

    if (!updateParentDto.image) {
      throw new BadRequestException('Image is required');
    }

    if (updateParentDto.deleteImage) {
      user.parent.image = null; // Setear null para eliminar la imagen
    } else if (updateParentDto.image) {
      user.parent.image = updateParentDto.image;
    }

    return this.userRepository.save(user);
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
}
