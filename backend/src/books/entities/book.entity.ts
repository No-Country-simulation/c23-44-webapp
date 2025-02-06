import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ImageBook } from './imageBook.entity';

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

  

    // Relación Uno a Muchos con ImageBook
    @OneToMany(() => ImageBook, (image) => image.book)
    images: ImageBook[];
    
   
}
