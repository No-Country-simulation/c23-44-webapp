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

  @CreateDateColumn()
  createdAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @ManyToOne(() => TeacherEntity, (teacher) => teacher.students, {
    onDelete: 'CASCADE',
  })
  teacher: TeacherEntity;
}
