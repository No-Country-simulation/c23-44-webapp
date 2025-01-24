import { Student } from 'src/student/entities/student.entity';
import { User } from '../../auth/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  OneToOne,
  JoinColumn,
} from 'typeorm';

@Entity('parent_entities')
export class ParentEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  image: string;

  @OneToOne(() => User, (user) => user.parent)
  @JoinColumn()
  user: User;
  student: any;

  @ManyToMany(() => Student, (student) => student.id)
  children: Student[];
}
