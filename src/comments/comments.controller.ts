import { CommentsService } from './comments.service'
import { CreateCommentDto } from './dto/create-comment.dto'
import { UpdateCommentDto } from './dto/update-comment.dto'
import { Controller } from '@nestjs/common/decorators/core'
import { Body, Get, Param, Delete, HttpCode, Patch, Post, Query } from '@nestjs/common/decorators/http'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { SkipAuth } from '@/auth/decorators/skip-auth.decorator'
import { AuthUser } from '@/auth/decorators/auth-user.decorator'
import { JwtUserEntity } from '@/auth/entities/jwt-user.entity'
import { PaginationDto } from '@/common/pagination'

@ApiTags('comments')
@Controller('/publications/:publication_id/comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @ApiBearerAuth()
  @Post()
  create(@Body() createCommentDto: CreateCommentDto, @AuthUser() user: JwtUserEntity) {
    return this.commentsService.create(createCommentDto, user.id)
  }

  @SkipAuth()
  @Get()
  findAll(@Param('publication_id') publication_id: string, @Query() pagination: PaginationDto) {
    return this.commentsService.findAllByPublication(publication_id, pagination)
  }

  @SkipAuth()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.commentsService.findOne(id)
  }

  @ApiBearerAuth()
  @Patch(':id')
  update(@Body() updateCommentDto: UpdateCommentDto, @AuthUser() user: JwtUserEntity) {
    return this.commentsService.update(updateCommentDto, user.id)
  }

  @ApiBearerAuth()
  @HttpCode(204)
  @Delete(':id')
  remove(@Param('id') id: string, @AuthUser() user: JwtUserEntity) {
    return this.commentsService.remove(id, user.id)
  }

  @ApiBearerAuth()
  @Get('like/:id')
  like(@Param('id') id: string, @AuthUser() user: JwtUserEntity) {
    return this.commentsService.like(id, user.id)
  }
}
