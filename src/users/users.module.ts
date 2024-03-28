import { Module } from '@nestjs/common/decorators/modules'
import { UsersService } from './users.service'

@Module({
  providers: [UsersService],
  exports: [UsersService]
})
export class UsersModule {}
