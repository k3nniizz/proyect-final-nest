import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // integrar para que las validaciones funcionen en produccion
  app.useGlobalPipes(
    new ValidationPipe({
      //se asegura de que no dentren datos de mas en el payload(ingnorando los datos de mas)
      whitelist: true,
      //arroja un mensaje de alerta por datos de mas(alerta)
      forbidNonWhitelisted: true,
    }),
  );

  // Configuración Swagger en NestJS
  const config = new DocumentBuilder()
    .setTitle('API')
    .setDescription('MY STORE - Claudio Silva')
    .setVersion('5.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  //url api
  SwaggerModule.setup('docs', app, document);
  app.enableCors();

  await app.listen(3000);
}
bootstrap();
