import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from './entities/book.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ImageBook } from './entities/imageBook.entity';



@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,
    @InjectRepository(ImageBook)
    private readonly imagebookRepository: Repository<ImageBook>,    
  ) {}
  async create(createBookDto: CreateBookDto) {
    console.log(createBookDto);
    return await this.bookRepository.save(createBookDto);
  }

  async findAll() {
    return await this.bookRepository.find();
  }

  async findOne(bookId: string) {
    return await this.bookRepository.findOne({
      where: { id: bookId }, // O cualquier otra condición
      relations: ['images'], // ¡Esta línea es crucial!
    });
  }

  async update(id: string, updateBookDto: UpdateBookDto) {
    return await this.bookRepository.update(id, updateBookDto);
  }

    async updateImagen(bookId:string,urlsImages: any[]){ 
      for (const urlImagefile of urlsImages) {
        const imgBook = new ImageBook();
        console.log(urlImagefile);
        imgBook.image = urlImagefile;
        imgBook.bookId = bookId;
        console.log(imgBook);
        await this.imagebookRepository.save(imgBook);
      }     
    }

  async remove(id: string) {
    return await this.bookRepository.softDelete(id);
  }

  
}
