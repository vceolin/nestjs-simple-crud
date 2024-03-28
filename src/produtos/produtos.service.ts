import { Injectable } from '@nestjs/common/decorators/core'
import { CreateProdutoDto } from './dto/create-produto.dto'
import { UpdateProdutoDto } from './dto/update-produto.dto'
import { Produto } from './entities/produto.entity'
import { nanoid } from 'nanoid'

@Injectable()
export class ProdutosService {
  private produtos: Produto[]
  constructor() {
    this.produtos = [
      { id: '1', descricao: 'Arroz parboilizado 5Kg', valor: 25.0, marca: 'Tio João' },
      { id: '2', descricao: 'Maionese 250gr', valor: 7.2, marca: 'Helmans' },
      { id: '3', descricao: 'Iogurte Natural 200ml', valor: 2.5, marca: 'Itambé' },
      { id: '4', descricao: 'Batata Maior Palha 300gr', valor: 15.2, marca: 'Chipps' },
      { id: '5', descricao: 'Nescau 400gr', valor: 8.0, marca: 'Nestlé' }
    ]
  }

  create(createProdutoDto: CreateProdutoDto) {
    const id = nanoid(7)
    this.produtos.push({ id, ...createProdutoDto })
  }

  findAll() {
    return this.produtos
  }

  findOne(id: string) {
    return this.produtos.find((produto) => produto.id === id)
  }

  update(updateProdutoDto: UpdateProdutoDto) {
    const produtoToUpdate = this.produtos.map((produto) =>
      produto.id === updateProdutoDto.id ? updateProdutoDto : produto
    )
    return updateProdutoDto
  }

  remove(id: string) {
    this.produtos = this.produtos.filter((produto) => {
      return produto.id !== id
    })
  }
}
