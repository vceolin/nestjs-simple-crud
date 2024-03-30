import { Injectable } from '@nestjs/common/decorators/core'
import { CreatePostDto as CreateCommentDto } from './dto/create-comment.dto'
import { UpdatePostDto as UpdateCommentDto } from './dto/update-comment.dto'
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

  findAll() {
    return this.comments
  }

  findOne(id: string): Comment {
    const result = this.comments.find((produto) => produto.id === id)
    if (!result) throw new NotFoundException('Post not found')
    return result
  }

  update(post: UpdateCommentDto, user_id: string): Comment {
    this.comments.map((existingPost) => {
      if (existingPost.id !== post.id) return existingPost
      if (existingPost.user_id !== user_id) throw new ForbiddenException("You can't update a post that not yours.")
      return { existingPost, ...post }
    })
    return this.findOne(post.id)
  }

  remove(id: string, user_id: string) {
    this.findOne(id)
    this.comments = this.comments.filter((produto) => {
      if (produto.id !== id) return
      if (produto.user_id !== user_id) throw new ForbiddenException("You can't delete a comment that not yours.")
      return true
    })
  }

  like(id: string, user_id: string): Comment {
    const postIndex = this.comments.findIndex((post) => {
      post.id === id
    })
    if (postIndex === -1) throw new NotFoundException()
    const post = this.comments[postIndex]

    const index = post.liked_by_user_ids.indexOf(user_id)
    if (index !== -1) post.liked_by_user_ids.splice(index, 1)
    else post.liked_by_user_ids.push(user_id)

    return post
  }
}
