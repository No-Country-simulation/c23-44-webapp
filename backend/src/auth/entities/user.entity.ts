import {
  BeforeInsert,
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ValidRoles } from '../interfaces';
import { TeacherEntity } from 'src/teacher/entities/teacher.entity';
import { Parent } from '../../parent/entities/parent.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', {
    unique: true,
  })
  email: string;

  @Column('text', {
    select: false,
  })
  password: string;

  @Column('text')
  fullName: string;

  @Column('bool', {
    default: true,
  })
  isActive: boolean;

  @Column('text', {
    default: ValidRoles.PARENT,
  })
  roles: ValidRoles;

  // @OneToOne(() => TeacherEntity, (teacher) => teacher.user)
  // teacher: TeacherEntity;

  @OneToOne(() => Parent, (parent) => parent.user)
  parent: Parent;

  // @OneToOne(() => Student, { nullable: true })
  // @JoinColumn()
  // studentProfile: Student;

  @BeforeInsert()
  checkFieldsBeforeIntert() {
    this.email = this.email.toLowerCase().trim();
  }
}
