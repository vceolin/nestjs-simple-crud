import { PublicationsService } from './publications.service'
import { CreatePublicationDto } from './dto/create-publication.dto'
import { UpdatePublicationDto } from './dto/update-publication.dto'
import { Controller } from '@nestjs/common/decorators/core'
import { Post, Body, Get, Param, Delete, HttpCode, Patch } from '@nestjs/common/decorators/http'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { SkipAuth } from '@/auth/decorators/skip-auth.decorator'
import { AuthUser } from '@/auth/decorators/auth-user.decorator'
import { JwtUserEntity } from '@/auth/entities/jwt-user.entity'
import { ReturnPublicationDto } from './dto/return-publication.dto'
import { Publication } from './entities/publication.entity'

@ApiTags('publications')
@Controller('publications')
export class PublicationsController {
  constructor(private readonly publicationsService: PublicationsService) {}

  @ApiBearerAuth()
  @Post()
  create(@Body() createPublicationDto: CreatePublicationDto, @AuthUser() user: JwtUserEntity): ReturnPublicationDto {
    const publication = this.publicationsService.create(createPublicationDto, user.id)
    return this.applyHateoas(publication)
  }

  @SkipAuth()
  @Get()
  findAll(): ReturnPublicationDto[] {
    const publications = this.publicationsService.findAll()
    return publications.map((publication) => this.applyHateoas(publication))
  }

  @SkipAuth()
  @Get(':id')
  findOne(@Param('id') id: string): ReturnPublicationDto {
    const publication = this.publicationsService.findOne(id)
    return this.applyHateoas(publication)
  }

  @ApiBearerAuth()
  @Patch(':id')
  update(@Body() updatePublicationDto: UpdatePublicationDto, @AuthUser() user: JwtUserEntity): ReturnPublicationDto {
    const publication = this.publicationsService.update(updatePublicationDto, user.id)
    return this.applyHateoas(publication)
  }

  @ApiBearerAuth()
  @HttpCode(204)
  @Delete(':id')
  remove(@Param('id') id: string, @AuthUser() user: JwtUserEntity) {
    return this.publicationsService.remove(id, user.id)
  }

  @ApiBearerAuth()
  @Get('like/:id')
  like(@Param('id') id: string, @AuthUser() user: JwtUserEntity): ReturnPublicationDto {
    const publication = this.publicationsService.like(id, user.id)
    return this.applyHateoas(publication)
  }

  private applyHateoas(publication: Publication): ReturnPublicationDto {
    const comments = `${process.env.HOST}/publications/${publication.id}/comments`
    const user = `${process.env.HOST}/users/${publication.user_id}`
    const publicationWithHateoas: ReturnPublicationDto = { ...publication, comments, user }
    return publicationWithHateoas
  }
}
