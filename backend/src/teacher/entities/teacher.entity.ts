import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { AdminSchoolEntity } from '../../school/entities/school.entity';
import { Student } from 'src/student/entities/student.entity';

@Entity('teacher')
export class TeacherEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Student, (student) => student.teacher)
  students: Student[];

  @ManyToOne(() => AdminSchoolEntity, (adminSchool) => adminSchool.teachers, {
    onDelete: 'CASCADE',
  })
  adminSchool: AdminSchoolEntity;
}
