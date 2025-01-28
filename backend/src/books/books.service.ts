import { Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from './entities/book.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,
  ) {}
  async create(createBookDto: CreateBookDto) {
    console.log(createBookDto);
    return await this.bookRepository.save(createBookDto);
  }

  async findAll() {
    return await this.bookRepository.find();
  }

  async findOne(id: string) {
    return await this.bookRepository.findOne({
      where: { id },
    });
  }

  async update(id: string, updateBookDto: UpdateBookDto) {
    return await this.bookRepository.update(id, updateBookDto);
  }

  async remove(id: string) {
    return await this.bookRepository.softDelete(id);
  }
}
