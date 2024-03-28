import { Module } from '@nestjs/common/decorators/modules'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ProdutosModule } from './produtos/produtos.module'

@Module({
  imports: [ProdutosModule],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
