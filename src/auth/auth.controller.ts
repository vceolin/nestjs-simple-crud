import { Controller, UseGuards } from '@nestjs/common/decorators/core'
import { AuthService } from './auth.service'
import { Body, Get, HttpCode, Post, Request } from '@nestjs/common/decorators/http'
import { HttpStatus } from '@nestjs/common'
import { SignInDto } from './dto/sign-in.dto'
import { AuthGuard } from './auth.guard'
import { ApiTags } from '@nestjs/swagger'
@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto.email, signInDto.password)
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user
  }
}
