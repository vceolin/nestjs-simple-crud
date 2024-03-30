import { Injectable } from '@nestjs/common/decorators/core'
import { CreatePublicationDto } from './dto/create-publication.dto'
import { UpdatePublicationDto } from './dto/update-publication.dto'
import { Publication } from './entities/publication.entity'
import { nanoid } from 'nanoid'
import { ForbiddenException, NotFoundException } from '@nestjs/common'
import { ApiProperty } from '@nestjs/swagger'

@Injectable()
export class PublicationsService {
  private publications: Publication[]
  constructor() {
    this.publications = [
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

  create(publication: CreatePublicationDto, user_id: string) {
    const now = new Date()
    const id = nanoid(7)
    const newpublication = {
      ...publication,
      id,
      user_id,
      liked_by_user_ids: [],
      created_at: now,
      updated_at: now
    }
    this.publications.push(newpublication)
    return newpublication
  }

  findAll() {
    return this.publications
  }

  findOne(id: string) {
    const result = this.publications.find((publication) => publication.id === id)
    if (!result) throw new NotFoundException('publication not found')
    return result
  }

  update(publication: UpdatePublicationDto, user_id: string) {
    this.publications.map((existingpublication) => {
      if (existingpublication.id !== publication.id) return existingpublication
      if (existingpublication.user_id !== user_id)
        throw new ForbiddenException("You can't update a publication that not yours.")
      return { existingpublication, ...publication }
    })
    return this.findOne(publication.id)
  }

  remove(id: string, user_id: string) {
    this.findOne(id)
    this.publications = this.publications.filter((publication) => {
      if (publication.id !== id) return
      if (publication.user_id !== user_id)
        throw new ForbiddenException("You can't delete a publication that not yours.")
      return true
    })
  }

  @ApiProperty({
    description: "add or remove the user's like from a publication, depending if you already liked it or not."
  })
  like(id: string, user_id: string): Publication {
    const publicationIndex = this.publications.findIndex((publication) => {
      publication.id === id
    })
    if (publicationIndex === -1) throw new NotFoundException()
    const publication = this.publications[publicationIndex]

    const index = publication.liked_by_user_ids.indexOf(user_id)
    if (index !== -1) publication.liked_by_user_ids.splice(index, 1)
    else publication.liked_by_user_ids.push(user_id)

    return publication
  }
}
