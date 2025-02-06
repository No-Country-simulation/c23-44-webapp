import { Student } from 'src/student/entities/student.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity()
export class PronunciationPractice {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Student, (student) => student.pronunciationPractices)
  student: Student;

  @Column()
  text: string;

  @Column()
  transcript: string;

  @Column('simple-array')
  mispronounced: string[];

  @Column()
  score: number;

  @Column()
  date: Date;
}
