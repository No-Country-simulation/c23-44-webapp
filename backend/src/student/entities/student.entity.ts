import { UserBaseEntity } from 'src/common/entity/user-base.entity';
import { ParentEntity } from 'src/parent/entities/parent.entity';
import { PronunciationPractice } from 'src/pronunciation-practice/entities/pronunciation-practice.entity';
// import { ParentEntity } from 'src/parent/entities/parent.entity';
// import { TeacherEntity } from 'src/teacher/entities/teacher.entity';
import {
  BeforeInsert,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  // OneToOne
} from 'typeorm';

@Entity('student')
export class Student extends UserBaseEntity {
  @Column()
  image: string;

  @ManyToOne(() => ParentEntity, (parent) => parent.student)
  @JoinColumn({ name: 'parentId' }) // Opcional, pero recomendado para claridad
  parent: ParentEntity;

  @OneToMany(
    () => PronunciationPractice,
    (pronunciationPractice) => pronunciationPractice.student,
  )
  pronunciationPractices: PronunciationPractice[];

  @BeforeInsert()
  normalizeEmail() {
    if (this.email) {
      this.email = this.email.toLowerCase().trim();
    }
  }
}
