import { Injectable } from '@nestjs/common/decorators/core'
import { CreatePostDto } from './dto/create-post.dto'
import { UpdatePostDto } from './dto/update-post.dto'
import { Post } from './entities/post.entity'
import { nanoid } from 'nanoid'

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
        liked_by_user_ids: []
      },
      {
        id: '2',
        user_id: '1',
        title: 'Minha Viagem à Europa',
        text: 'Estou compartilhando algumas fotos da minha viagem pela Europa!',
        liked_by_user_ids: ['1', '2']
      },
      {
        id: '3',
        user_id: '1',
        title: 'Nova Receita Deliciosa',
        text: 'Acabei de preparar uma nova receita e ficou incrível! Aqui está a receita...',
        liked_by_user_ids: ['1', '2']
      },
      {
        id: '4',
        user_id: '2',
        title: 'Reflexões sobre a Vida',
        text: 'Às vezes, é bom parar e refletir sobre o que realmente importa na vida.',
        liked_by_user_ids: ['1', '2', '3']
      },
      {
        id: '5',
        user_id: '2',
        title: 'Fotos do Pôr do Sol',
        text: 'Aqui estão algumas fotos deslumbrantes do pôr do sol que capturei hoje à noite.',
        liked_by_user_ids: ['1', '2', '3']
      },
      {
        id: '6',
        user_id: '2',
        title: 'Minha Paixão por Fotografia',
        text: 'Compartilhando algumas das minhas fotos favoritas que tirei recentemente.',
        liked_by_user_ids: ['1', '2', '3']
      },
      {
        id: '7',
        user_id: '3',
        title: 'Aventuras ao Ar Livre',
        text: 'Explorando trilhas e montanhas - a natureza sempre nos surpreende!',
        liked_by_user_ids: ['1', '2', '3']
      }
    ]
  }

  create(post: CreatePostDto, user_id: string) {
    const id = nanoid(7)
    this.posts.push({
      id,
      user_id,
      liked_by_user_ids: [],
      ...post
    })
  }

  findAll() {
    return this.posts
  }

  findOne(id: string) {
    return this.posts.find((produto) => produto.id === id)
  }

  update(post: UpdatePostDto, user_id: string) {
    this.posts.map((existingPost) => (existingPost.id === post.id ? { post, ...existingPost } : existingPost))
    return post
  }

  remove(id: string) {
    this.posts = this.posts.filter((produto) => {
      return produto.id !== id
    })
  }
}
