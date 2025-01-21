import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { TeacherEntity } from '../../teacher/entities/teacher.entity';

@Entity()
export class AdminSchoolEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  description: string;

  @Column()
  password: string;

  @Column()
  country: string;

  @Column()
  isActive: boolean;

  @OneToMany(() => TeacherEntity, (teacher) => teacher.adminSchool)
  teachers: TeacherEntity[];
}
