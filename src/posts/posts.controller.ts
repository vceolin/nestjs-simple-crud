import { PostsService } from './posts.service'
import { CreatePostDto } from './dto/create-post.dto'
import { UpdatePostDto } from './dto/update-post.dto'
import { Controller } from '@nestjs/common/decorators/core'
import { Post, Body, Get, Param, Put, Delete } from '@nestjs/common/decorators/http'

@Controller('produtos')
export class PostsController {
  constructor(private readonly produtosService: PostsService) {}

  @Post()
  create(@Body() createPostDto: CreatePostDto) {
    return this.produtosService.create(createPostDto)
  }

  @Get()
  findAll() {
    return this.produtosService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.produtosService.findOne(id)
  }

  @Put(':id')
  update(@Body() updateProdutoDto: UpdatePostDto) {
    return this.produtosService.update(updateProdutoDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.produtosService.remove(id)
  }
}
