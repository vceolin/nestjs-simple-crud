import { Module } from '@nestjs/common/decorators/modules'
import { MiddlewareConsumer, NestModule } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { PublicationsModule } from './publications/publications.module'
import { AuthModule } from './auth/auth.module'
import { CommentsModule } from './comments/comments.module'
import { UsersModule } from './users/users.module'
import { AppLoggerMiddleware } from './middlewares/logger.middleware'

@Module({
  imports: [AuthModule, UsersModule, PublicationsModule, CommentsModule, ConfigModule.forRoot()]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(AppLoggerMiddleware).forRoutes('*')
  }
}
