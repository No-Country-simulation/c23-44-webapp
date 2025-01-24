import { UserBaseEntity } from 'src/common/entity/user-base.entity';
// import { ParentEntity } from 'src/parent/entities/parent.entity';
// import { TeacherEntity } from 'src/teacher/entities/teacher.entity';
import {
  BeforeInsert,
  Entity,
  // OneToOne
} from 'typeorm';

@Entity('student')
export class Student extends UserBaseEntity {
  // @OneToOne(() => ParentEntity, (parent) => parent.student)
  // parent: ParentEntity;

  // @OneToOne(() => TeacherEntity, (teacher) => teacher.student)
  // teacher: TeacherEntity;

  @BeforeInsert()
  normalizeEmail() {
    if (this.email) {
      this.email = this.email.toLowerCase().trim();
    }
  }
}
