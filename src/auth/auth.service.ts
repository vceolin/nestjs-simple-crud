import { UnauthorizedException } from '@nestjs/common'
import { UsersService } from '../users/users.service'
import { Injectable } from '@nestjs/common/decorators/core'
import { JwtService } from '@nestjs/jwt'
import { JwtUserEntity } from './entities/jwt-user.entity'

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async signIn(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneByEmail(email)
    if (user?.password !== pass) {
      throw new UnauthorizedException()
    }
    const payload: Partial<JwtUserEntity> = { sub: user.id, id: user.id, email: user.email }
    return {
      access_token: await this.jwtService.signAsync(payload)
    }
  }
}
