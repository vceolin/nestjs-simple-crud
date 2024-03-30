import { NestFactory } from '@nestjs/core'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.useGlobalPipes(new ValidationPipe())

  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Social Network API')
    .setDescription(
      'A simple social network API created for training concepts like authentication, authorization, HATEOAS, encryption, openAPI, containers, etc.'
    )
    .setVersion('1.0')
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('', app, document)

  await app.listen(3000)
}
bootstrap()
