import { PostsService } from './posts.service'
import { CreatePostDto } from './dto/create-post.dto'
import { UpdatePostDto } from './dto/update-post.dto'
import { Controller } from '@nestjs/common/decorators/core'
import { Post, Body, Get, Param, Delete, HttpCode, Patch } from '@nestjs/common/decorators/http'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { SkipAuth } from '@/auth/decorators/skip-auth.decorator'
import { AuthUser } from '@/auth/decorators/auth-user.decorator'
import { JwtUserEntity } from '@/auth/entities/jwt-user.entity'

@ApiTags('posts')
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @ApiBearerAuth()
  @Post()
  create(@Body() createPostDto: CreatePostDto, @AuthUser() user: JwtUserEntity) {
    return this.postsService.create(createPostDto, user.id)
  }

  @SkipAuth()
  @Get()
  findAll() {
    return this.postsService.findAll()
  }

  @SkipAuth()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postsService.findOne(id)
  }

  @ApiBearerAuth()
  @Patch(':id')
  update(@Body() updatePostDto: UpdatePostDto, @AuthUser() user: JwtUserEntity) {
    return this.postsService.update(updatePostDto, user.id)
  }

  @ApiBearerAuth()
  @HttpCode(204)
  @Delete(':id')
  remove(@Param('id') id: string, @AuthUser() user: JwtUserEntity) {
    return this.postsService.remove(id, user.id)
  }

  @ApiBearerAuth()
  @Get('like/:id')
  like(@Param('id') id: string, @AuthUser() user: JwtUserEntity) {
    return this.postsService.like(id, user.id)
  }
}
