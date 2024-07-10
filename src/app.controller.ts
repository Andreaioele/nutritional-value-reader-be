import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get('/')
  checkHealth() {
    return '<h1>API is healthy</h1>' ;
  }
}
