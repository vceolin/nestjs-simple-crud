import { Injectable } from '@nestjs/common/decorators/core'
import { CreatePostDto } from './dto/create-post.dto'
import { UpdatePostDto } from './dto/update-post.dto'
import { Post } from './entities/post.entity'
import { nanoid } from 'nanoid'
import { ForbiddenException, NotFoundException } from '@nestjs/common'
import { ApiProperty } from '@nestjs/swagger'

@Injectable()
export class PostsService {
  private posts: Post[]
  constructor() {
    this.posts = [
      {
        id: '1',
        user_id: '1',
        title: 'O Melhor Dia da Minha Vida',
        text: 'Hoje fui ao parque e tive uma experiência incrível!',
        liked_by_user_ids: [],
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: '2',
        user_id: '1',
        title: 'Minha Viagem à Europa',
        text: 'Estou compartilhando algumas fotos da minha viagem pela Europa!',
        liked_by_user_ids: ['1', '2'],
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: '3',
        user_id: '1',
        title: 'Nova Receita Deliciosa',
        text: 'Acabei de preparar uma nova receita e ficou incrível! Aqui está a receita...',
        liked_by_user_ids: ['1', '2'],
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: '4',
        user_id: '2',
        title: 'Reflexões sobre a Vida',
        text: 'Às vezes, é bom parar e refletir sobre o que realmente importa na vida.',
        liked_by_user_ids: ['1', '2', '3'],
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: '5',
        user_id: '2',
        title: 'Fotos do Pôr do Sol',
        text: 'Aqui estão algumas fotos deslumbrantes do pôr do sol que capturei hoje à noite.',
        liked_by_user_ids: ['1', '2', '3'],
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: '6',
        user_id: '2',
        title: 'Minha Paixão por Fotografia',
        text: 'Compartilhando algumas das minhas fotos favoritas que tirei recentemente.',
        liked_by_user_ids: ['1', '2', '3'],
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: '7',
        user_id: '3',
        title: 'Aventuras ao Ar Livre',
        text: 'Explorando trilhas e montanhas - a natureza sempre nos surpreende!',
        liked_by_user_ids: ['1', '2', '3'],
        created_at: new Date(),
        updated_at: new Date()
      }
    ]
  }

  create(post: CreatePostDto, user_id: string) {
    const now = new Date()
    const id = nanoid(7)
    const newPost = {
      ...post,
      id,
      user_id,
      liked_by_user_ids: [],
      created_at: now,
      updated_at: now
    }
    this.posts.push(newPost)
    return newPost
  }

  findAll() {
    return this.posts
  }

  findOne(id: string) {
    const result = this.posts.find((produto) => produto.id === id)
    if (!result) throw new NotFoundException('Post not found')
    return result
  }

  update(post: UpdatePostDto, user_id: string) {
    this.posts.map((existingPost) => {
      if (existingPost.id !== post.id) return existingPost
      if (existingPost.user_id !== user_id) throw new ForbiddenException("You can't update a post that not yours.")
      return { existingPost, ...post }
    })
    return this.findOne(post.id)
  }

  remove(id: string, user_id: string) {
    this.findOne(id)
    this.posts = this.posts.filter((produto) => {
      if (produto.id !== id) return
      if (produto.user_id !== user_id) throw new ForbiddenException("You can't delete a post that not yours.")
      return true
    })
  }

  @ApiProperty({ description: "add or remove the user's like from a post, depending if you already liked it or not." })
  like(id: string, user_id: string): Post {
    const postIndex = this.posts.findIndex((post) => {
      post.id === id
    })
    if (postIndex === -1) throw new NotFoundException()
    const post = this.posts[postIndex]

    const index = post.liked_by_user_ids.indexOf(user_id)
    if (index !== -1) post.liked_by_user_ids.splice(index, 1)
    else post.liked_by_user_ids.push(user_id)

    return post
  }
}
