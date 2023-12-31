import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common'
import { ProdutosService } from './produtos.service'
import { CreateProdutoDto } from './dto/create-produto.dto'
import { UpdateProdutoDto } from './dto/update-produto.dto'

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
