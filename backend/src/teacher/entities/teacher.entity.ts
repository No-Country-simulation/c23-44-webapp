import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { AdminSchoolEntity } from '../../school/entities/school.entity';

@Entity()
export class TeacherEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @ManyToOne(() => AdminSchoolEntity, (adminSchool) => adminSchool.teachers)
  adminSchool: AdminSchoolEntity;
}
