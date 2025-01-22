import {
  ChildEntity,
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TeacherEntity } from '../../teacher/entities/teacher.entity';
import { UserBaseEntity } from '../../common/entity/user-base.entity';

@ChildEntity()
export class AdminSchoolEntity extends UserBaseEntity {
  @OneToMany(() => TeacherEntity, (teacher) => teacher.adminSchool)
  teachers: TeacherEntity[];
}
