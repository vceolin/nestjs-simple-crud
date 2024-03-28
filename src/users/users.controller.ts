import { Controller } from '@nestjs/common/decorators/core'
import { Post, Body, Get, Param, Put } from '@nestjs/common/decorators/http'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { SkipAuth } from '@/auth/decorators/skip-auth.decorator'
import { AuthUser } from '@/auth/decorators/auth-user.decorator'
import { JwtUserEntity } from '@/auth/entities/jwt-user.entity'
import { CreateUserDto } from './dto/create-user.dto'
import { UsersService } from './users.service'

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiBearerAuth()
  @Post()
  create(@Body() createUserDto: CreateUserDto, @AuthUser() user: JwtUserEntity) {
    return this.usersService.create(createUserDto, user.id)
  }

  @SkipAuth()
  @Get()
  findAll() {
    return this.usersService.findAll()
  }

  @SkipAuth()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id)
  }

  @ApiBearerAuth()
  @Put(':id')
  update(@Body() updateProdutoDto: CreateUserDto, @AuthUser() user: JwtUserEntity) {
    return this.usersService.update(updateProdutoDto, user.id)
  }
}
