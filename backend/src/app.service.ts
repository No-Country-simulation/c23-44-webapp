import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  teachers(): string {
    return 'list of teachers';
  }
}
