import { Controller, Get } from '@nestjs/common';
import {ApiProperty, ApiTags} from "@nestjs/swagger";

@Controller()
export class AppController {
  @ApiTags('Healthy')
  @Get('/')
  checkHealth() {
    return '<h1>API is healthy</h1>' ;
  }
}
