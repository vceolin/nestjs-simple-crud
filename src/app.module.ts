import { Module } from '@nestjs/common/decorators/modules'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { MiddlewareConsumer, NestModule } from '@nestjs/common'
import { AppLoggerMiddleware } from './logger/logger.middleware'
import { ConfigModule } from '@nestjs/config'
import { publicationsModule } from './publications/publications.module'
import { AuthModule } from './auth/auth.module'
import { CommentsModule } from './comments/comments.module'
import { UsersModule } from './users/users.module'

@Module({
  imports: [publicationsModule, AuthModule, UsersModule, CommentsModule, ConfigModule.forRoot()],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(AppLoggerMiddleware).forRoutes('*')
  }
}
