import { Controller, UseGuards } from '@nestjs/common/decorators/core'
import { AuthService } from './auth.service'
import { Body, Get, HttpCode, Post, Request } from '@nestjs/common/decorators/http'
import { HttpStatus } from '@nestjs/common'
import { SignInDto } from './dto/sign-in.dto'
import { AuthGuard } from './auth.guard'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { SkipAuth } from './skip-auth.decorator'
@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @SkipAuth()
  @Post('login')
  signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto.email, signInDto.password)
  }

  @ApiBearerAuth()
  @Get('me')
  getProfile(@Request() req) {
    return req.user
  }
}
