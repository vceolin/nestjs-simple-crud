import { CommentsService } from './comments.service'
import { PostsController } from './comments.controller'
import { Module } from '@nestjs/common/decorators/modules'

@Module({
  controllers: [PostsController],
  providers: [CommentsService]
})
export class PostsModule {}
