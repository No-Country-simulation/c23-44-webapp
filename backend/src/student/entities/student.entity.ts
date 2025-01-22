import {
  Column,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';
import { TeacherEntity } from 'src/teacher/entities/teacher.entity';

@Entity('student')
export class Student {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', {
    name: 'name',
  })
  name: string;

  @Column('text', {
    unique: true,
  })
  email: string;

  @Column('text', {})
  phone: string;

  @Column('text', {})
  organization: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @CreateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @ManyToOne(() => TeacherEntity, (teacher) => teacher.student)
  teacher: TeacherEntity;
  // @ManyToMany(() => parentEntity,(parent)=> parent.student)
  // parent: ParentEntity;
}
