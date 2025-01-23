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

  @Column()
  fullName: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ type: 'enum', enum: ValidRoles, default: ValidRoles.PARENT })
  role: ValidRoles;

  @Column()
  country: string;

  @Column({ default: true })
  isActive: boolean;
}
