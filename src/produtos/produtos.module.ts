import { ProdutosService } from './produtos.service'
import { ProdutosController } from './produtos.controller'
import { Module } from '@nestjs/common/decorators/modules'

@Module({
  controllers: [ProdutosController],
  providers: [ProdutosService]
})
export class ProdutosModule {}
