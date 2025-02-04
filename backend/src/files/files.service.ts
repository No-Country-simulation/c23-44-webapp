import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Files } from './entity/files.entity';


export class FilesService {
  constructor(
    @InjectRepository(Files)
    private readonly filesRepository: Repository<Files>,
  ) {}

  async uploadFile(fullName: string, mimetype: string, data: Buffer) {
    const files = new Files();
    files.name = fullName;
    files.mimeType = mimetype;
    files.data = data;
    return await this.filesRepository.save(files);
  }
}
