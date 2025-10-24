import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { HttpExceptionFilter } from './utils/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configuración de CORS
  app.enableCors({
    origin: '*', // Permite todos los orígenes (puedes especificar una lista de dominios si lo prefieres)
    methods: 'GET,POST,PUT,DELETE', // Métodos permitidos
    allowedHeaders: 'Content-Type, Authorization', // Encabezados permitidos
  });

  // Registro del filtro de excepciones globalmente
  app.useGlobalFilters(new HttpExceptionFilter());

  // Activamos la validación global
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, // Permite transformar el valor de la entrada a los tipos correctos
      whitelist: true, // Solo permite las propiedades que están en el DTO
      forbidNonWhitelisted: true, // Lanza un error si se envían propiedades no permitidas
      exceptionFactory: (errors) => new Error('Validation failed'), // Mensaje de error
    }),
  );

  // Configurar Swagger
  const config = new DocumentBuilder()
    .setTitle('Sistema Comedor API')
    .setDescription(
      'API para la gestión de usuarios y pedidos en el sistema de comedor',
    )
    .setVersion('1.0')
    .addBearerAuth() // Agrega autenticación con JWT
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  await app.listen(3000);
}
bootstrap().catch((err) => {
  console.error('Error al iniciar el servidor:', err);
});
