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
        title: 'O Melhor Dia da Minha Vida',
        text: 'Hoje fui ao parque e tive uma experiência incrível!',
        num_likes: 100
      },
      {
        id: '2',
        title: 'Minha Viagem à Europa',
        text: 'Estou compartilhando algumas fotos da minha viagem pela Europa!',
        num_likes: 250
      },
      {
        id: '3',
        title: 'Nova Receita Deliciosa',
        text: 'Acabei de preparar uma nova receita e ficou incrível! Aqui está a receita...',
        num_likes: 300
      },
      {
        id: '4',
        title: 'Reflexões sobre a Vida',
        text: 'Às vezes, é bom parar e refletir sobre o que realmente importa na vida.',
        num_likes: 150
      },
      {
        id: '5',
        title: 'Fotos do Pôr do Sol',
        text: 'Aqui estão algumas fotos deslumbrantes do pôr do sol que capturei hoje à noite.',
        num_likes: 200
      },
      {
        id: '6',
        title: 'Minha Paixão por Fotografia',
        text: 'Compartilhando algumas das minhas fotos favoritas que tirei recentemente.',
        num_likes: 180
      },
      {
        id: '7',
        title: 'Aventuras ao Ar Livre',
        text: 'Explorando trilhas e montanhas - a natureza sempre nos surpreende!',
        num_likes: 220
      }
    ]
  }

  create(createProdutoDto: CreatePostDto) {
    const id = nanoid(7)
    this.posts.push({ id, ...createProdutoDto })
  }

  findAll() {
    return this.posts
  }

  findOne(id: string) {
    return this.posts.find((produto) => produto.id === id)
  }

  update(updateProdutoDto: UpdatePostDto) {
    const produtoToUpdate = this.posts.map((produto) =>
      produto.id === updateProdutoDto.id ? updateProdutoDto : produto
    )
    return updateProdutoDto
  }

  remove(id: string) {
    this.posts = this.posts.filter((produto) => {
      return produto.id !== id
    })
  }
}
