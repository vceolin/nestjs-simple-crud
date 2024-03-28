import { PostsService } from './posts.service'
import { PostsController } from './posts.controller'
import { Module } from '@nestjs/common/decorators/modules'

@Module({
  controllers: [PostsController],
  providers: [PostsService]
})
export class PostsModule {}
