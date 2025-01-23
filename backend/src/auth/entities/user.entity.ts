import {
  BeforeInsert,
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ValidRoles } from '../interfaces';
import { TeacherEntity } from 'src/teacher/entities/teacher.entity';
import { ParentEntity } from '../../parent/entities/parent.entity';
import { UserBaseEntity } from 'src/common/entity/user-base.entity';

@Entity('users')
export class User extends UserBaseEntity {
  @OneToOne(() => ParentEntity, (parent) => parent.user)
  parent: ParentEntity;

  @BeforeInsert()
  normalizeEmail() {
    if (this.email) {
      this.email = this.email.toLowerCase().trim();
    }
  }
}
