import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';


dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const options = new DocumentBuilder()
    .setTitle('OFS')
    .setDescription('OFS')
    .setVersion('1.0')
    .addServer('http://localhost:3011/', 'LOCAL')
    .addServer('null', 'DEV')
    .addServer('null', 'UAT')
    .addServer('null', 'PROD')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api/docs', app, document);
  // Configura CORS
  app.enableCors({
    origin: '*', // Sostituisci con l'URL del tuo frontend
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  await app.listen(3011);
  console.log('http://localhost:3011')
  console.log(`Api docs available at http://localhost:3011/api/docs`);
}
bootstrap();