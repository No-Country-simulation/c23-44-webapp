import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  teachers(id: number): string {
    return 'list of teachers ' + id;
  }
}
