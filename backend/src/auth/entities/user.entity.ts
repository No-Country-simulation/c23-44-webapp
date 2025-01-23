import {
  BeforeInsert,
  Column,
  Entity,
  // JoinColumn,
  // OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ValidRoles } from '../interfaces';
// import { TeacherEntity } from 'src/teacher/entities/teacher.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', {
    unique: true,
    nullable: true,
  })
  email: string;

  @Column('text', {
    select: false,
    nullable: true,
  })
  password: string;

  @Column('text', { nullable: true })
  fullName: string;

  @Column('bool', {
    default: true,
  })
  isActive: boolean;

  @Column('text', {
    default: ValidRoles.TEACHER,
  })
  roles: ValidRoles;

  // @OneToOne(() => TeacherEntity, (teacher) => teacher.user)
  // teacher: TeacherEntity;

  // @OneToOne(() => Parent, { nullable: true })
  // @JoinColumn()
  // parentProfile: Parent;

  // @OneToOne(() => Student, { nullable: true })
  // @JoinColumn()
  // studentProfile: Student;

  @BeforeInsert()
  checkFieldsBeforeIntert() {
    this.email = this.email.toLowerCase().trim();
  }
}
