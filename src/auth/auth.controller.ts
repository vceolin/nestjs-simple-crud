import { Controller } from '@nestjs/common/decorators/core'
import { AuthService } from './auth.service'
import { Body, HttpCode, Post } from '@nestjs/common/decorators/http'
import { HttpStatus } from '@nestjs/common'
import { SignInDto } from './dto/sign-in.dto'

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto.email, signInDto.password)
  }
}
