import {
  // Entity,
  // PrimaryGeneratedColumn,
  // Column,
  ManyToOne,
  OneToMany,
  // CreateDateColumn,
  // UpdateDateColumn,
  //JoinColumn,
  ChildEntity,
  Column,
} from 'typeorm';
import { AdminSchoolEntity } from '../../school/entities/school.entity';
// import { Student } from 'src/student/entities/student.entity';
import { UserBaseEntity } from '../../common/entity/user-base.entity';
import { Student } from 'src/student/entities/student.entity';

@ChildEntity()
export class TeacherEntity extends UserBaseEntity {

  @Column()
  image:string;
  
  @OneToMany(() => Student, (student) => student.id)
  students: Student[];

  @ManyToOne(() => AdminSchoolEntity, (adminSchool) => adminSchool.teachers)
  // @JoinColumn({ name: 'adminSchoolId' })
  adminSchool: AdminSchoolEntity;
  student: any;
}
