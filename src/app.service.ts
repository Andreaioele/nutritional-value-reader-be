import { Injectable } from '@nestjs/common';
import Tesseract from 'tesseract.js';
import sharp from 'sharp';

@Injectable()
export class AppService {
  async extractTextFromImage(imageBuffer: Buffer): Promise<string> {
    const processedImage = await sharp(imageBuffer).resize(1000).toBuffer();
    const result = await Tesseract.recognize(processedImage, 'eng', {
      logger: (m) => console.log(m),
    });
    return result.data.text;
  }

  parseNutritionalData(text: string): any {
    const lines = text.split('\n');
    const data: any = {};

    lines.forEach(line => {
      if (line.includes('Calories')) {
        data.calories = parseInt(line.replace(/\D/g, ''), 10);
      }
      // Aggiungi ulteriori parsing per altri valori nutrizionali
    });

    return data;
  }
}