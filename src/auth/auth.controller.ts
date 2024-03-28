import { Controller } from '@nestjs/common/decorators/core'
import { AuthService } from './auth.service'
import { Body, HttpCode, Post } from '@nestjs/common/decorators/http'
import { HttpStatus } from '@nestjs/common'

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: { email: string; password: string }) {
    return this.authService.signIn(signInDto.email, signInDto.password)
  }
}
