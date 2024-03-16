import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  serverRunning(): string {
    return 'Server is running!';
  }
}
