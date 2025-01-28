import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('book')
export class Book {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  author: string;

  @Column()
  description: string;

  @Column()
  releaseYear: Date;

  @Column()
  recomendateAge: number;

  @Column()
  content: string;

  @Column()
  category: string;
}
