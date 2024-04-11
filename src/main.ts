import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common'; // Import ValidationPipe

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configure global validation pipe
  app.useGlobalPipes(new ValidationPipe({
    transform: true, // Automatically transform payload to DTO instance
    whitelist: true, // Strip away unknown properties from DTO objects
    forbidNonWhitelisted: true, // Throw error if unknown properties are present in DTO objects
  }));

  const config = new DocumentBuilder()
    .setTitle('CLV2 Tai Dang')
    .setDescription('The Comment API description')
    .setVersion('1.0')
    .addTag('')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
