import { Controller, Post, UploadedFile, UseInterceptors, Inject } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AppService } from './app.service';
import { Db } from 'mongodb';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject('DATABASE_CONNECTION') private db: Db,
  ) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    const text = await this.appService.extractTextFromImage(file.buffer);
    const nutritionalData = this.appService.parseNutritionalData(text);
    await this.db.collection('labels').insertOne(nutritionalData);
    return { message: 'Data saved successfully' };
  }
}