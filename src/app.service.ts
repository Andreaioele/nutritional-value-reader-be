import { Injectable } from '@nestjs/common';
import { createWorker } from 'tesseract.js';
import * as sharp from 'sharp';

@Injectable()
export class AppService {
  async extractTextFromImage(imageBuffer: Buffer): Promise<string> {
    // Preprocessamento dell'immagine
    const processedImage = await sharp(imageBuffer)
      .resize({ width: 1000, height: 1000, fit: 'inside' }) // Ridimensionamento condizionale mantenendo il rapporto
      .grayscale() // Conversione in scala di grigi
      .normalize() // Normalizzazione del contrasto
      .median(3) // Filtro di riduzione del rumore
      .toBuffer();

    // Creazione e configurazione del worker di Tesseract
    const worker = await createWorker('ita');

    const { data: { text } } = await worker.recognize(processedImage);
    await worker.terminate();

    console.log('Extracted Text:', text);
    return text;
  }


  parseNutritionalData(text: string): any {
    const lines = text.split('\n');
    const data: any = {};

    console.log('Parsed Lines:', lines);

    lines.forEach(line => {
      if (line.includes('Energia')) {
        const match = line.match(/(\d+)\s*kJ\/(\d+)\s*kcal/);
        if (match) {
          data.energyKJ = parseInt(match[1], 10);
          data.energyKcal = parseInt(match[2], 10);
        }
      } else if (line.includes('Grassi')) {
        data.fat = this.extractNumber(line);
      } else if (line.includes('acidi grassi saturi')) {
        data.saturatedFat = this.extractNumber(line);
      } else if (line.includes('Carboidrati')) {
        data.carbohydrates = this.extractNumber(line);
      } else if (line.includes('zuccheri')) {
        data.sugars = this.extractNumber(line);
      } else if (line.includes('Proteine')) {
        data.protein = this.extractNumber(line);
      } else if (line.includes('Sale')) {
        data.salt = this.extractNumber(line);
      }
    });

    console.log('Parsed Nutritional Data:', data);
    return data;
  }

  extractNumber(text: string): number {
    const match = text.match(/(\d+,\d+|\d+)/);
    return match ? parseFloat(match[0].replace(',', '.')) : 0;
  }
}