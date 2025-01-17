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
export class Parent {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  //   @ManyToMany(() => Student, student => student.parents)
  //   children: Student[];

  @OneToOne(() => User, (user) => user.parent)
  @JoinColumn()
  user: User;
}
