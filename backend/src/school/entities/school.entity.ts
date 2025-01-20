import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { TeacherEntity } from '../../teacher/entities/teacher.entity';

@Entity()
export class AdminSchoolEntity {
  @PrimaryGeneratedColumn()
  id: number;

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

  // Define the one-to-many relationship
  @OneToMany(() => TeacherEntity, (teacher) => teacher.adminSchool)
  teachers: TeacherEntity[];
}
