import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Book } from "./book.entity";

@Entity('imageBook')
export class ImageBook{
    @PrimaryGeneratedColumn('uuid')
    id:string;
    
    @Column()
    image:string;
    
    @Column()
    bookId:string;

     // Relación Muchos a Uno con Book
     @ManyToOne(() => Book, (book) => book.images)
    @JoinColumn({ name: "bookId" }) // Especifica la columna de unión (clave foránea)
    book: Book;
 
}