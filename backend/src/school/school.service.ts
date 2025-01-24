import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AdminSchoolEntity } from './entities/school.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload, ValidRoles } from '../auth/interfaces';
import { LoginUserDto } from '../auth/dto';

@Injectable()
export class SchoolService {
  constructor(
    @InjectRepository(AdminSchoolEntity)
    private adminSchoolRepository: Repository<AdminSchoolEntity>,
    private readonly jwtService: JwtService,
  ) {}
  async findAll(): Promise<AdminSchoolEntity[]> {
    return this.adminSchoolRepository.find({
      relations: ['teachers'],
    });
  }

  async findOne(id: string): Promise<AdminSchoolEntity> {
    return this.adminSchoolRepository.findOne({
      where: { id },
      relations: ['teachers'],
    });
  }

  async create(teacher: Partial<AdminSchoolEntity>): Promise<any> {
    teacher.password = bcrypt.hashSync(teacher.password, 10);
    const newTeacher = this.adminSchoolRepository.create(teacher);
    const savedTeacher = await this.adminSchoolRepository.save(newTeacher);
    return {
      ...savedTeacher,
      role: ValidRoles.ADMIN_SCHOOL,
      token: this.getJwtToken({ id: savedTeacher.id }),
    };
  }

  async update(
    id: string,
    user: Partial<AdminSchoolEntity>,
  ): Promise<AdminSchoolEntity> {
    await this.adminSchoolRepository.update(id, user);
    return this.adminSchoolRepository.findOne({
      where: { id },
      relations: ['teachers'],
    });
  }

  async delete(id: string): Promise<void> {
    await this.adminSchoolRepository.delete(id);
  }

  async login(loginSchool: LoginUserDto): Promise<any> {
    const { email, password } = loginSchool;

    const school = await this.adminSchoolRepository.findOne({
      where: { email },
      select: { email: true, password: true, id: true },
    });
    if (!school) {
      throw new UnauthorizedException('Credentials are not valid');
    }

    if (!bcrypt.compareSync(password, school.password)) {
      throw new UnauthorizedException('Credentials are not valid');
    }

    return {
      ...school,
      token: this.getJwtToken({ id: school.id }),
    };
  }

  private getJwtToken(payload: JwtPayload) {
    const token = this.jwtService.sign(payload);
    return token;
  }
}
