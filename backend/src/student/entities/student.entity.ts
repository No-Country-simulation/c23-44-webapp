import { User } from 'src/auth/entities/user.entity';
import {
  Column,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  OneToOne,
} from 'typeorm';
// import { TeacherEntity } from 'src/teacher/entities/teacher.entity';

@Entity('student')
export class Student {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  curso: string;

  @Column('text')
  nivel: string;

  @Column('text')
  organization: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @CreateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @OneToOne(() => User, (user) => user.id)
  user: User;
  // teacher: TeacherEntity;
  // @ManyToMany(() => parentEntity,(parent)=> parent.student)
  // parent: ParentEntity;
}
