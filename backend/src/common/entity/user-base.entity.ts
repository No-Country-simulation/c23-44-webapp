import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  TableInheritance,
} from 'typeorm';
import { ValidRoles } from '../interface/user-roles';

@Entity()
@TableInheritance({ column: { type: 'varchar', name: 'type' } })
export class UserBaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  fullName: string;

  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true })
  password: string;

  @Column({ nullable: true })
  role: ValidRoles;

  @Column({ nullable: true })
  country: string;

  @Column({ nullable: true, default: true })
  isActive: boolean;
}
