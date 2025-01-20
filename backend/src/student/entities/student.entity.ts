import {
  Column,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

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

  @Column('text', {})
  idProf: string;

  @CreateDateColumn()
  createdAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
