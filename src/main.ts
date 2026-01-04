import { NestFactory } from '@nestjs/core';
 import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { Logger, ValidationPipe } from '@nestjs/common';

import { AppModule } from './app.module';
import { AppLogger } from './common/logger/app-logger.service';
import { PrismaService } from './prisma/prisma.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
app.enableCors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: '*',
});


  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  app.enableShutdownHooks();

  // prisma shutdown hook
  // const prisma = app.get(PrismaService);
  // await prisma.enableShutdownHooks(app);

  // ✅ Swagger
  const config = new DocumentBuilder()
    .setTitle('Course Service API')
    .setDescription('ManPowerX - Course Service (Singleton Microservice)')
    .setVersion('1.0.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        in: 'header',
      },
      'JWT-auth',
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('apis', app, document, {
    swaggerOptions: { persistAuthorization: true },
  });

  const port = Number(process.env.PORT ?? 4006);
  await app.listen(port);

  const log = app.get(AppLogger);
  Logger.log(`Auth service running on http://localhost:${port}`, 'Bootstrap');
}

bootstrap();
