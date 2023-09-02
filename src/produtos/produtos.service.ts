import { Injectable } from '@nestjs/common';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { UpdateProdutoDto } from './dto/update-produto.dto';
import { Produto } from './entities/produto.entity';

@Injectable()
export class ProdutosService {
  private produtos: Produto[];
  constructor() {
    produtos = [
      { id: 1, descricao: "Arroz parboilizado 5Kg", valor: 25.00, marca: "Tio João" },
      { id: 2, descricao: "Maionese 250gr", valor: 7.20, marca: "Helmans" },
      { id: 3, descricao: "Iogurte Natural 200ml", valor: 2.50, marca: "Itambé" },
      { id: 4, descricao: "Batata Maior Palha 300gr", valor: 15.20, marca: "Chipps" },
      { id: 5, descricao: "Nescau 400gr", valor: 8.00, marca: "Nestlé" },
    ]
  }

  create(createProdutoDto: CreateProdutoDto) {
    return 'This action adds a new produto';
  }

  findAll() {
    return `This action returns all produtos`;
  }

  findOne(id: number) {
    return `This action returns a #${id} produto`;
  }

  update(id: number, updateProdutoDto: UpdateProdutoDto) {
    return `This action updates a #${id} produto`;
  }

  remove(id: number) {
    return `This action removes a #${id} produto`;
  }
}
