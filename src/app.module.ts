import { Module } from '@nestjs/common/decorators/modules'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { MiddlewareConsumer, NestModule } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { PublicationsModule } from './publications/publications.module'
import { AuthModule } from './auth/auth.module'
import { CommentsModule } from './comments/comments.module'
import { UsersModule } from './users/users.module'
import { AppLoggerMiddleware } from './middlewares/logger.middleware'

@Module({
  imports: [PublicationsModule, AuthModule, UsersModule, CommentsModule, ConfigModule.forRoot()],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(AppLoggerMiddleware).forRoutes('*')
  }
}
