import { Injectable } from '@nestjs/common/decorators/core'
import { CreateCommentDto as CreateCommentDto } from './dto/create-comment.dto'
import { UpdateCommentDto as UpdateCommentDto } from './dto/update-comment.dto'
import { Comment } from './entities/comment.entity'
import { nanoid } from 'nanoid'
import { ForbiddenException, NotFoundException } from '@nestjs/common'

@Injectable()
export class CommentsService {
  private comments: Comment[]
  constructor() {
    this.comments = [
      {
        id: '1',
        user_id: '2',
        post_id: '1',
        text: 'Que massa! Parabéns!',
        liked_by_user_ids: [],
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: '2',
        user_id: '3',
        post_id: '1',
        text: 'Comprou algo pra mim?',
        in_reply_to: '2',
        liked_by_user_ids: ['1', '2'],
        created_at: new Date(),
        updated_at: new Date()
      }
    ]
  }

  create(comment: CreateCommentDto, user_id: string) {
    const now = new Date()
    const id = nanoid(7)
    const newComment = {
      ...comment,
      id,
      user_id,
      liked_by_user_ids: [],
      created_at: now,
      updated_at: now
    }
    this.comments.push(newComment)
    return newComment
  }

  findAll(post_id: string) {
    return this.comments.filter((post) => post_id === post.id)
  }

  findOne(id: string): Comment {
    const result = this.comments.find((comment) => comment.id === id)
    if (!result) throw new NotFoundException('Post not found')
    return result
  }

  update(comment: UpdateCommentDto, user_id: string): Comment {
    this.comments.map((existingComment) => {
      if (existingComment.id !== comment.id) return existingComment
      if (existingComment.user_id !== user_id)
        throw new ForbiddenException("You can't update a comment that not yours.")
      return { existingComment, ...comment }
    })
    return this.findOne(comment.id)
  }

  remove(id: string, user_id: string) {
    this.findOne(id)
    this.comments = this.comments.filter((comment) => {
      if (comment.id !== id) return
      if (comment.user_id !== user_id) throw new ForbiddenException("You can't delete a comment that not yours.")
      return true
    })
  }

  like(id: string, user_id: string): Comment {
    const commentIndex = this.comments.findIndex((comment) => {
      comment.id === id
    })
    if (commentIndex === -1) throw new NotFoundException()
    const comment = this.comments[commentIndex]

    const index = comment.liked_by_user_ids.indexOf(user_id)
    if (index !== -1) comment.liked_by_user_ids.splice(index, 1)
    else comment.liked_by_user_ids.push(user_id)

    return comment
  }
}
