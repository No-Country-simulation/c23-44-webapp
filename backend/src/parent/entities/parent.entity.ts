import { User } from '../../auth/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  OneToOne,
  JoinColumn,
} from 'typeorm';

@Entity()
export class ParentEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  image: string;

  @OneToOne(() => User, (user) => user.parent)
  @JoinColumn()
  user: User;

  // @ManyToMany(() => StudentEntity, (student) => student.parents)
  // children: StudentEntity[];
}
