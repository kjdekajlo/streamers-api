import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const PORT = 4000;

  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('Streamers API')
    .setDescription(
      'API used for a personal project of kjdekajlo - https://github.com/kjdekajlo',
    )
    .setVersion('1.0')
    .addTag('streamers')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('', app, document);

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(PORT);
  console.log(`\nRunning on http://localhost:${PORT}\n`);
}
bootstrap();
