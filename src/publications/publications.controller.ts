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
    return this.publicationsService.create(createPublicationDto, user.id)
  }

  @SkipAuth()
  @Get()
  findAll(): ReturnPublicationDto[] {
    return this.publicationsService.findAll()
  }

  @SkipAuth()
  @Get(':id')
  findOne(@Param('id') id: string): ReturnPublicationDto {
    return this.publicationsService.findOne(id)
  }

  @ApiBearerAuth()
  @Patch(':id')
  update(@Body() updatePublicationDto: UpdatePublicationDto, @AuthUser() user: JwtUserEntity): ReturnPublicationDto {
    return this.publicationsService.update(updatePublicationDto, user.id)
  }

  @ApiBearerAuth()
  @HttpCode(204)
  @Delete(':id')
  remove(@Param('id') id: string, @AuthUser() user: JwtUserEntity): ReturnPublicationDto {
    return this.publicationsService.remove(id, user.id)
  }

  @ApiBearerAuth()
  @Get('like/:id')
  like(@Param('id') id: string, @AuthUser() user: JwtUserEntity): ReturnPublicationDto {
    return this.publicationsService.like(id, user.id)
  }

  private applyHateoas(publication: Publication): ReturnPublicationDto {}
}
