import { Module } from '@nestjs/common/decorators/modules'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { PostsModule } from './posts/posts.module'
import { AuthModule } from './auth/auth.module'
import { UsersModule } from './users/users.module'
import { MiddlewareConsumer, NestModule } from '@nestjs/common'
import { AppLoggerMiddleware } from './logger/logger.middleware'
import { ConfigModule } from '@nestjs/config'

@Module({
  imports: [PostsModule, AuthModule, UsersModule, ConfigModule.forRoot()],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(AppLoggerMiddleware).forRoutes('*')
  }
}
