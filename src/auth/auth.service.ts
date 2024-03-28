import { UnauthorizedException } from '@nestjs/common'
import { UsersService } from '../users/users.service'
import { Injectable } from '@nestjs/common/decorators/core'

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async signIn(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneByEmail(email)
    if (user?.password !== pass) {
      throw new UnauthorizedException()
    }
    const { password, ...result } = user
    // TODO: Generate a JWT and return it here
    // instead of the user object
    return result
  }
}
