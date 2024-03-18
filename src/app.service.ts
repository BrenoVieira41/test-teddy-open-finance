import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  constructor() {}

  serverRunning(): string {
    return 'Server is running!';
  }
}
