import { Module } from '@nestjs/common/decorators/modules'
import { UsersService } from './users.service'
import { UsersController } from './users.controller'

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService]
})
export class UsersModule {}
