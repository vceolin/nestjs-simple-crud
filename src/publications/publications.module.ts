import { PublicationsService } from './publications.service'
import { PublicationsController } from './publications.controller'
import { Module } from '@nestjs/common/decorators/modules'

@Module({
  controllers: [PublicationsController],
  providers: [PublicationsService]
})
export class PublicationsModule {}
