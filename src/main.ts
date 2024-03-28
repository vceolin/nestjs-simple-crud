import { NestFactory } from '@nestjs/core'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.useGlobalPipes(new ValidationPipe())

  const config = new DocumentBuilder()
    .setTitle('Nestjs Simple Crud')
    .setDescription(
      'Nessa tarefa, vamos montar uma API simplificada no padrão RESTful com o Node.js e o Express, tendo um array simples como estrutura de dados.'
    )
    .setVersion('1.0')
    .addTag('produtos')
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api', app, document)

  await app.listen(3000)
}
bootstrap()
