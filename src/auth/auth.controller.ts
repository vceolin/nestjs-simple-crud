import { Controller } from '@nestjs/common/decorators/core'
import { AuthService } from './auth.service'
import { Body, Get, Post } from '@nestjs/common/decorators/http'
import { SignInDto } from './dto/sign-in.dto'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { SkipAuth } from './decorators/skip-auth.decorator'
import { JwtUserEntity } from './entities/jwt-user.entity'
import { AuthUser } from './decorators/auth-user.decorator'
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
  getProfile(@AuthUser() user): JwtUserEntity {
    return user
  }
}
