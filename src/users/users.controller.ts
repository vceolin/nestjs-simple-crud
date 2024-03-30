import { Controller } from '@nestjs/common/decorators/core'
import { Post, Body, Get, Param, Patch, Query } from '@nestjs/common/decorators/http'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { SkipAuth } from '@/auth/decorators/skip-auth.decorator'
import { AuthUser } from '@/auth/decorators/auth-user.decorator'
import { JwtUserEntity } from '@/auth/entities/jwt-user.entity'
import { CreateUserDto } from './dto/create-user.dto'
import { UsersService } from './users.service'
import { User } from './entities/user.entity'
import { UpdateUserDto } from './dto/update-user.dto'
import { PaginationDto } from '@/common/pagination'
import { ValidationPipe } from '@nestjs/common'

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @SkipAuth()
  @Post()
  create(@Body() createUserDto: CreateUserDto): Omit<User, 'password'> {
    return this.usersService.create(createUserDto)
  }

  @SkipAuth()
  @Get()
  findAll(@Query() pagination: PaginationDto): Omit<User, 'password'>[] {
    console.log(pagination)
    return this.usersService.findAll(pagination)
  }

  @SkipAuth()
  @Get(':id')
  findOne(@Param('id') id: string): Omit<User, 'password'> {
    return this.usersService.findOne(id)
  }

  @ApiBearerAuth()
  @Patch(':id')
  update(@Body() updateProdutoDto: UpdateUserDto, @AuthUser() user: JwtUserEntity): Omit<User, 'password'> {
    return this.usersService.update(updateProdutoDto, user.id)
  }

  @ApiBearerAuth()
  @Get('follow/:id')
  follow(@Param('id') id: string, @AuthUser() user: JwtUserEntity): Omit<User, 'password'> {
    return this.usersService.follow(id, user.id)
  }
}
