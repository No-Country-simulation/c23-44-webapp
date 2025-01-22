import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  ChildEntity,
} from 'typeorm';
import { AdminSchoolEntity } from '../../school/entities/school.entity';
import { Student } from 'src/student/entities/student.entity';
import { UserBaseEntity } from '../../common/entity/user-base.entity';

@ChildEntity()
export class TeacherEntity extends UserBaseEntity {
  @OneToMany(() => Student, (student) => student.teacher)
  students: Student[];

  @ManyToOne(() => AdminSchoolEntity, (adminSchool) => adminSchool.teachers)
  // @JoinColumn({ name: 'adminSchoolId' })
  adminSchool: AdminSchoolEntity;
}
