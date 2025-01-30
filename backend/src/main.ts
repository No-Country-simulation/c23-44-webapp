import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as morgan from 'morgan';
import {
  ClassSerializerInterceptor,
  ValidationPipe,
  // Logger,
} from '@nestjs/common';

async function bootstrap() {
<<<<<<< HEAD
  const app = await NestFactory.create(AppModule, {cors: true});
=======
  const app = await NestFactory.create(AppModule, { cors: true });
>>>>>>> 4f043adfe4a6929508e0e99dcc86bba1d315eb16
  const config = new DocumentBuilder()
    .setTitle('Plataforma Educativa')
    .setDescription('The Plataforma Educativa API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // evita campos extras en el Payload al crear
      forbidNonWhitelisted: true,
      //disableErrorMessages: true,
      transformOptions: {
        enableImplicitConversion: true, //Convierte si existe cadena de caracter numericos
      },
    }),
  );

  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
