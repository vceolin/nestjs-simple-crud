import { ProdutosService } from './produtos.service'
import { CreateProdutoDto } from './dto/create-produto.dto'
import { UpdateProdutoDto } from './dto/update-produto.dto'
import { Controller } from '@nestjs/common/decorators/core'
import { Post, Body, Get, Param, Put, Delete } from '@nestjs/common/decorators/http'

@Controller('produtos')
export class ProdutosController {
  constructor(private readonly produtosService: ProdutosService) {}

  @Post()
  create(@Body() createProdutoDto: CreateProdutoDto) {
    return this.produtosService.create(createProdutoDto)
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
  update(@Body() updateProdutoDto: UpdateProdutoDto) {
    return this.produtosService.update(updateProdutoDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.produtosService.remove(id)
  }
}
